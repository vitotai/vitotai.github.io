---
id: 1112
title: 'BrewPiLess v3.1/3.2'
date: '2018-10-10T09:16:19+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=1112'
categories:
    - BrewPi@ESP8266
---

v3.1

- Bug Fixed. Beer profile which uses gravity as conditions didn’t work in v3.0.
- Ditch WiFiManager, softAP is always on. 
    - To configure WiFi, go to config page.
- Plato supported.
- Spanish page supported. (Thanks to Fernando!)
- Tom’s frontend embedded, as an option

v3.2

- Revision of remote logging setting page. Resolving the “null” issue of ubidots.com and dedicated settings for 
    - ubidots.com
    - thingspeak.com
    - Brewfater

### Special note on Tom’s frontend:

Tom’s frontend is surely prettier. The reason I didn’t use it as default frontend is that it needs more space and can’t fit in current allocated program space. (Note: double space is needed for on-line update, program must not exceed 500k for 1M program space.) The framework 1.8.0 happens to include 2M program space linkage script so that we don’t have to create it.  
Please note that changing flash layout will result in lost of all data on the filesystem including BPL settings. Online updating firmware with different flash layout might have unpredictable result.  
If you are not sure or don’t care. Stick with classic ones. You can upload the pages to get the new pages.

### Localization

Thanks to Fernando, now there is a Spanish version of pages. The Spanish version is also embedded into standard option and new(Tom’s frontend) builds. You can build embedded Spanish version for other options by change options in platformio.ini. Like Tom’s frontend, you can update the pages by uploading html files.  
If you want to translate BPL into other language, check the wiki:  
https://github.com/vitotai/BrewPiLess/wiki/Localization-of-web-pages