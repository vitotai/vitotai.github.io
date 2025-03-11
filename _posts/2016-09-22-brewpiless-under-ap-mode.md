---
id: 482
title: 'BrewPiLess under AP mode'
date: '2016-09-22T19:30:59+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=482'
categories:
    - BrewPi@ESP8266
---

BrewPiLess now can run in AP mode, **which enables it to run stand alone**. The newly modified WiFiManager has a new option, “Soft AP Mode”. **Soft AP mode will also be entered if the network setting is not configured in three minutes** (and previous connected network doesn’t exist, or there is no previously connected network.) This design is to enable recovery from power shortage or system reset. Without this feature, BrewPiLess will hang at the network setting state and won’t perform temperature management funcitons.  
For scheduled temperature management, aka **Beer Profile** mode, the “time” information is needed to manage the temperature, but NTP server will not be accessible without internet connection. Therefore, manual setup of “time” is necessary in this mode. In page of “Temperature Management”, aka /control.htm, **a SET TIME button will be shown when the time of ESP8266 is far away from the computer/phone**. Pressing that button will set the time of ESP8266 to the time of the computer/phone, or the browser to be exact.  
To enable automatic recovery from power shortage or system reset, the time informatoin is saved periodically and restored at boot-up if NTP is not accessible, which means the duration of power shortage is assumed to be zero. If the power shortage lasts too long, the shedule will not be on track. For example, if the power shortage lasts 8 hours, the schedule will be off for 8 hours since that 8 hours is missing for ESP8266. Without a RTC, this might be the best I can do.  
mDNS doesn’t work under AP mode. Therefore**, “brewpi.local” can not be used under AP mode, but “brewpi.org” will do the job**. In fact, all domain names except those in Apple’s Captive Portal checklists will do.  
Known issues:

1. Sometimes, under AP mode, the web server cannot be connected. I don’t have any idea about the reason. ESP8266 is not well documented, and we don’t have full access to the source code. I am guessing that it might because of timing issue.
2. Sometimes, on Apple platforms, the setup page can’t be closed because of the “done” button does not show, but the “cancel” button persists. This might be the same issue as previous one.