---
id: 456
title: 'Hardware Woe'
date: '2016-08-17T22:22:39+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=456'
categories:
    - BrewManiac
---

I have been looking for a 5V ready ESP8266 board, so following Luiz Gabrie’s link, I bought this board. I was happy to find that it has 4M bytes flash.  
   
![5Vesp8266](http://vito.tw/wp-content/uploads/2016/08/5Vesp8266.jpg)  
It might be its level shifting circuit, I can’t flash it under Arduino IDE, via a USB-Serial adapter of course, but I made it by directly invoking the esptool.py. However, I soon found that the receiving of this module seems to have some problems. It didn’t receive data from the Arduino. Neither with my working horse, nor my test platform. It’s strange because it can be flashed so it should has a working serial. I then tried the baud rate of fishing, 115200. It did work with my test platform but still failed with my working platform.  
I am tired of it, totally. I decide to kiss goodbye Arduino, like what I have already done with BrewPi.  
![BrewManiacAtESP8266](http://vito.tw/wp-content/uploads/2016/08/BrewManiacAtESP8266.jpg)