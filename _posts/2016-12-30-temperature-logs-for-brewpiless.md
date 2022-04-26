---
id: 582
title: 'Temperature Logs for BrewPiLess'
date: '2016-12-30T04:40:07+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=582'
permalink: /2016/12/582
categories:
    - BrewPi@ESP8266
---

BrewPiLess now supports data log LOCALLY. Given the fact that there is 3M space of 4M flash on NodeMcu or WEMOS D1 min, it seems to be a waste not to use the space, not to mention that WEMOS D1 pro has 16M flash.  
![brewpiless-new](/wp-content/uploads/2016/12/brewpiless.new_.jpg)  
Some fact about the log:

- The log won’t start automatically. You have to start it at log setting page.
- The temperatures are logged every minute.
- A 30 day log will take around 350k bytes. That might imply that 3M space can record around 6 month data. However, there is no guarantee of the robustness of SPIFFS.
- Changing temperature when logging will result in wrong data interpret.
- Maximum 10 logs. The logs will not be deleted automatically. Manual deleting is necessary.
- Internet access is required to view the chart. To save some more space and to alleviate the loading of ESP8266, the library is not put in the ESP8266.
- Off-line viewer is available.