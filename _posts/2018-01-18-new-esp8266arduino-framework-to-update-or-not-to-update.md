---
id: 895
title: 'New ESP8266/Arduino framework, to update or not to update?'
date: '2018-01-18T07:38:24+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=895'
categories:
    - BrewPi@ESP8266
---

The recently released ESP8266 framework has caused some issues. The first issue is compile errors of ESPAsyncTCP. To solve this error, you can simply force to use old version of the framework, by editing platformio.ini

<div>```
platform = espressif8266@~1.5
```

</div>I do migrate to latest ESPAsyncTCP/ESPAsyncWebServer with latest framework(1.6), but that is the real issue. The new framework is about 26.5k bigger than previous release 1.5, and the image built with 1.6 framework will make OTA impossible.  
The current flash layout of ESP8266 use 1M for program, or sketch. To support OTA, the sketch size must be smaller than half of the total program space. The image of default BPL is about 500k, so using latest 1.6 framework breaks the limit.  
The latest ESPAsyncTCP/ESPAsyncWebServer libraries work pretty with latest 1.6 framework but seem to have some issues with 1.5 framework. The README.MD of ESPAsyncWebServer states that latest framework might be necessary, and I encountered some no-response issue when using latest libraries with old 1.5 framework.  
(BTW, one extra advantage of latest libraries with latest framework is that WebSocket is pretty solid, compared to the result I had a few months ago. My other Project, BrewManiacEx does benefit from WebSocket because of the short latency of uplink data transmission. BrewPiLess, on the other hand, does not gain much from that.)  
Staying with old 1.5 framework is a simple solution but I am not sure if it is a good idea.  
To upgrade to latest 1.6 framework, something will have to be removed. It’s unlikely that I can squeeze 25k or even 10k program space for it. A few solutions I come up:

- Remove OTA update support  
    It’s unlikely that I would do this. Opening project boxes to flash it is PITA.
- Remove embedded files.  
    Manually uploading the HTML file will be necessary.
- Expanding the sketch space to 1.5M or 2M.  
    IMO, this might be the best solution. 2M file space is good for 5~6 months. The drawbacks will be 
    - Editing of flash configuration file needed. 2M file system is not built-in standard configuration while 1M file system is. However, 3M for sketch is a waste.
    - Upgrading to latest version might require formatting of SPIFFS.

Reference:

- [How to add 4M2M layout in PlatformIO](https://github.com/vitotai/BrewPiLess/wiki/2M-sketch-Space)
- [How OTA works](https://arduino-esp8266.readthedocs.io/en/latest/ota_updates/readme.html)
- [Flash Layout of ESP8266](https://arduino-esp8266.readthedocs.io/en/latest/filesystem.html#flash-layout)
- [PlatformIO Flash layout configuration](http://docs.platformio.org/en/latest/platforms/espressif8266.html#custom-flash-size)
- [4M2M configuration](http://www.esp8266.com/viewtopic.php?f=32&t=14639)