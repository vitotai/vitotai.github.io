---
id: 361
title: 'BrewManiac goes online with ESP8266'
date: '2016-05-07T07:09:53+00:00'
author: Vito
excerpt: 'Combining Arduino, ESP8266 together with HTML5/Javascript. The BrewManiac can be accessed on any browser that supports HTML5.'
layout: post
guid: 'http://vito.tw/?p=361'
categories:
    - BrewManiac
---

<div>I finally make it to the first development milestone of WiFi-enabled BrewManiac.</div><div>Being excited, I want to share with those who watch BrewManiac by providing my plan of WiFi features.</div><div></div><div>***Features***</div>- Web-based interface, including setting, automation editing, and status monitoring. Check the following pictures to get some feeling.
- ESP8266 firmware OTA update. Web-based.
- Captive portal for wifi configuration, which includes network selection and password setting. (Maybe in case there isn’t a router, the ESP8266 can serve as an AP.)
- Zeroconf. The IP information will be shown on LCD, but it is more convenient to connect by just “http://brewmaniac.local”. Currently mDNS(for Apple) is working smoothly, and the library supports DNS-SD(Android). I will try to make SSDP( Windows) work.

<div>***Future development,*** which means it won’t happen soon or be available at the first release</div>- Recipe(mash schedule and boil/hop time) editing and saving.
- UI enhancement ( don’t hold your breath. I am not good at this.
- Browser notification. ( I haven’t study them yet.)

<div>***Hardware***</div>- ESP8266-based boards. ESP-12E is recommended. I use a NodeMcu, which is ESP-12E with breakout board and a USB port connected to UART0.
- The connection between Arduino and ESP8266 is basically UART or Serial. Currently I use SoftwareSerial on both platforms with 38400 baud rate. However, hardware UART is highly recommended.
- Please note that a converter board or voltage divider circuit is necessary because the signal of ESP8266 is 3.3V while Arduino is 5V.

<div>***Technical Software Detail*** </div>- The Arduino code has not been changed too much. Basically, the code for WiFI is a revised version of Bluetooth one. Instead of text, I change to binary for lower data rate and more information carried.
- The ESP8266 code is baed on ESP8266-Arduino. https://github.com/esp8266/Arduino

There are still a lot of jobs to be done and bugs to be fixed. However, I am glad to prove that the architecture works.  
The current display is designed for screens of phones, it doesn’t look good on computers. It’s not a big deal. right?  
[![螢幕快照 2016-05-06 下午10.31.46](http://vito.tw/wp-content/uploads/2016/05/螢幕快照-2016-05-06-下午10.31.46.jpg)](http://vito.tw/wp-content/uploads/2016/05/螢幕快照-2016-05-06-下午10.31.46.jpg) ![螢幕快照 2016-05-06 下午10.32.05](http://vito.tw/wp-content/uploads/2016/05/螢幕快照-2016-05-06-下午10.32.05.jpg) ![螢幕快照 2016-05-06 下午10.32.37](http://vito.tw/wp-content/uploads/2016/05/螢幕快照-2016-05-06-下午10.32.37.jpg) ![螢幕快照 2016-05-06 下午11.38.15](http://vito.tw/wp-content/uploads/2016/05/螢幕快照-2016-05-06-下午11.38.15.jpg)