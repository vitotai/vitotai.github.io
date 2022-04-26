---
id: 460
title: BrewPiLess
date: '2016-08-21T17:56:42+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=460'
permalink: /2016/08/460
categories:
    - BrewPi@ESP8266
---

# **Software Installation**

<div>**Arduino IDE is no longer used.** </div><div>**1.Install Arduino IDE 1.6.8 or above (I am using1.6.9)**</div><div><https://www.arduino.cc/en/main/software></div><div></div><div>**2.Install ESP8266/Arduino Board**</div><div>Open “Arduino/Preferences” menu, input the following link at “extra board manager link”</div><div>[http://arduino.esp8266.com/stable/package\_esp8266com\_index.json](http://arduino.esp8266.com/stable/package_esp8266com_index.json)</div><div><span style="color: #333333;font-family: Consolas">Under “Tool” menu, select “Manage Board” in board selection menu. search </span><span style="color: #333333;font-family: Consolas">esp8266, and install that board setup.</span></div><div>You should have NodeMcu1.0(ESP-12E module) option available under board selection menu. Select that, and choose 4M(3M SPIFFS) as Flash size.</div><div>Select the correct Serial port.</div><div>Reference：<https://github.com/esp8266/Arduino></div><div></div><div>**3.Install Library**</div><div> The following libraries are needed. Some of them can be found under “Sketch/Import library/Library Management”. The following links are for reference, please use the archives on GitHub.</div><div>- ArduinoJson <https://github.com/bblanchon/ArduinoJson>
- WiFiManager <del><https://github.com/tzapu/WiFiManager></del><del> </del> I created a brach for adding ad new “Soft AP” option: https://github.com/vitotai/WiFiManager
- ESPAsyncTCP <https://github.com/me-no-dev/ESPAsyncTCP>
- ESPAsyncWebServer <https://github.com/me-no-dev/ESPAsyncWebServer>
- ESP8266HTTPUpdateServer (newer version is needed. you might need to manually download the files.) <https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266HTTPUpdateServer>
- OneWire <https://github.com/PaulStoffregen/OneWire>

</div><div><div></div><div>***!! Please use the[ libraries on GitHub](https://github.com/vitotai/BrewPiLess/tree/master/libs). Some of them are modified, while some of them might be updated and incompatible to BrewPiLess.!!!***</div><div></div></div><div> **If you can’t find the library, you have to find the Arduino Library directory, which usually locates at \[User directory\]/Documents/Arduino/libraries/ on Mac.**</div><div></div><div></div><div></div><div>**4.Download <https://github.com/vitotai/BrewPiLess>** </div><div>Arduino IDE requires the source be in specific path, usually it is</div><div> **\[User directory\]/Documents/Arduino/BrewPiLess**</div><div></div><div>**5.\[Optional\]Upload data files to ESP8266**</div><div>If you plan to write some pages of Javascript/HTML yourself, you can do this. It’s better to turn on “DEVELOPMENT_FILEMANAGER” option in espconyfig.h to enable management of files from web interface.</div><div><https://github.com/esp8266/Arduino/blob/master/doc/filesystem.md></div><div></div><div><span style="font-size: x-large">**Hardware Setup(Reference)**</span></div><div>Requirement</div>1. NodeMcu 1.0 Board, ESP-12E or D1 mini is possible for those good at these things.
2. Two way Relay Board
3. Two DS18B20 sensors
4. 4.7K resistor.
5. \[Optional\] 20×4 I2C LCD
6. <del>\[Optional\] KY-040 Rotary Encoder module </del>**Don’t use it.**
7. Power supply to ESP8266. (I use a USB adapter)

<div>![brewpiless](http://vito.tw/wp-content/uploads/2016/08/BrewPiLess-1.png)</div><div></div><div>** If this photo contains your working and infringe your copyright, please notice me to remove it.</div><div>Check the following link for reference, where I got the DS18B20 pictures.</div><div>http://www.homebrewtalk.com/attachment.php?attachmentid=217946&amp;d=1408145422</div><div>***\*\* Note:You need a IO expender to use Rotary Encoder.***</div><div><span style="text-decoration: underline"><span style="color: #ff0000"> </span></span></div><div><span style="font-size: x-large">**Usage:**</span></div>1. On the first time use or when the network disappears, you have to setup the WiFi. ESP8266 will create a WiFi network named “brewpi”, Use your phone or computer to connect to that WiFi AP. There will be a WiFi setup page popping up. If your phone or computer doesn’t open the setup page automatically, open your browser(Chrome, or Safari), and try to browse to any site, like google.com.  
    Please reference the following link for network setup：https://github.com/tzapu/WiFiManager  
    **New: After three minutes, ESP8266 will enter AP mode.**
2. If you are lucky enough to use Apple’s products, you can use URL like “http://brwepi.local”. Otherwise, you have to figure out the IP address by looking up from your router. The main page is the LCD like:  
    ![lcd](http://vito.tw/wp-content/uploads/2016/08/lcd.jpg)
3. Touch or Click the LCD, a menu will pop up. Select **“Device Setup**” is to setup the sensors and actuators. When prompted for username and password, input “brewpi” for both. The interface mimics original BrewPi. You can find the the manual of BrewPi for your reference. Basically, you have to “Refresh Device List” to list sensors and PINs, select the setting and “Apply”.  
    ![device setup](http://vito.tw/wp-content/uploads/2016/08/device-setup.jpg)
4. “Temperature Management” is used to control the temperature. Select “Beer Const.”, “Fridge Const.”, or “Off”, input the temperature desired, and “Apply”. That’s it.  
    ![temperature control](http://vito.tw/wp-content/uploads/2016/08/temperature-control.jpg)  
    To use “Beer profile”, you have to edit and save the profile first. The interface mimics original BrewPi again. Please check BrewPi manual for detail instruction.  
    ***\*\*Internet connection is necessary for Beer Profile.\*\****
5. Temperature logging.  
    BrewPiLess can log data to clouds or other servers. The “Data Log” menu is for this. ESP8266 will invoke the specified URL with the temperature values at specified period. Because of limitation of resource, HTTPS is not supported. If you want to log data to GoogleSheet, you need to do it indirectly. Please check Github for detail instruction.  
    ![logsettting](http://vito.tw/wp-content/uploads/2016/08/logsettting.jpg)  
    I have tried “thingspeak.com”, which does not require https. You can put data to it direct from ESP8266.  
    ![thingspeak](http://vito.tw/wp-content/uploads/2016/08/thingspeak.jpg)  
    Here is the result of my testing:  
    <https://thingspeak.com/channels/139809>
6. “System Config” is used to setup the system related setting.  
    ![configuration](http://vito.tw/wp-content/uploads/2016/08/configuration.jpg)  
    Host/Network Name: The hostname for mDNS.  
    User Name &amp; Password：trivial. All pages except the LCD page require authorization.  
    Always need password：If this option is not set(checked), the access to the “main page”(LCD display) will not require authorization.