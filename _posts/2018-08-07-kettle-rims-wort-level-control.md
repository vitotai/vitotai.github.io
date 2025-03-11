---
id: 1077
title: 'Kettle-RIMS wort level control'
date: '2018-08-07T02:18:53+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=1077'
categories:
    - BrewManiac
---

![](/wp-content/uploads/2018/08/kettle-rims-level.png)

## Preface

The operation of Kettle-RIMS is like a E-BIAB system with its “basket” outside of boil kettle. The advantages of Kettle-RIMS over BIAB are

- Less hot side aeration. The wort drains smoothly into BK without splashing.
- No need of lifting the hot heavy “bag/basket”. The “basket” is already lifted.

One issue, however, must be addressed: overflow of MLT. The wort is pumped from BK to MLT and then drains through grain bed, back to BK. It’s difficult, if not impossible, to get a matched flow rate. The flow rate through grain bed even changes as the status of mash changes. ***Overflow drain or* [AutoSparge by Blichmann](https://www.blichmannengineering.com/products/autosparge) are solutions for it**. BrewManiacEx adapts more software-y way by using a level sensor, or float ball, to detect potential overflow of HLT.

## Operation

To support level sensor, the option “EnableLevelSensor” must be set to true. There will be three additional settings in “Misc” category. They are

- **Enable LV Sen** (Enable Level Sensor) 
    - what it literally means. You might sometimes just don’t need the sensor.
- **LV Trig. ms** (Level sensor minimum triggering time) 
    - The minimum time for BrewManiacEx to recognize the condition of “full”. This setting prevents false alarm but introduces latency.
    - step by 50ms, range 50ms~ 1000ms(1 second)
- **Ext pump Rest** (Extended pump rest) 
    - The Rest state will be extended for a period of time after the “full” condition is cleared.
    - 2 ~ 90 seconds

When BrewManiacEx detects “full” signal, it waits for **LV Trig. ms** to recognize the “full” condition. If the signal is cleared before **LV Trig. ms**, nothing will happen. Otherwise, BrewManiacEx enters REST state and stops Pump as well as Heating. BrewManiacEx extends the REST state for **Ext pump Rest** time after the “full” signal is cleared.  
![](/wp-content/uploads/2018/08/levelsensor-for-k-rim.png)

## Hardware/Software Configuration

Of course, you must know your hardware setup and config the software accordingly.The sensor I will use is like [this one](https://www.amazon.com/uxcell-Aquarium-Stainless-Horizontal-Switch/dp/B00AQYXP0C/ref=sr_1_19?ie=UTF8&qid=1533602313&sr=8-19&keywords=water+level+sensor). (But, mine isn’t from Amazon.) *It “opens” when triggered and “closes” when not triggered*. The two signal lines are connected to GROUND and the signal PIN. The reading from the signal PIN should be 1/HIGH/NOT-GROUNDED when it is triggered.  
The signal PIN can be native ESP8266 pins or IO pins of PCF8574. The code is in pins.h has both configurations, but the correct setup depends on the real hardware.  
One thing to remember is that ***D3/D4/D15 must be HIGH/HIGH/LOW*** during booting.  
If one of these 3 PINs is chosen, the sensor might prevent ESP8266 to boot-up. A solution is to connect the sensor after booting up. However, it’s not a good idea.  
If the signal PIN is on PCF8574, the interrupt PIN to D3 must be disconnected. The interrupt PIN connection in BrewShield is for BrewPiLess only, it turns out to be a design flaw. It seems that PCF8574 initialized all PINS to HIGH at initial. If one of the PIN is GROUNDED at boot-up, PCF8574 regards it as a change and signal interrupt by pulling it to LOW. Pulling D3 to LOW prevents ESP8266 to boot-up. If for some reason, ESP8266 boots quicker than PCF8574, it might be fine, which is the case in my prototype setup.  
Enable the option:

> \[env:nodemcuv2-multisensor\]  
> platform = espressif8266  
> board = nodemcuv2  
> framework = arduino  
> build\_flags = -Wl,-Tesp8266.flash.4m.ld -DEnableMultiSensor  
> -DPUMP\_INVERTED\_LOGIC=true  
> -D**EnableLevelSensor=true**

Using D5 as the signal pin, a “**normal-close**” float sensor which closes when not triggered.  
line 56@pins.h

> \#if EnableLevelSensor  
> \#define LevelSensorOnIoExpander **false**  
> \#if LevelSensorOnIoExpander  
> \#define LevelSensorIOExpPin 32 //P5  
> \#else  
> \#define LevelSensorPin **NODEMCU\_PIN\_D5**  
> \#endif

line 213@pins.h

> bool isWaterLevelFull(void){  
> return digitalRead(LevelSensorPin) **!=** 0;  
> }

Using P5 of PCF8574 as the signal pin, a “**normal-close**” float sensor which closes when not triggered.  
line 56@pins.h

> \#if EnableLevelSensor  
> \#define LevelSensorOnIoExpander **true**  
> \#if LevelSensorOnIoExpander  
> \#define LevelSensorIOExpPin **32** //P5  
> \#else  
> \#define LevelSensorPin NODEMCU\_PIN\_D5  
> \#endif

line 207@pins.h

> bool isWaterLevelFull(void){  
> // \_portvalue is read for button every loop cycle  
> return (\_portvalue &amp; LevelSensorIOExpPin) **!=**0;  
> }