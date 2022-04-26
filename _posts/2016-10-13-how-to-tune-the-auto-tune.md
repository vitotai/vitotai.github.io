---
id: 521
title: 'How to tune the Auto Tune?'
date: '2016-10-13T04:13:28+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=521'
permalink: /2016/10/521
categories:
    - BrewManiac
---

The PID parameters have bothered me for a while, so I managed to integrate the PID AutoTune library:  
https://github.com/br3ttb/Arduino-PID-AutoTune-Library  
It was very easy, but testing it takes longer than I have thought. I finally get a set of PID parameters for 2 gallons of water. (Yes, I was testing and didn’t want to spend too much time waiting the water to be heated.) It took almost two hours to get the auto tune done, and it took me two days to get this result. The reason: there are parameters for Auto Tune to tune the PID parameter automatically. They are

- Start output
- step
- noise range
- look back time

Noise and look back time are well explained on author’s page, and I mis-understood the meaning of start output and step until I checked the source code:

```
//oscillate the output base on the input's relation to the setpoint
 if(refVal>setpoint+noiseBand) *output = outputStart-oStep;
 else if (refVal<setpoint-noiseBand) *output = outputStart+oStep;
```

I set both outputstart and step to 127.5 to make it finish the tuning, so that the output is full at 255 or nothing at zero. The time it took, however, is not reasonable. That might imply that the values of the other two settings are not appropriate. I have to figure out the correct settings of Auto Tune to get the correct settings of PID. That is kind of funny thing to me.  
The library needs a few “peaks” to get the tuning done, which means the quicker the temperature changes, the faster the tuning can be finished. Since I change the heating mode of my Grainfather to Mash mode, it heats up slowly. I am testing it indoor, so the temperature drops slowly. The result is a slow tuning process. I don’t know how other PID device can perform the auto tune so quickly in a few minutes.  
The parameters for different volume(or mass) and different heating power should be different. Even in different environment, the parameters should be different. However, I would bet the parameter for 5 gallon water would be good enough in most cases.To make this function more practical, the tuning time should be shorter.  
BTW, I’ve changed the heating(PID) algorithm. The original code will use PID when the temperature is 3.5 degree away from target and 1 degree from boiling. I think PID is meanness for boiling phase, so I make it full before boiling and turn it into PWM mode after boil. PID is only used before boiling phase after the temperature reaches a defined range. I think 0.5-1.5 might be a good value, given that fact that the mass of 5 gallon or more water won’t be heated up so quickly.  
Update:  
Using 0.2 as the noise range, 30 seconds as Look Back time, and tuning at 60C, the Auto Tune can finish in 30 minutes. The key seem to be the tuning temperature. The higher temperature, the quicker it drops, and the quicker to get peaks for the AutoTune algorithm.