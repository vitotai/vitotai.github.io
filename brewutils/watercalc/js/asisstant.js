var BrewMath = {
    plato2sg: function(plato) {
        return 1 + plato / (258.6 - ((plato / 258.2) * 227.1));
    },
    sgTempCorrected: function(Reading, F, CT) {
        return Reading * ((1.00130346 - 0.000134722124 * F + 0.00000204052596 * F * F - 0.00000000232820948 * F * F * F) / (1.00130346 - 0.000134722124 * CT + 0.00000204052596 * CT * CT - 0.00000000232820948 * CT * CT * CT));
    },
    brix2sg: function(brix, wc) {
        wc = (typeof wc === "undefined") ? 1.0 : wc;
        var bi = brix / wc;
        return (bi / (258.6 - ((bi / 258.2) * 227.1))) + 1;
    },
    sg2plato: function(sg) {
        return (1111.14 * sg) - (630.272 * sg * sg) + (135.997 * sg * sg * sg) - 616.868;
    }
};

function C2F(c) { return Math.round((c * 1.8 + 32) * 10) / 10; }

function F2C(f) { return Math.round((f - 32) / 1.8 * 10) / 10; }

function setCookie(a, b, c) {
    var d = new Date();
    d.setTime(d.getTime() + (c * 24 * 60 * 60 * 1000));
    var e = "expires=" + d.toUTCString();
    document.cookie = a + "=" + b + "; " + e
}

var BrewData = {

    metrics: false,
    usePlato: true,
    refrac_cor: 1.0,
    hydro_ct: 68, // always in Farenheit
    //Rig={
    MLTDeadSpace: 0, //L
    BKDeadSpace: 0.4, // gallon
    evaporationRate: 0.33, // L/hr
    spargeType: 1, // 0: nosparge, batch spage, fly sparge
    batchSpargeNumber: 1,
    strikingCalculate:0,
    //};

    //var BrewParameter={
    grainAbsorb: 0.1, //gal/lb
    hopAbsorb: 0, // gal/lb
    wortExpansionBoil: 4,
    wortExpansionMash: 3,
    //};

    batchSize: 2.75, //gal
    grainAmount: 5.7, //lb
    hopAmount: 0.028, //lb
    boilTime: 90, // min

    brewHouseEfficiency: 75,
    mashThickness: 1.25, // qt/lb
    strikingVolume: 6,
    targetOriginalGravity: 1.058,
    //    targetOriginalGravity: 1.060, // < calculated by efficiency
    targetOG: function() {
        return this.targetOriginalGravity;
    },
    totalGravityPoint: function() {
        return 37 * this.grainAmount;
    },
};

var UserInputData = {
    fwGravity: 0,
    fwGravityValid: false,
    fwVolume: 0,
    fwVolumeValid: false,
    preboilGravity: 0,
    preboilGravityValid: false,
    preboilVolume: 0,
    preboilVolumeValid: false,
    postboilGravity: 0,
    postboilGravityValid: false,
    postboilVolume: 0,
    postboilVolumeValid: false,
    fermenterVolume: 0,
    fermenterVolumeValid: false
};
var Unit = {
    L2gal: function(l) { return 0.2641720 * l; },
    gal2L: function(g) { return 3.78541178 * g; },
    kg2lb: function(kg) { return 2.204623 * kg; },
    lb2kg: function(lb) { return 0.45359237 * lb; },
    qt2L: function(q) { return 0.946352946 * q },
    L2qt: function(l) { return 1.05668821 * l },
    oz2g: function(oz) { return 28.3495231 * oz; },
    g2oz: function(g) { return 0.0352739619 * g; },
    qtlb2lkg: function(r) { return 2.086351113 * r; },
    lkg2qtlb: function(l) { return 0.47930562731 * l; },
    gallb2lkg: function(g) { return 8.345404452 * g; },
    lkg2gallb: function(l) { return 0.11982642731 * l }
};

var ExpectedValue = {
    //
    totalWater: function() {
        var R = BrewData;
        var p = BrewData;
        // target + deadspace + boiloff + grain absort + (hop absorp)
        return R.batchSize + p.MLTDeadSpace / (1 + p.wortExpansionMash / 100) + p.BKDeadSpace +
            p.evaporationRate * R.boilTime / 60 + p.grainAbsorb * R.grainAmount +
            p.hopAbsorb * R.hopAmount / 16;
    },
    mashWater: function() {
        var p = BrewData;
        var R = BrewData;
        // if no sparge, just ruturn totalwater
        var total = this.totalWater();
        if(p.strikingCalculate == 1) return p.strikingVolume;
        if (p.spargeType == 0) return total;
        // else return thickness * grainAmount
        var mw = R.mashThickness / 4 * R.grainAmount + p.MLTDeadSpace;
        return (mw > total) ? total : mw;
    },
    spargeWater: function() {
        return this.totalWater() - this.mashWater();
    },
    spargeWaterPerBatch: function() {
        var p = BrewData;
        if (p.spargeType == 1) return this.spargeWater() / p.batchSpargeNumber;
        else if (p.spargeType == 2) return this.spargeWater();
        return 0;

    },
    // calculation based on recipe
    firstWortGravity1BatchSparge: function() {
        // total extracted sugar:  Gfw(first wort graviyt) * Vmash (mash water volume)
        // sugar of fw: Gfw(first wort graviyt) * Vfw (first wort volume)
        // sugar of sparge:  (total sugar - sugar of fw) * Vsparge(sprge vol)/(Vsparge + Vgrainabsorb + Vmltdeadspace) 
        // total sugar in BK  = Gfw * Vfw + (Gfw * Vmash - Gfw * Vfw) * Vsparge/(Vsparge + Vgrainabsorb + Vmltds)
        //                     = Gfw * Vfw + Gfw (Vmash - Vfw) * Vsparge/(Vsparge + Vgrainabosrb +Vmltds)
        //                      = Gfw * ( Vfw  + (Vmash - Vfw) * Vsparge/(Vsparge + Vgrainabsorb + Vmltds) )
        // total sugar in BK = preboilVolume * preboilGravity
        // so Gfw = preboilVolume * preboilGravity /(xxx)
        var R = BrewData;
        var p = BrewData;
        var t = this;
        var fwVol = t.firstWortVolume(false);
        var mashVol = t.mashWater();
        var sparge = t.spargeWater();
        var grainabsorbed = p.grainAbsorb * R.grainAmount;
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);
        return 1 + t.preboilVolume(false) * (t.preboilGravity() - 1) /
            (fwVol + (mashVol - fwVol) * spargeFactor);
    },
    firstWortGravity2BatchSparge: function() {
        // total extracted sugar:  Gfw(first wort graviyt) * Vmash (mash water volume)
        // sugar of fw: Gfw(first wort graviyt) * Vfw (first wort volume)
        // sugar of 1st sparge:  (Gfw * Vmash - Gfw * Vfw) * Vsparge(sprge vol)/(Vsparge + Vgrainabsorb + Vmltdeadspace) 
        // le spargeFactor = Vsparge(sprge vol)/(Vsparge + Vgrainabsorb + Vmltdeadspace) , 
        // sugar of 1st sparge: (Gfw * Vmash - Gfw * Vfw) * spargeFactor
        // sguar of 2nd sparge: 
        //   [Gfw * Vmash  - (Gfw * Vfw)  - (Gfw * Vmash - Gfw * Vfw) * spargeFactor ] * spargeFactor

        //  total sugar =
        //   Gfw * Vfw +(Gfw * Vmash - Gfw * Vfw) *  spargeFactor + 
        //   [Gfw * Vmash  - (Gfw * Vfw)  - (Gfw * Vmash - Gfw * Vfw) * spargeFactor ] * spargeFactor
        //  = Gfw * [ Vfw + (Vmash - Vfw) * spargeFactor  + ( Vmash - Vfw - (Vmash - Vfw ) * spargeFactor) * spargeFactor ]
        var R = BrewData;
        var p = BrewData;
        var t = this;
        var fwVol = t.firstWortVolume(false);
        var mashVol = t.mashWater();
        var sparge = t.spargeWater() / 2;
        var grainabsorbed = p.grainAbsorb * R.grainAmount;
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        return 1 + t.preboilVolume(false) * (t.preboilGravity() - 1) /
            (fwVol + (mashVol - fwVol) * spargeFactor + (mashVol - fwVol - (mashVol - fwVol) * spargeFactor) * spargeFactor);
    },
    firstWortGravity3BatchSparge: function() {
        // total extracted sugar:  Gfw(first wort graviyt) * Vmash (mash water volume)
        // sugar of fw: Gfw(first wort graviyt) * Vfw (first wort volume)
        // sugar of 1st sparge:  (Gfw * Vmash - Gfw * Vfw) * Vsparge(sprge vol)/(Vsparge + Vgrainabsorb + Vmltdeadspace) 
        // le spargeFactor = Vsparge(sprge vol)/(Vsparge + Vgrainabsorb + Vmltdeadspace) , 
        // sugar of 1st sparge: (Gfw * Vmash - Gfw * Vfw) * spargeFactor
        // sguar of 2nd sparge: 
        //   [Gfw * Vmash  - (Gfw * Vfw)  - (Gfw * Vmash - Gfw * Vfw) * spargeFactor ] * spargeFactor
        var R = BrewData;
        var p = BrewData;
        var t = this;
        var fwVol = t.firstWortVolume(false);
        var mashVol = t.mashWater();
        var sparge = t.spargeWater() / 3;
        var grainabsorbed = p.grainAbsorb * R.grainAmount;
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        return 1 + t.preboilVolume(false) * (t.preboilGravity() - 1) /
            (fwVol + (mashVol - fwVol) * spargeFactor +
                (mashVol - fwVol - (mashVol - fwVol) * spargeFactor) * spargeFactor +
                (mashVol - fwVol - (mashVol - fwVol) * spargeFactor - (mashVol - fwVol - (mashVol - fwVol) * spargeFactor) * spargeFactor) * spargeFactor);
    },
    firstWortGravity: function() {
        var R = BrewData;
        var p = BrewData;
        var t = this;
        if (p.spargeType == 0) return t.preboilGravity(); // no spage
        // batch sparege
        else if (p.spargeType == 1) {
            if (p.batchSpargeNumber == 1) return t.firstWortGravity1BatchSparge();
            else if (p.batchSpargeNumber == 2) return t.firstWortGravity2BatchSparge();
            else return t.firstWortGravity3BatchSparge();
        } else {
            // fly sparge
            return t.firstWortGravity3BatchSparge();
        }
    },
    firstWortVolume: function(expand) {
        var R = BrewData;
        var p = BrewData;
        var t = this;
        // mashwater - grain absorb - MLTDeadSpace
        var vol = t.mashWater() - p.grainAbsorb * R.grainAmount - p.MLTDeadSpace / (1 + p.wortExpansionMash / 100);
        return expand ? (1 + p.wortExpansionMash / 100) * vol : vol;
    },
    preboilGravity: function() {
        var R = BrewData;
        var p = BrewData;
        var t = this;
        return 1 + (R.targetOG() - 1) * t.postboilVolume(false) / t.preboilVolume(false);
    },
    preboilVolume: function(expand) {
        var R = BrewData;
        var p = BrewData;
        var t = this;
        // expendedPostBoilVolume + boilOff + hop absorb
        var vol = p.evaporationRate * R.boilTime / 60 + t.postboilVolume(false);
        return (expand) ? vol * (1 + p.wortExpansionMash / 100) : vol;
    },
    postboilVolume: function(expand) {
        var R = BrewData;
        var p = BrewData;
        var vol = R.batchSize + p.BKDeadSpace + p.hopAbsorb * R.hopAmount / 16;
        return (expand) ? vol * (1 + p.wortExpansionBoil / 100) : vol;
    },
    maxFirstWortGravity: function() {
        return 1 + BrewData.totalGravityPoint() / ExpectedValue.mashWater() / 1000;
    },
    maxPreBoilGravity: function() {
        //return 1 + BrewData.totalGravityPoint() / ExpectedValue.preboilVolume() / 1000;

        var t = this;
        var p = BrewData;
        // projteted:
        // total gravity points = fwVol * fwGravity + 

        var R = BrewData;
        var fwVol = t.firstWortVolume(false);
        var sparge = ExpectedValue.spargeWater() / 3;
        var grainabsorbed = R.grainAbsorb * R.grainAmount;
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        // first wort
        var extractedGPs = 1000 * (t.maxFirstWortGravity() - 1) * ExpectedValue.mashWater();
        var fwGPs = 1000 * (t.maxFirstWortGravity() - 1) * fwVol;
        var spargeGPs = (extractedGPs - fwGPs) * spargeFactor;
        var spargeGPs2 = (extractedGPs - fwGPs - spargeGPs) * spargeFactor;
        var spargeGPs3 = (extractedGPs - fwGPs - spargeGPs - spargeGPs2) * spargeFactor;
        var vol = t.preboilVolume(false);

        return 1 + (fwGPs + spargeGPs + spargeGPs2 + spargeGPs3) / vol / 1000;
    },
    maxOriginalGravity: function() {
        return 1 + BrewData.totalGravityPoint() / ExpectedValue.postboilVolume() / 1000;
    },
    brewhouseEfficiency: function() {
        return BrewData.batchSize * (BrewData.targetOG() - 1) * 1000 / BrewData.totalGravityPoint() * 100;
    },
    extractEfficiency: function() {
        var t = this;
        return (t.firstWortGravity() - 1) * t.mashWater() * 1000 / BrewData.totalGravityPoint() * 100;
    },
    inFermenterVolume: function() {
        return BrewData.batchSize;
    }
};
// volume in this object are always "expended"
var ProjectedValue = {
    firstWortGravity: function() {
        var uid = UserInputData;
        return (uid.fwGravityValid) ? uid.fwGravity : ExpectedValue.firstWortGravity();
    },
    firstWortVolume: function(expand) {
        var uid = UserInputData;
        if (uid.fwVolumeValid) {
            return expand ? uid.fwVolume : uid.fwVolume / (1 + BrewData.wortExpansionMash / 100);
        }
        return ExpectedValue.firstWortVolume(expand);
    },
    grainAbsorb: function(expand) {
        var t = this;
        var p = BrewData;
        if (expand)
            return ExpectedValue.mashWater() * (1 + p.wortExpansionMash / 100) - t.firstWortVolume(true) - p.MLTDeadSpace / (1 + p.wortExpansionMash / 100);
        else
            return ExpectedValue.mashWater() - t.firstWortVolume(false) - p.MLTDeadSpace / (1 + p.wortExpansionMash / 100);
    },
    preboilGravity1BatchSparge: function() {
        var t = this;
        var p = BrewData;
        // projteted:
        // total gravity points = fwVol * fwGravity + 

        var R = BrewData;
        var fwVol = t.firstWortVolume(false);
        var sparge = ExpectedValue.spargeWater();
        var grainabsorbed = t.grainAbsorb();
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        // first wort
        var extractedGPs = 1000 * (t.firstWortGravity() - 1) * ExpectedValue.mashWater();
        var fwGPs = 1000 * (t.firstWortGravity() - 1) * fwVol;
        var spargeGPs = (extractedGPs - fwGPs) * spargeFactor;
        var vol = t.preboilVolume(false);

        return 1 + (fwGPs + spargeGPs) / vol / 1000;
    },
    preboilGravity2BatchSparge: function() {
        var t = this;
        var p = BrewData;
        // projteted:
        // total gravity points = fwVol * fwGravity + 

        var R = BrewData;
        var fwVol = t.firstWortVolume(false);
        var sparge = ExpectedValue.spargeWater() / 2;
        var grainabsorbed = t.grainAbsorb();
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        // first wort
        var extractedGPs = 1000 * (t.firstWortGravity() - 1) * ExpectedValue.mashWater();
        var fwGPs = 1000 * (t.firstWortGravity() - 1) * fwVol;
        var spargeGPs = (extractedGPs - fwGPs) * spargeFactor;
        var spargeGPs2 = (extractedGPs - fwGPs - spargeGPs) * spargeFactor;
        var vol = t.preboilVolume(false);

        return 1 + (fwGPs + spargeGPs + spargeGPs2) / vol / 1000;
    },
    preboilGravity3BatchSparge: function() {
        var t = this;
        var p = BrewData;
        // projteted:
        // total gravity points = fwVol * fwGravity + 

        var R = BrewData;
        var fwVol = t.firstWortVolume(false);
        var sparge = ExpectedValue.spargeWater() / 3;
        var grainabsorbed = t.grainAbsorb();
        var spargeFactor = sparge / (sparge + p.MLTDeadSpace + grainabsorbed);

        // first wort
        var extractedGPs = 1000 * (t.firstWortGravity() - 1) * ExpectedValue.mashWater();
        var fwGPs = 1000 * (t.firstWortGravity() - 1) * fwVol;
        var spargeGPs = (extractedGPs - fwGPs) * spargeFactor;
        var spargeGPs2 = (extractedGPs - fwGPs - spargeGPs) * spargeFactor;
        var spargeGPs3 = (extractedGPs - fwGPs - spargeGPs - spargeGPs2) * spargeFactor;
        var vol = t.preboilVolume(false);

        return 1 + (fwGPs + spargeGPs + spargeGPs2 + spargeGPs3) / vol / 1000;
    },
    preboilGravity: function() {
        var uid = UserInputData;
        if (uid.preboilGravityValid) return uid.preboilGravity;
        // calculate preboil Gravity based on First Wort gravity & volume
        var R = BrewData;
        var p = BrewData;
        var t = this;
        if (p.spargeType == 0) return t.firstWortGravity(); // no spage
        else if (p.spargeType == 1) {
            if (p.batchSpargeNumber == 1) return t.preboilGravity1BatchSparge();
            else if (p.batchSpargeNumber == 2) return t.preboilGravity2BatchSparge();
            else return t.preboilGravity3BatchSparge();
        } else {
            // fly sparge
            return t.preboilGravity3BatchSparge();
        }
    },
    preboilVolume: function(expand) {
        var uid = UserInputData;
        var p = BrewData;

        if (uid.preboilVolumeValid) {
            return expand ? uid.preboilVolume : uid.preboilVolume / (1 + p.wortExpansionMash / 100);
        }
        // calculate preboil Gravity based on First Wort gravity & volume
        var R = BrewData;
        var t = this;
        if (p.spargeType == 0) return t.firstWortVolume(expand); // no spage
        else {
            // preboil water should be total water - grain-aborp - MLT deadspace, and expanded

            // use REAL grain absorb, instead of calculated one
            var grain_absorb = t.grainAbsorb(expand);
            var vol;
            if (expand) vol = ExpectedValue.totalWater() * (1 + p.wortExpansionMash / 100) - grain_absorb - p.MLTDeadSpace;
            else vol = ExpectedValue.totalWater() - grain_absorb - p.MLTDeadSpace;
            return vol;
        }

    },
    postboilVolume: function(expand) {
        var uid = UserInputData;
        var p = BrewData;
        if (uid.postboilVolumeValid) {
            return expand ? uid.postboilVolume : uid.postboilVolume / (1 + p.wortExpansionBoil / 100);
        }

        var vol = this.preboilVolume(false) - BrewData.evaporationRate * BrewData.boilTime / 60;
        return expand ? vol * (1 + p.wortExpansionBoil / 100) : vol;
    },
    postboilGravity: function() {
        var uid = UserInputData;
        if (uid.postboilGravityValid) return uid.postboilGravity;
        var t = this;
        return 1 + (t.preboilGravity() - 1) * t.preboilVolume() / t.postboilVolume();
    },
    brewhouseEfficiency: function() {
        var t = this;
        var p = BrewData;
        return (t.postboilGravity() - 1) * t.inFermenterVolume() * 1000 / BrewData.totalGravityPoint() * 100;
    },
    extractEfficiency: function() {
        var t = this;
        var p = BrewData;
        return (t.firstWortGravity() - 1) * ExpectedValue.mashWater() * 1000 / BrewData.totalGravityPoint() * 100;
    },
    inFermenterVolume: function() {
        return UserInputData.fermenterVolumeValid ? UserInputData.fermenterVolume : (this.postboilVolume(false) - BrewData.BKDeadSpace);
    }
};

var BrewAssistant = {
    updateWater: function() {

        var total = BrewData.metrics ? Unit.gal2L(ExpectedValue.totalWater()) : ExpectedValue.totalWater();
        $("#total-water").text("" + total.toFixed(2));
        var mash = BrewData.metrics ? Unit.gal2L(ExpectedValue.mashWater()) : ExpectedValue.mashWater();
        $("#mash-water").text("" + mash.toFixed(2));
        var sparge = BrewData.metrics ? Unit.gal2L(ExpectedValue.spargeWater()) : ExpectedValue.spargeWater();
        $("#sparge-water").text("" + sparge.toFixed(2));
        var perbatch = BrewData.metrics ? Unit.gal2L(ExpectedValue.spargeWaterPerBatch()) : ExpectedValue.spargeWaterPerBatch();
        $("#batch-sparge-water").text("" + perbatch.toFixed(2));
    },
    updateExpected: function() {
        var mfwg = BrewData.usePlato ? BrewMath.sg2plato(ExpectedValue.maxFirstWortGravity()).toFixed(1) : ExpectedValue.maxFirstWortGravity().toFixed(3);
        $("#max-firstwort-gravity").text("" + mfwg);
        var mpsg = BrewData.usePlato ? BrewMath.sg2plato(ExpectedValue.maxPreBoilGravity()).toFixed(1) : ExpectedValue.maxPreBoilGravity().toFixed(3);
        $("#max-preboil-gravity").text("" + mpsg);
        var mog = BrewData.usePlato ? BrewMath.sg2plato(ExpectedValue.maxOriginalGravity()).toFixed(1) : ExpectedValue.maxOriginalGravity().toFixed(3);
        $("#max-original-gravity").text("" + mog);

        var efwg = BrewData.usePlato ? BrewMath.sg2plato(ExpectedValue.firstWortGravity()).toFixed(1) : ExpectedValue.firstWortGravity().toFixed(3);
        $("#exp-firstwort-gravity").text("" + efwg);
        var epsg = BrewData.usePlato ? BrewMath.sg2plato(ExpectedValue.preboilGravity()).toFixed(1) : ExpectedValue.preboilGravity().toFixed(3);
        $("#exp-preboil-gravity").text("" + epsg);
        var eog = BrewData.usePlato ? BrewMath.sg2plato(BrewData.targetOG()).toFixed(1) : BrewData.targetOG().toFixed(3);
        $("#exp-original-gravity").text("" + eog);

        var fw = BrewData.metrics ? Unit.gal2L(ExpectedValue.firstWortVolume(true)) : ExpectedValue.firstWortVolume(true);
        $("#exp-firstwort-vol").text("" + fw.toFixed(2));

        var preb = BrewData.metrics ? Unit.gal2L(ExpectedValue.preboilVolume(true)) : ExpectedValue.preboilVolume(true);
        $("#exp-preboil-vol").text("" + preb.toFixed(2));

        var postb = BrewData.metrics ? Unit.gal2L(ExpectedValue.postboilVolume(true)) : ExpectedValue.postboilVolume(true);
        $("#exp-postboil-vol").text("" + postb.toFixed(2));

        var ferm = BrewData.metrics ? Unit.gal2L(ExpectedValue.inFermenterVolume()) : ExpectedValue.inFermenterVolume();
        $("#exp-fermenter-vol").text("" + ferm.toFixed(2));

        $("#exp-bh-efficiency").text("" + ExpectedValue.brewhouseEfficiency().toFixed(1));
        $("#exp-extract-efficiency").text("" + ExpectedValue.extractEfficiency().toFixed(1));
    },
    updateChange: function() {
        this.updateWater();
        this.updateExpected();
        this.updateProjected();
    },
    updateProjected: function() {
        var pfwg = BrewData.usePlato ? BrewMath.sg2plato(ProjectedValue.firstWortGravity()).toFixed(1) : ProjectedValue.firstWortGravity().toFixed(3);
        $("#pro-firstwort-gravity").text("" + pfwg);
        var ppsg = BrewData.usePlato ? BrewMath.sg2plato(ProjectedValue.preboilGravity()).toFixed(1) : ProjectedValue.preboilGravity().toFixed(3);
        $("#pro-preboil-gravity").text("" + ppsg);
        var pog = BrewData.usePlato ? BrewMath.sg2plato(ProjectedValue.postboilGravity()).toFixed(1) : ProjectedValue.postboilGravity().toFixed(3);
        $("#pro-original-gravity").text("" + pog);

        var fw = BrewData.metrics ? Unit.gal2L(ProjectedValue.firstWortVolume(true)) : ProjectedValue.firstWortVolume(true);
        $("#pro-firstwort-vol").text("" + fw.toFixed(2));

        var preb = BrewData.metrics ? Unit.gal2L(ProjectedValue.preboilVolume(true)) : ProjectedValue.preboilVolume(true);
        $("#pro-preboil-vol").text("" + preb.toFixed(2));

        var postb = BrewData.metrics ? Unit.gal2L(ProjectedValue.postboilVolume(true)) : ProjectedValue.postboilVolume(true);
        $("#pro-postboil-vol").text("" + postb.toFixed(2));

        $("#pro-bh-efficiency").text("" + ProjectedValue.brewhouseEfficiency().toFixed(1));
        $("#pro-extract-efficiency").text("" + ProjectedValue.extractEfficiency().toFixed(1));

        var ferm = BrewData.metrics ? Unit.gal2L(ProjectedValue.inFermenterVolume()) : ProjectedValue.inFermenterVolume();
        $("#pro-fermenter-vol").text("" + ferm.toFixed(2));

        // check og 
        $(".stick-og").hide();
        // use projtected OG pog
        var target_og = BrewData.usePlato ? BrewMath.sg2plato(BrewData.targetOG()).toFixed(1) : BrewData.targetOG().toFixed(3);
        if (pog > target_og) {
            $("#adjust-dilution").show();
            var nv = (ProjectedValue.postboilGravity() - 1) * ProjectedValue.postboilVolume() / (BrewData.targetOG() - 1);
            var added = nv - ProjectedValue.postboilVolume();
            // use expansion volume
            nv = nv * (1 + BrewData.wortExpansionBoil / 100);
            if (BrewData.metrics) nv = Unit.gal2L(nv);
            $("#adjusted-volume").text(nv.toFixed(2));
            var ferm = added + ProjectedValue.inFermenterVolume();
            if (BrewData.metrics) ferm = Unit.gal2L(ferm);
            $("#adjusted-ferm-volume").text(ferm.toFixed(2));
            if (BrewData.metrics) added = Unit.gal2L(added);
            $("#adjusted-added-water").text(added.toFixed(2));
        } else if (pog < target_og) {
            $("#adjust-dme").show();
            var dme = (BrewData.targetOG() - ProjectedValue.postboilGravity()) * ProjectedValue.postboilVolume() / 0.044 * 16;
            $("#adjusted-added-dme").text(BrewData.metrics ? Math.round(Unit.oz2g(dme)) : dme.toFixed(1));

            $("#adjust-boil").show();
            var expvol = (ProjectedValue.postboilGravity() - 1) * ProjectedValue.postboilVolume() / (BrewData.targetOG() - 1);
            var boiloff = ProjectedValue.postboilVolume() - expvol;
            var time = boiloff / BrewData.evaporationRate * 60;
            var infermenter = expvol - BrewData.BKDeadSpace;

            $("#adjusted-boil-time").text(Math.round(time));
            expvol = expvol * (1 + BrewData.wortExpansionBoil / 100);
            if (BrewData.metrics) expvol = Unit.gal2L(expvol);
            $("#adjusted-shrink-volume").text(expvol.toFixed(2));
            if (BrewData.metrics) infermenter = Unit.gal2L(infermenter);
            $("#adjusted-shrink-ferm-volume").text(infermenter.toFixed(2));
        }

    },
    showGravityUnit: function() {
        if (BrewData.usePlato) {
            $(".plato-unit").show();
        } else {
            $(".plato-unit").hide();
        }
    },
    gravityUnitChanged: function() {
        this.showGravityUnit();
        this.updateExpected();
        this.updateProjected();
        // inputs
        var og = BrewData.usePlato ? BrewMath.sg2plato(BrewData.targetOG()).toFixed(1) : BrewData.targetOG().toFixed(3);
        $("#target-og").val(og);

        if (UserInputData.fwGravityValid) {
            var fwg = BrewData.usePlato ? BrewMath.sg2plato(UserInputData.fwGravity).toFixed(1) : UserInputData.fwGravity;
            $("#i-fw-sg").val(fwg);
        }
        if (UserInputData.preboilGravityValid) {
            var fpsg = BrewData.usePlato ? BrewMath.sg2plato(UserInputData.preboilGravity).toFixed(1) : UserInputData.preboilGravity;
            $("#i-pb-sg").val(fpsg);
        }
        if (UserInputData.postboilGravityValid) {
            var fsg = BrewData.usePlato ? BrewMath.sg2plato(UserInputData.postboilGravity).toFixed(1) : UserInputData.postboilGravity;
            $("#i-final-sg").val(fsg);
        }

    },
    showUnit: function() {
        if (BrewData.metrics) {
            $(".imperial").hide();
            $(".metrics").show();
        } else {
            $(".imperial").show();
            $(".metrics").hide();
        }
    },
    unitChanged: function() {
        this.showUnit();
        this.init_input();
        this.updateWater();
        this.updateChange();
    },
    input_map: {
        MLTDeadSpace: { i: "mlt-deadspace", t: "vol1", r: 2 }, //gallon
        BKDeadSpace: { i: "bk-deadspace", t: "vol1", r: 2 }, // gallon
        evaporationRate: { i: "boiloff-rate", t: "vol1", r: 2 }, // gallon/hr
        //var BrewParameter={
        grainAbsorb: { i: "grain-absorb", t: "vol1wt1", r: 3 }, //gallon/lb
        hopAbsorb: { i: "hop-absorb", t: "vol1wt1", r: 3 }, // gallon/kg
        wortExpansionBoil: { i: "wort-boil-exp-rate", t: null, r: 1 },
        wortExpansionMash: { i: "wort-mash-exp-rate", t: null, r: 1 },
        batchSpargeNumber: { i: "batch-sparge-number", t: null, r: 0 },

        batchSize: { i: "batch-size", t: "vol1", r: 2 }, //gallon
        grainAmount: { i: "grain-amount", t: "wt1", r: 2 }, //lbs
        hopAmount: { i: "hop-amount", t: "wt2", r: 2 }, //oz/g
        boilTime: { i: "boil-time", t: null, r: 0 }, // min

        brewHouseEfficiency: { i: "bh-efficiency", t: "eff", r: 1 },
        mashThickness: { i: "mash-thickness", t: "vol2wt", r: 2 }, //  qt/lb
        strikingVolume: { i: "striking-volume", t: "vol1", r: 2 }, //  qt/lb
        targetOriginalGravity: { i: "target-og", t: null, r: 3 }
    },
    init_input: function() {
        $.each(this.input_map, function(key, id) {
            var value = BrewData[key];
            if (BrewData.metrics) {
                if (id.t == "vol1") // gal or Liter
                    value = Unit.gal2L(value);
                else if (id.t == "vol1wt1") //gal/lb or l/kg
                    value = Unit.gallb2lkg(value);
                else if (id.t == "wt1") // lb or kg
                    value = Unit.lb2kg(value);
                else if (id.t == "wt2") // oz or gram
                    value = Unit.oz2g(value);
                else if (id.t == "vol2wt") // qt/lb to  kg /lt
                    value = Unit.qtlb2lkg(value);
            }
            if ($("#" + id.i).hasClass("gravity-input")) {
                if (BrewData.usePlato) value = BrewMath.sg2plato(value).toFixed(1);
                else value = value.toFixed(3);
                $("#" + id.i).val(value);
            } else {
                $("#" + id.i).val(value.toFixed(id.r));
            }

        });
    },
    setCookie: function(k) {
        if (typeof(BrewData[k]) == "boolean") {
            setCookie(k, BrewData[k] ? "1" : "0", 30);
        } else {
            setCookie(k, BrewData[k], 30);
        }
    },
    getSettings: function() {
        var d = document.cookie.split(';');
        for (var i = 0; i < d.length; i++) {
            var p = d[i].split('=');
            if (p && p.length > 1) {
                var k = p[0].trim();
                var v = p[1].trim();
                if (typeof BrewData[k] != "undefined") {
                    if (typeof(BrewData[k]) == "boolean")
                        BrewData[k] = (v != "0");
                    else
                        BrewData[k] = parseFloat(v);

                }
            }
        }
    },
    init: function() {
        var t = this;
        t.getSettings();
        $("input:radio[name='gravity-unit']").filter('[value="' + (BrewData.usePlato ? 1 : 0) + '"]').prop("checked", true);
        $("input:radio[name='gravity-unit']").change(function() {
            BrewData.usePlato = ($("input:radio[name='gravity-unit']:checked").val() == 1);
            t.setCookie("usePlato");
            t.gravityUnitChanged();
        });
        this.showGravityUnit();

        $("input:radio[name='metrics']").filter('[value="' + (BrewData.metrics ? 1 : 0) + '"]').prop("checked", true);
        $("input:radio[name='metrics']").change(function() {
            BrewData.metrics = ($("input:radio[name='metrics']:checked").val() == 1);
            t.setCookie("metrics");
            t.unitChanged();
        });
        t.showUnit();
        if (BrewData.spargeType == 0) $(".fwcalrow").hide();
        $("input:radio[name='sparge-type']").filter('[value="' + BrewData.spargeType + '"]').prop("checked", true);
        $("input:radio[name='sparge-type']").change(function() {
            BrewData.spargeType = $("input:radio[name='sparge-type']:checked").val();
            t.setCookie("spargeType");
            if (BrewData.spargeType == 0) $(".fwcalrow").hide();
            else $(".fwcalrow").show();
            t.updateChange();
        });

        if (BrewData.spargeType == 0) $(".fwcalrow").hide();
        $("input:radio[name='sparge-type']").filter('[value="' + BrewData.spargeType + '"]').prop("checked", true);
        $("input:radio[name='sparge-type']").change(function() {
            BrewData.spargeType = $("input:radio[name='sparge-type']:checked").val();
            t.setCookie("spargeType");
            if (BrewData.spargeType == 0) $(".fwcalrow").hide();
            else $(".fwcalrow").show();
            t.updateChange();
        });

        $("input:radio[name='striking-val-type']").filter('[value="' + BrewData.strikingCalculate + '"]').prop("checked", true);
        $("input:radio[name='striking-val-type']").change(function() {
            BrewData.strikingCalculate = $("input:radio[name='striking-val-type']:checked").val();
            t.setCookie("strikingCalculate");
            t.updateChange();
        });

        $.each(t.input_map, function(key, id) {
            $("#" + id.i).change(function() {
                var value = parseFloat($(this).val());
                if (BrewData.metrics) {
                    if (id.t == "vol1")
                        value = Unit.L2gal(value);
                    else if (id.t == "vol1wt1")
                        value = Unit.lkg2gallb(value);
                    else if (id.t == "wt1") // lb or kg
                        value = Unit.kg2lb(value);
                    else if (id.t == "wt2") // oz or gram
                        value = Unit.g2oz(value);
                    else if (id.t == "vol2wt") // qt/lb to  kg /lt
                        value = Unit.lkg2qtlb(value);
                }

                if ($("#" + id.i).hasClass("gravity-input")) {
                    if (BrewData.usePlato) value = BrewMath.plato2sg(value);
                }

                BrewData[key] = value;
                t.setCookie(key);

                if (key == "grainAmount") {
                    BrewData.targetOriginalGravity = 1 + 0.001 * BrewData.totalGravityPoint() * BrewData.brewHouseEfficiency / 100 / BrewData.batchSize;
                    $("#" + t.input_map.targetOriginalGravity.i).val(BrewData.usePlato ? BrewMath.sg2plato(BrewData.targetOriginalGravity).toFixed(1) : BrewData.targetOriginalGravity.toFixed(3));
                    t.setCookie("targetOriginalGravity");
                } else if (key == "brewHouseEfficiency") {
                    BrewData.targetOriginalGravity = 1 + 0.001 * BrewData.totalGravityPoint() * BrewData.brewHouseEfficiency / 100 / BrewData.batchSize;
                    $("#" + t.input_map.targetOriginalGravity.i).val(BrewData.usePlato ? BrewMath.sg2plato(BrewData.targetOriginalGravity).toFixed(1) : BrewData.targetOriginalGravity.toFixed(3));
                    t.setCookie("targetOriginalGravity");
                } else if (key == "targetOriginalGravity") {
                    BrewData.brewHouseEfficiency = (BrewData.targetOriginalGravity - 1) * 1000 * BrewData.batchSize / BrewData.totalGravityPoint() * 100;
                    $("#" + t.input_map.brewHouseEfficiency.i).val(BrewData.brewHouseEfficiency.toFixed(1));
                    t.setCookie("brewHouseEfficiency");
                }

                t.updateChange();
            });
        });

        var umap = {
            fwVolume: "i-fw-vol",
            preboilVolume: "i-pb-vol",
            postboilVolume: "i-final-vol",
            fermenterVolume: "i-fermenter-vol"
        };
        $.each(umap, function(key, id) {
            //            $("#" + id).spinner();
            $("#" + id).change(function() {
                var v = parseFloat($(this).val());
                if (isNaN(v) || v == 0) {
                    UserInputData[key + "Valid"] = false;
                } else {
                    if (BrewData.metrics) v = Unit.L2gal(v);
                    UserInputData[key] = v;
                    UserInputData[key + "Valid"] = true;
                }
                t.updateProjected();
            });


        });

        // initialize dialog
        $("#refrac-correction").val(BrewData.refrac_cor);
        var ct = BrewData.hydro_ct;
        if (BrewData.metrics) ct = F2C(ct).toFixed(1);
        $("#corrected-temp").val(ct);
        $("#hydro-temp").val(ct);


        var gmap = {
            fwGravity: "i-fw-sg",
            preboilGravity: "i-pb-sg",
            postboilGravity: "i-final-sg"
        };

        $.each(gmap, function(key, id) {
            $("#" + id).focus(function() {
                window.focusinput = key;
                $('#dlg_sginput').modal();
                $('#dlg_sginput_label').text($(this).attr("dlg-title"));
            });
        });

        $("#dlg_sginput button.btn-primary").click(function() {
            var key = window.focusinput;
            if (typeof window.inputgravity != "undefined") {
                $('#dlg_sginput').modal('hide');
                if (isNaN(window.inputgravity)) {
                    UserInputData[key + "Valid"] = false;
                    $("#" + gmap[key]).val("");
                } else {
                    $("#" + gmap[key]).val(window.inputgravity);
                    t.setCookie("hydro_ct");
                    t.setCookie("refrac_cor");
                    var v = BrewData.usePlato ? BrewMath.plato2sg(window.inputgravity) : window.inputgravity;
                    UserInputData[key] = parseFloat(v);
                    UserInputData[key + "Valid"] = true;
                }
                t.updateProjected();
            }
        });

        t.init_input();
        t.updateChange();
        // for gravity input dialog
        $("input.refrac-input").keyup(function() {
            var fr = parseFloat($("#refrac-reading").val());
            var cr = parseFloat($("#refrac-correction").val());
            if (isNaN(fr) || isNaN(cr)) {
                window.inputgravity = NaN;
                return;
            }
            BrewData.refrac_cor = cr;
            var br = fr / cr;
            var val = BrewData.usePlato ? br.toFixed(1) : BrewMath.plato2sg(br).toFixed(3);
            $("#refrac-value").text(val);
            window.inputgravity = val;
        });

        $("input.hydro-input").keyup(function() {
            var rd = parseFloat($("#hydro-reading").val());
            var tmp = parseFloat($("#hydro-temp").val());
            var ct = parseFloat($("#corrected-temp").val());
            if (isNaN(rd) || isNaN(tmp) || isNaN(ct)) {
                window.inputgravity = NaN;
                return;
            }
            if (BrewData.metrics) {
                tmp = C2F(tmp);
                ct = C2F(ct);
            }
            BrewData.hydro_ct = ct;
            if (BrewData.usePlato) rd = BrewMath.plato2sg(rd);
            var corrected = BrewMath.sgTempCorrected(rd, tmp, ct);
            var val = BrewData.usePlato ? BrewMath.sg2plato(corrected).toFixed(1) : corrected.toFixed(3);
            $("#hydro-value").text(val);
            window.inputgravity = val;
        });
    }
};