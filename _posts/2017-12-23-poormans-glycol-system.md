---
id: 836
title: 'Poorman&#039;s Glycol system'
date: '2017-12-23T02:59:57+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=836'
permalink: /2017/12/836
categories:
    - BrewPi@ESP8266
---

A real glycol chiller is expensive, and DIY glycol chiller from an air conditioner is kind of too hardcore for people like me. Therefore, I am using a re-purposed fridge as “glycol” chiller. The air is bad heat conductor, so I ended up using a bucket of water and bending the plate into water. It works really well except that the water sometimes gets frozen because I use no glycol but plain water. One thing I also observe is that the beer temperature seem to be more stable if the temperature of “glycol” is not too cold.  
In a nutshell, a temperature controller is necessary to control the poorman’s glycol chiller.  
I have a spare BPL, but somehow I don’t want to use it. The BPL I am using has a two way relay board, and I am using only one for cooling, controlling the pump. The temperature of “glycol” is monitored by the “room” sensor. Simple hysteresis temperature control with timed constraints to protect the compressor would do the job.  
I am not going to make it “official”, but I would love to share if anyone wants to try it.  
The option is not enabled by default, so you have to build it by yourself.  
<span style="font-family: 'Courier 10 Pitch', Courier, monospace; font-size: 13px; background-color: #f4f4f4;">build\_flags = -Wl,-Tesp8266.flash.4m.ld </span><span style="font-family: 'Courier 10 Pitch', Courier, monospace; font-size: 13px; background-color: #f4f4f4;">-DEanbleParasiteTempControl=true</span>  
You will need a HTML file for setting. It is “paractrl.htm” in “extra” folder at Github. Manually upload it to BPL, and open it. The setting should be straightforward.  
![](/wp-content/uploads/2018/02/paractrl.jpg)

- Enable Parasite Temperature Control
- Cooling PIN /Inverted.  
    Only **coolingPin**, **heatingPin**, and **doorPin** can be used. They are D5, D7 and D4 in default configuration. If they are used by BrewPi temperature control, the options of PINs used will be disabled. You ***CAN*** mess it by selecting the PIN and **later** assigning it for cooling or heating in Device Setup page. Don’t do that.
- Target Temperature  
    The cooling will **stop** when the temperature is equal or lower than this value.
- Triggering Temperature  
    The cooling will be **started** when the temperature is greater than this value. This value should be at least 0.5 higher than “Target Temperature”
- Minimum Cooling Time  
    Must be greater than or equal to180 (seconds).
- Minimum Idle Time  
    Must be greater than or equal to180 (seconds).

My setup:  
![](/wp-content/uploads/2018/02/watertank.jpg)  
The water level is higher when in use. (I was pumping out the water.) Before applying the parasite temperature control, the water might get frozen and clog the tubing.