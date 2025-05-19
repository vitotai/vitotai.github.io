
var bgImage={
 width:557,
 height:572,
 origin:[70,505],
 max:[544,29],
 shudos:[25,-30],
 sandos:[0.4,2.6],
 originMap:[25,0.4],
 maxMap:[-30,2.6]
};
const MarkSize=6;
var AmeSan={
init:function(cid,bgsrc){
    // get div
    var canvas = document.getElementById(cid);
    canvas.style.width = bgImage.width +'px';
    canvas.style.height = bgImage.height + 'px';
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = bgsrc;
    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 0,0);
    });    
    this.ctx= ctx;
    this.bgImage=image;
},
plotOn:function(shudo,sando){

    var x =bgImage.origin[0] + (bgImage.max[0] - bgImage.origin[0]) * (shudo - bgImage.shudos[0])/ (bgImage.shudos[1] - bgImage.shudos[0]); 
    var y =bgImage.origin[1] + (bgImage.max[1] - bgImage.origin[1]) * (sando - bgImage.sandos[0])/ (bgImage.sandos[1] - bgImage.sandos[0]); 
    const ctx =this.ctx;
    // clear
    ctx.drawImage(this.bgImage, 0,0);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,MarkSize,0,2 * Math.PI);
    ctx.fill();
}
};