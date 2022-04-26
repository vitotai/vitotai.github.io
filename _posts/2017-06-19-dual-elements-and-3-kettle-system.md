---
id: 710
title: 'Dual elements and 3-kettle system'
date: '2017-06-19T04:47:51+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=710'
permalink: /2017/06/710
categories:
    - BrewManiac
---

Grainfather has a switch labelled as “normal/mash”. When the switch is at “Normal” position, the heating element runs at maximum power. When it is at “Mash” position, smaller power is used. Therefore, that switch is put on “Mash” only when mashing. I have forgotten to switch for serval times, so I have thought of using the additional actuator(relay control) to control it. By supporting dual elements, the controller can be configured to run at lower power when mashing and at maximum by using both elements during heating striking water and boiling stage  
The setting should be able to config the usage of elements for

- Pre-mash (mash-in)
- Mashing (mash rest through mash out)
- Boil
- Post Boil

To provide maximum flexibility, the setting will be Primary, Secondary, and Both.  
How about 3-kettle system? BrewManiaxEx is designed for E-BIAB, right? Yes, but after reading [the Electric Brewery](http://www.theelectricbrewery.com/brew-day-step-by-step), I found that by providing this new dual elements support, BrewManaicEx can be used to control a 3-kettle system.  
Hardware Setup: (Please check the Electric Brewery for detail)

- three kettle: HLT/MLT/BK with E-HERMS
- Two elements in HLT and BK. (***Additional mechanical switch is highly recommended***.)
- Two pump: water pump and wort pump.
- BrewManiacEx setup 
    - Three temperature sensors in three kettles
    - Control the two elements of HLT and BK. (Let HLT be primary and BK be secondary)
    - One pump can be controlled by BrewManiacEx, but the other must be controlled by a mechanical switch.

BrewManiacEx settings

- Sensor setting (the primary sensor is the sensor used in PID algorithm.) 
    - Pre-Mash primary sensor: HLT sensor
    - Mashing Primary sensor: HLT (or MLT)
    - Boil primary sensor: BK
    - Post Boil primary sensor: BK
- Elements Setting 
    - Pre-Mash: Primary(HLT):on, Secondary(BK):off
    - Mashing: Primary(HLT):on, Secondary(BK):off
    - Boil: Primary(HLT):**off**, Secondary(BK):**on**
    - Post Boil: Primary(HLT):off, Secondary(BK):on
- Other related Setting 
    - PID doughing-in: ON
    - PID remove malt: OFF (Currently this setting is call PID pipe, active or passive
- Pump setting, if BrewManiacEx controls water pump 
    - pre-Mash ON
    - Mashing ON
    - Boil Off
- Pump setting, if BrewManiacEx controls wort pump 
    - pre-Mash OFF
    - Mashing ON
    - Boil Off

The pump can be controlled manually during the whole process, so it’s like a software switch.  
Let’s go through the brew step by step:

<div style="direction: ltr; border-width: 100%;"><div style="direction: ltr; margin-top: 0in; margin-left: 0in; width: 8.5131in;"><div style="direction: ltr; margin-top: 0in; margin-left: 0in; width: 8.5131in;"><div style="direction: ltr;">| Step | Electric Brewing | 3 – kettle by BrewManiacEx | Note |
|---|---|---|---|
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Fill HLT with water</span> | Connect water pump input/output to HLT | After filling water and configuring the pump, start automatic process |  |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Heat Strike Water</span> | 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">\[Water pump\] Recirculate HLT to HLT</span> 2. <span style="font-family: Calibri; font-size: 11.0pt;">Set PID of HLT to 149F </span> | PID runs on Heater of HLT, and the temperature is automatically set to 149F | Set preMash heater to Primary Heater(Heater 1) |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Transfer water to MLT</span> | By \[Water pump\] | When temperature reaches. Controller prompt to Dough IN. Transfer the water. |  |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Doughing-in</span> | 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">HLT PID to 149F</span> 2. <span style="font-family: Calibri; font-size: 11.0pt;">\[Water pump\] recirculate HLT to HLT</span> 3. <span style="font-family: Calibri; font-size: 11.0pt;">\[wort pump\] recirculate wort from MLT to HLT(coil) back to MLT</span> 4. <span style="font-family: Calibri; font-size: 11.0pt;">Add malt when temperature is steady at 149F</span> | Setup pump in the same way as described. Start the pumps.  Wait the temperature reaches 149F and put malt in. | Set PID when Dough-In to ON |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Mashing</span> | Start timer for mashing time. | Press “OK” for “Add Malt” prompt. The timer starts automatically when temperature reaches 149F. | Set Mashing heater to Primary Heater(Heater 1) |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Mash out</span> | Rise PID of HLT to mashout temperature | Mashout temperature will be set when desired rest time expires. |  |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Sparge</span> | 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">\[wort pump\] transfer wort from MLT to BK</span> 2. <span style="font-family: Calibri; font-size: 11.0pt;">\[waer pump\] transfer water from HLT to MLT</span> 3. <span style="font-family: Calibri; font-size: 11.0pt;">All PID off.</span> | When mashout time strikes count, controller will prompt “Remove Malt”. Use the pump to transfer wort/water as described.  When it’s time to start heating of BK, press “OK”.(**The wort should at least cover heating element in BK.**) | PID removing malt is set to OFF. Elements are off. |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">Boil</span> | Manual PID (PWM) of BK | In boil mode, the heating power is full on until boil temperature reaches. | Set Boil heater to Secondary Heater(Heater 2) |
| 1. <span style="font-family: Calibri; font-size: 11.0pt; font-weight: normal; font-style: normal;">(Post Boil)</span> |  | Use heating element in BK if required. |  |

</div></div></div></div>I am not going to say that BrewManiacEx ***supports*** 3-kettle system, but it seems applicable.  
Adding one more relay control for the pump is not difficult, but it complicated the user interface. Moreover, the user still need to manually control it because there is no sensor to detect the level of water/wort. I don’t see the advantages over mechanical button, except wireless control( which I really don’t recommend).  
Any opinions?