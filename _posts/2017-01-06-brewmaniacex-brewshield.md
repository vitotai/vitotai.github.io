---
id: 576
title: 'BrewManiacEx BrewShield'
date: '2017-01-06T04:15:10+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=576'
categories:
    - BrewManiac
---

![bmshield](/wp-content/uploads/2016/12/bmshield-1.png)  
Connections:

- 1~3, ACT1, ACT2,ACT3  
    connect to **5V** driven SSR or Relay. for pump, heater, and sparge Heater control. If “Relay Modules” are used, use port “***9. ACT Signal***“.
- 4. Buzzer  
    5V driven buzzer.
- 5. Sensor  
    DS18B120 sensor. Connect 3V3 to power(vcc) of sensors.
- 6.Power  
    5V power supply. 1.5A+ is recommended.
- 7. I2C LCD  
    I2C bus connection for LCD. The power is +5V.
- 8. Input  
    For keypad or buttons. P0 for Down, P1 for Up, P2 for Enter, and P3 for Start. Pushing the keypad or buttons cause the PIN to GROUNDED.
- 9. ACT Signal  
    The direct control signals of pump, heater, and sparge heater. 3V signal. They control the same ACT1~ACT3 output and are used to connect to relay modules.
- 10. WEMOS D1  
    The two 8pin headers are for WEMOS D1 mini or pro. Antenna Up, USB down.

![bm_sample](/wp-content/uploads/2017/01/bm_sample.jpg)  
Size:

- 52mm x 52mm

Price:

- $15.00 USD
- $5.00 USD shipping within USA.

Note: I wanted to run BrewPiLess on this board also. However, it turns out the rotary encoder doesn’t work smoothly without capacitors. Therefore, I don’t recommend to use it for BrewPiLess.  
Please leave the message if you want to buy. I will send you PayPal invoice.  
