---
id: 1054
title: 'BrewManiacEx v0.4 and v0.4.2'
date: '2018-08-04T13:07:20+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=1054'
categories:
    - BrewManiac
---

(late) v0.4 release note. (I was waiting for an response from EspAsyncTCP, but We must move on. So.)

- Updated framework(to 1.6) and EspAsyncTCP/EspAsyncWebServer libraries
- WebSocket replaced ServerSideEvent. (So now BrewManiacEx might work on IE and Edge)
- Continuously triggered button operation for Web interface. (thanks to WebSocket.)

v0.4.2 release note.

- AP only mode fixes 
    - After v4.2, soft AP is ALWAYS available and password protected. The network selection is now part of the “network” tab. WiFiManager is ditched. (But I steal the interface style from it.)
    - The default password is changed to “rdwhahb**!**“. The added “!” makes it 8 characters, which is minimum length for WiFi pass phrase.
- HopStand support for exported beerXML from BeerSmith and Brewersfriend.com 
    - Whirlpool hops are specified as “Aroma” hops in beerXML. Now the information will be used in automation.
    - Brewersfriend.com **does** specify temperature in beerXML while beerSmith **doesn’t**. Therefore, an option for default whirlpool hop temperature is added. If temperature is missing, the default value will be used.
- Settings survive through formatting file system 
    - The settings will be kept before formatting and restored after formatting automatically. (Recipes and logs aren’t.)
    - An option to “clean update” HTML/Javascript files. When the fragmentation of SPIFFS becomes higher, the access to file system will be slower. Formatting the SPIFFS is a solution for it. (The online firmware update still doesn’t work.)
- Low pass filtered applied to temperature sensor readings. 
    - To filter out some acutely changed, invalid values.
    - The reading will lag for a few seconds.
- (untested, unverified, not enabled by default) Level sensor(float ball) support for Kettle-RIMS 
    - Pin assignment must be done according to hardware setup.
    - The float sensor is installed at MLT. When the level of wort in MLT is too high, the sensor is triggered and pump and heating will be stop for a configurable period of time.

![](/wp-content/uploads/2018/08/wifi-1.jpg) 
![](/wp-content/uploads/2018/08/wifi-3.jpg)
![](/wp-content/uploads/2018/08/recipe-opt.jpg)  
![](/wp-content/uploads/2018/08/automation.jpg)