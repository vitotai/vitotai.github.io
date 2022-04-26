---
id: 971
title: 'Temperature and Calibrating iSpindel'
date: '2018-04-02T01:26:48+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=971'
permalink: /2018/04/971
categories:
    - BrewPi@ESP8266
---

<div class="markdown-body">This post discusses temperature correction of iSpindel and the values to calibrate it.  
To be clarified, the meaning of **calibration** of iSpindel is ***deriving a formula*** which can be used to calculate **specific gravity** from the ***tilt*** value. To derive the formula, multiple set of ***tilt*** and ***specific gravity reading*** vectors are needed.  
The definition of **specific gravity** is the *density* of the liquid compared to water. A common tool to measure specific gravity is the hydrometer. Hydrometers are usually calibrated to 20°C(68°F) or 15°C(60°F), and temperature correction is necessary if the temperature of the liquid, wort or beer, is not equal to the calibrating temperature of that specific hydrometer.  
Some people used to use plato instead of gravity and provide plato readings to calibrate iSpindel, which might have some issues. The reason is that ***the working principle of iSpindel is exactly the same as the hydrometer***, which measures the *density* of liquid instead of sugar content in it.  
For example, 10° Plato is converted to 1.0400 specific gravity. If the wort is heated or cooled, the plato readings will be the same while the specific gravity *readings* will not. All specific gravity *values* will equal to 1.0400 after temperature correction if no water loss or added. It is simply because the *density* of the wort changes while the ratio of sugar to water doesn’t.  
Take this example further. If a hydrometer calibrated at 20°C(68°F) is used to measure wort of 10° Plato, the readings will be - 1.027 @ 60°C
- 1.035 @ 40°C
- 1.040 @ 20°C
- 1.041 @ 4°C

Will the tilt values in these wort be the same? Obviously, the answer is **no**. The tilt value reflects the floating force which is related to the ***density*** of the liquid.  
The process and purpose of “calibration of iSpinel” is to get a formula to convert **tilt values** into readings of a hydrometer. Assuming there exists a perfect formula simple *polynomial* **f(x)** that can covert tilt values into readings of the hydrometer,  
Let f(x)=ax^3+ bx^2+ cx +d .  
Let tilt values be

- 1.027 @ 60°C tilt: 21
- 1.035 @ 40°C tilt: 30
- 1.040 @ 20°C tilt: 40
- 1.041 @ 4°C tilt: 45

We will be able to derive the values of *a, b, c,* and *d* by using the 4 pairs of data, (1.027, 21), (1.035, 30), (1.040, 40), (1.041, 50).\*1  
This is an extreme example. Usually we use different wort of different specific gravities under roughly the same temperature, usually around 20°C/68°F. Therefore, using plato instead of specific gravity works fine as well. Moreover, the fermentation temperature is usually kept in a range as small as possible, which misleads us *not* to consider temperature correction. **The effect of ignoring temperature correction will show up when the beer is cold crashed** after end of fermentation, when the specific gravity should not change but iSpindel reports rise of specific gravity because the density of beer rises when the temperature is lowered.  
**Short summary**: the iSpindel works in the same way as the hydrometer. The best we can get is having a formula that convert tilt values into the exact *readings* of a hydrometer. The readings of hydrometers must be corrected to be real specific gravity , so do the results from iSpindel.  
The simplest way to calibrate a iSpindel is using the *readings* of a specific hydrometer without temperature correction in the same wort. Afterward, the result of iSpindel should be corrected to the calibrated temperature of that specific hydrometer.  
Taking the above description into consideration, including temperature corrected results of iSpindel, the “brew and calibrate” feature of BrewPiLess should be done in this way.

- The specific gravity of water is not necessarily 1.0, so The reading of the hydrometer in the same water should be entered.
- If the temperatures of beer measured by iSpindel and hydrometer differ, the readings used to derive the formula should be corrected to the *temperature of iSpindel*. 
    - The OG might be measured before the wort is cooled to pitching temperature.
    - During fermentation, the beer should be measured as quick as possible so that the temperature won’t change a lot and the effect of bubbles might be included. De-gasing the beer might not be a good idea.
    - Usually, brewers care about specific gravity, not the reading of a hydrometer. Therefore, specific gravities will be recorded, and BPL will use corrected value.
    - For example, if the beer in the fermenter is at 10°C, the same beer measured is at 18°C, and the hydrometer is calibrated at 15°C, then the recorded gravity will be the one corrected to 15°C, and the gravity reading will be corrected to 10°C for iSpindel calibration. If the formula is perfectly derived, we will get an uncorrected gravity reading from iSpindel at 10°C. After corrected the temperature to 15°C, it will be the corrected specific gravity, which should be the same as the reading measured at 18°C and corrected to 15°C.

</div><div class="wiki-footer" id="wiki-footer"></div><div>*1: The way to derive the formula is *linear regression* instead of solving the equations. The real relationship is arctangent according the result calculated by a physician in the original iSpindel thread. Given the fact that there are errors in the **provided data**, tilt values and gravity readings, a third order polynomial is good enough. In fact, I usually get decent results by only two sets of data, the OG and tilt value in water. BPL will derive a first order polynomial when only two sets of data is available.</div>