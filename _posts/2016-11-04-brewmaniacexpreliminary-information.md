---
id: 527
title: 'BrewManiacEx Preliminary information'
date: '2016-11-04T05:56:35+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=527'
permalink: /2016/11/527
categories:
    - BrewManiac
---

BrewManiacEx is the integration of BME8266 and BrewManiac on ESP8266. All functions of BrewManiac are available for BrewManiacEx. There are a few extra new functions:

- PID Auto Tune
- Multiple sensors
- Sparge water heater control
- Temperature Chart

![screenshot](/wp-content/uploads/2016/11/screenshot.jpg)

- - - - - -

# PID Auto Tune

It is based on the implementation of[ PID AutoTune library](https://github.com/br3ttb/Arduino-PID-AutoTune-Library). I am not going to explain [how it works](http://brettbeauregard.com/blog/2012/01/arduino-pid-autotune-library/), but there are something you should know if you want to use it. The parameters are baed on how quickly and how far the temperature fluctuates, so that not only the **heating power**, the **mass of mash**, the **environment temperature**, and the **desired** **temperature** do mater. Therefore, to run the AutoTune, fill the volume of water as your usual brew, like 5-6 gallon for 5 gallon, put the kettle where you usually brew at, and set the temperature to the temperature you usually mash at.  
To run AutoTune, enter Manual Mode and set the desired temperature, like 150F/65.5C. When the temperature reaches, long press “heat” button.  
When the AutoTune process is finished, it will back to Manual Mode, and all parameters will be saved automatically. The quicker the temperature changes, the quicker the AutoTune finishes. If you run it at the same temperature of the environment temperature, you might never get it done.

- - - - - -

# Multiple Temperature Sensors

The web UI is redesigned to support multiple sensors. Maximum 5 sensors can be supported, and different sensors can be used in different stages, including Pre-Mash, Mashing, Boild, and Cooling.  
Only two temperature readings can be shown on the LCD screen, but all can be shown on the web page.  
Multiple sensor support is available in BrewManiac as a branch. However, that is not complete. I might merge part of the code into it later.

- - - - - -

# Sparge water heater control

Heating elements usually need large current. A 1500W of 120V heating element, while considered “weak”, will draw maximum 12.5A and running two of them will requires 25A. Inspired by ***Jelle Klinge***, the sparge water heating control is to solve this issue by running them exclusively by taking the advantage of the fact that the heating element is idle most of the time during mashing.  
The sparge water heating is enabled from Mash-In to Mashout if it is enabled. As a reminder, BrewManiacEx will prompt “Sparge Water Added?” when starting automation process. Answering NO result in disabling of sparge water heating control function in that brew. Since the sparge water is heated when the main heating element is OFF, the temperature might not reach desired temperature if the mash time is short and the heating element of sparge water heater is not powerful enough.  
The heating of sparge water can be temperate-controlled or not. If temperature control is not applied, the heating is ON when the main heating is OFF. The temperature should be controlled manually or by other mechanism. If multi-sensor is not enabled, temperature control for sparge water heating is not available.  
***If temperature control is enabled, the auxiliary temperature display during Mashing is always the sparge water temperature sensor.***

- - - - - -

**Temperature Chart**  
Powered by [Chart.js](http://www.chartjs.org), BrewManiacEx will displayed the temperature chart during Manual and Auto mode. The temperature chart is refreshed every minute. The data of auto mode is logged, saved, and can be download later. Maximum number of saved logs is 20. The oldest log will be deleted when new log is generated. The data under Manual Mode is not saved, and the temperature data is not logged after the record buffer is full, which should happen after 4 hour for single temperature sensor.  
*TL;DR*  
Time runs continuously, so does the temperature. The log, however, is and can only be discrete. Using shorter period results in bigger log file and more memory usage. Longer period results in a longer ‘lag’ of chart update. IMO, one minute is a good value. The temperature chart looks good for one minute period while the memory usage is limited. The change of temperature is usually slow so that the lag doesn’t mater.  
However, it is a different story for the progress annotation. For example, If the time when the temperature reaches the set point is at 5th second of the minute, it will be shown after 55 seconds. Let’s say the temperature at 30minute is 63.9 and it reached setting 64 at 30m:05s, the “temperature reach” annotation will be at 31minute time line. It’s totally OK when displaying a “history” log. When in a really brew, you will feel the “lag” because the annotation will be shown after 55 seconds.  
There are ways to ‘solve’ this issue, but I can’t think of a “clean” and simple way to do it. Two ways I’ve tried are to set the time to “previous” time, like 30m in the example, and to “draw” next time point,31m, when the event happens. The former one seems odd because the temperature at 30m has not reached the setting point, the later is also odd because the temperature of 31m is not yet available and the line ends at 30m. I am leaving this for further enhancement, or leave it as is.

- - - - - -

**Other Changes**

- Temperature Sensor resolution  
    There is a menu item under “PID-PWM” for configuration of sensor resolution. The readings of temperature will reflect the real resolution instead of .25 resolution in original Open ArdBir.
- Heating algorithm  
    The heater is full ON before the difference between current temperature and setting temperature is smaller than a configurable value, which is the menu item “PID Start” under “PID-PWM”. The value ranges from 1.0 to 3.5 Celius. PID is not applied in boiling stage: it will be full on before boiling point reaches and controlled by PWM after boiling point.
- Pump control  
    Sampling the pump control. No more sensor position selection.
- Network setting  
    Configurable host name for mDNS, username, and password. Access to system update and file management are protected by simple username/password authentication. Authenticated access to main page can be configured.
- Delay Start  
    There is an option under “Unit” menu to enable or disable Delay Start feature. Enabling Delay Start provides the chance of delay start when starting automation process. (I want this option because of not liking to be asked every time I start.)
- Brew calculators  
    It’s handy to have these during brew: Hydrometer temperature correction, Refractometer reading converter with correction(BRIX to gravity conversion with wort correction), and boil off/dilution calculator. A first wort SG estimation function is also provided.

- - - - - -

**Know Issues**

- No sensor setup menu for web pages.
- The change of network takes effect after reset. Only last change is effective if multiple changes are made. For example, if the hostname is changed, and username is changed later before the system restart, the change to hostname is voided.
- The web page will not reflect the changing of sensor settings automatically. Manual reload is necessary.
- The sensor resolution is read from the sensor, and the resolution setting goes directly to the sensor. That is, setting of sensor resolution must be run again for new sensors.
- In multi sensor configuration, the resolution display is get randomly from one of all sensors. Setting the resolution result in the same resolution of ALL sensors.
- The temperature chart is updated every minute. That means the chart is always ‘out of date’ for one minute before next update.
- <del>The temperature chart is ‘splined’. The values between two valid value points are not real values. They are interpolated to make the line smooth and could be wrong. </del>The lines are changed to straight lines. Uglier, but less misleading.

- - - - - -

**ToDos:**

- <del>Off-line log viewer. (well, copy-n-paste also takes time.)</del>