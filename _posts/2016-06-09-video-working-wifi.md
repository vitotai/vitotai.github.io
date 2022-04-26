---
id: 371
title: 'Video of working WiFi'
date: '2016-06-09T20:01:34+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=371'
permalink: /2016/06/371
categories:
    - BrewManiac
---

<div class="jetpack-video-wrapper"><iframe allowfullscreen="" frameborder="0" height="473" loading="lazy" src="https://www.youtube.com/embed/RDVYDUay660?feature=oembed" width="840"></iframe></div>   
I am going to try it on tomorrow’s brew. Wish me good luck!  
![螢幕快照 2016-06-11 上午12.16.58](http://vito.tw/wp-content/uploads/2016/06/螢幕快照-2016-06-11-上午12.16.58.jpg)  
OK, The test run well before boiling. However, EMI attacked and the LCD blinked with random patterns. ESP8266 has nothing to do with EMI because I had it before using ESP8266. I should have fixed this before. In fact, I couldn’t see the LCD in the middle of MASHING, but the ESP8266 worked fine and I could check the status on my iPhone. After Mash-out, I quit the automation, power recycle the system, and resumed the brew. Everything was fine until boiling point was almost reached. The connection between Arduino and ESP8266 lost. I still could connect to ESP8266 by my iPhone, but it was not able to connect to Arduino. After the brew finished, everything went bak to work normally.  
I am not sure if it is a hardware(bad connection) or software issue. **ESP8266 requires peak 500mA power**. If the power supply is not enough ESP8266 would be very unstable. “Thanks” to my bad soldering skill and loose hardware connections, I had some experiences about it. ( I “fixed” it by place the boards at different places.) Further investigation is needed.  
To Robert,  
Basically, just connect the SERIALs, software or hardware. I have tried the following configurations successfully. You have to change the definition in the source code, of course. I think the divider method will also work.  
(The pictures of the boards are copied from other sites. If it infringes your right, please let me know.)  
![BME8266_swsw](http://vito.tw/wp-content/uploads/2016/06/BME8266_swsw.png) ![BME8266_swhw](http://vito.tw/wp-content/uploads/2016/06/BME8266_swhw-1.png)  
Picture sources:  
NodeMcu: https://github.com/nodemcu/nodemcu-devkit-v1.0  
Arduino:https://www.arduino.cc/en/Tutorial/EEPROMClear  
convert board: aliexpress