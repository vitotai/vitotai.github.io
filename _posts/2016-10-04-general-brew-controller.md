---
id: 512
title: 'General Brew Controller'
date: '2016-10-04T19:02:37+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=512'
categories:
    - BrewManiac
    - BrewPi@ESP8266
---

I had thought that ESP8266 might not be as stable as Arduino because it is more complex and performs a lot of networking related jobs. It turns out that ESP8266 is stable enough for my purpose, though lacking of documentation and immature libraries are still issues.  
I have bought some Arduino boards for BrewPi builds and BrewManiac. Now they are all replaced by ESP8266. I am happy about it. However, my setup isn’t solid enough:

- The buzzer is not loud enough
- The driving voltage and current of SSR might be out of specification.
- The LCD contrast is not good under 3V3
- The extra IO Expander board and DUPON lines look messy.

I have limited knowledge about circuits, but I tried my best by referencing other circuits to create this schema which can be used in both BrewManiac and BrewPiLess. It is simple by just using transistors to control actuators, PCF8574 for input via I2C, and 5V-3V3 level shift logic.  
![bc-5v-i2c-4](/wp-content/uploads/2016/10/BC-5V-I2c-4.png)  
The design goals:

- Input can be 4x keypad or rotary encoder module. 
    - BrewManiac: 4x membrane keypad, connecting GND,P0-P3
    - BrewPiLess: rotary encoder, connection 5V,GND, P0-P2
- Buzzer driven by 5V, controlled by a transistor.
- Direct connect to SSR and relay. 
    - BrewManiac:connect heater SSR to Act1. SSR or relay module to ACT2.
    - BrewPiLess: 2 way relay board or SSRs by your choices
- Act3 is optional.
- 5V power. As far as I know, power isn’t a easy topic. Therefore, I avoid regulator.
- 5V interface for I2C LCD.

SSR is good for AC devices, but the relay modules are very cheap and small, and it’s easier to find the whole module than to find the sole relay. It would be perfect if the same terminal can be used to connect both SSR and relay module, but I don’t how to do that by using the same terminal. Therefore, the PINs output is directly connected to the auxiliary header PINs.  
Any opinions are welcome.