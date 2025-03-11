---
id: 809
title: 'BrewPiLess release v2.4'
date: '2017-11-10T00:05:54+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=809'
categories:
    - BrewPi@ESP8266
---

[BrewPiLess release v2.4](https://github.com/vitotai/BrewPiLess)

- [Brew and calibrate iSpindel](https://github.com/vitotai/BrewPiLess#brew-and-calibrate-ispindel)
- [Use iSpindel temperature reading as Beer Sensor](https://github.com/vitotai/BrewPiLess#using-ispindel-as-beer-temperature-sensor).
- Display tilt value of iSpindel.  
    This is part of the “Brew and calibrate” functions.
- Enhance SSE re-establishment
- Default configurable minimum cooling/heating time &amp; back-up sensor. (That is, Glycol supported.)
- HTTP Port settings in Config page.  
    ## ***Please note: you will have to run Device Setup to setup temperature sensors and PIN usages if you are upgrading from old version other than glycol option.***

I really like the new “Brew and Calibrate” feature. My iSpindel works great. However, every time I open the cap to charge it, the stuff inside moves a little, and the readings will drift a little bit. The result of using this method is better than that of calibrated one.  
BTW, the working principle of iSpindel is exactly the same as a hydrometer. Therefore, temperature correction is necessary.  
In the following chart,**<span style="color: #800080;"> Purple</span>** line is temperature-corrected reading and **<span style="color: #00ff00;">green</span>** line is non corrected readings. Without correction, the gravity reading rises when the temperature drops. The corrected reading also rises a little bit, though.  
![](/wp-content/uploads/2017/11/tc.jpg)  
The gravity readings used to calibrate iSpindel should be ***NOT*** temperature-corrected. The way of deriving gravity values from TILT values is using a function(formula) having a single parameter, the tilt value. We assume that there exists such a function exists and try to find one that is approximate to the perfect one.  
The physics principle of iSpindel is the same as a floating hydrometer. A hydrometer will show different values for wort at different temperatures.  
For example, wort of 2.6% BRIX will be measured as 1.010@20C, 1.011@4C, and 1.009@24C. The Specific Gravity, which is the value after temperature correction applied, will all be 1.010, calibration to 20C.  
The TILT values should be different in the same wort at different temperatures because the density of the liquid is different. Let the TILT values of 1.009, 1.010, 1.011 be x1, x2, x3. It’s not possible to have a function, f(x), so that f(x1) = (fx2) = f(x3) = 1010. Obviously, finding a function, f(x), so that f(x1) = 1.009, f(x2) = 1.010, f(x3) = 1.011 is possible. Applying the temperature correction, the correct Specific Gravity can be derived.