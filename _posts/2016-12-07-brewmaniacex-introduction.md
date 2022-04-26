---
id: 551
title: 'BrewManiacEx Release'
date: '2016-12-07T05:39:42+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=551'
permalink: /2016/12/551
categories:
    - BrewManiac
---

![bmex](/wp-content/uploads/2016/11/bmex.jpg)BrewManacEx is a brew controller based on ESP8266. It was started by mimicking famous Arduino-based Open ArdBir, so most of Open ArdBir functions are included.

- Manual and Automation brewing process control
- PID and PWM heat control
- Automatic PUMP control

The most important feature that BrewManiacEx differs from Open ArdBir is

- WiFi Enabled, Web-based interface  
    You can view, change the settings, monitor and control the brew on your phones, tablets, and computers.

Additionally,

- Multiple sensors support  
    Up to 5 sensors are supported. Different sensors can be used in different stages.
- PID autotune  
    Run the PID Autotune to get the best PID parameters for your system instead of guessing.
- Sparge water Heating control  
    Run the sparge water heating when the main heating element is idle during mashing to enable using only one 15A/20A GFCI socket.
- Temperature logging chart  
    Watching the temperature chart during brew and after brew

   
***Special Note about the IO Expander and LCD***  
Most 20×4 I2C LCDs are in fact interfaced by a PCF8574/PCF8574A. Therefore, there is two PCF8574/PCF8574A’s in the system on the same I2C bus. ***You have to make sure they have different addresses***. The default address of IO Expander is 0x38, and the address of LCD can be any other address. BrewManiacEx will try to find the address of LCD on startup. It just has to be different from the address of IO Expander, and the address of the IO expander must be correctly set.  
Screenshots:![bme_panel](/wp-content/uploads/2016/11/BME_Panel.jpg)  
![bme_logs](/wp-content/uploads/2016/11/BME_logs.jpg)  
Real Brew:  
![gfbrew](/wp-content/uploads/2016/12/gfbrew.jpg)  
   
[Draft user Manual](https://docs.google.com/document/d/17jKWFsdb8d9SgOVTxu0zbPKC1EYbN0RU0k3nS0YjjeI/pub)  
[Github](https://github.com/vitotai/BrewManiacEsp8266)