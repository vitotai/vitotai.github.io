---
id: 330
title: 'BrewManiac 0.01alpha released'
date: '2015-11-25T04:10:05+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=330'
categories:
    - BrewManiac
---

WARNING, use at your risk.  
Please regard this as a preview release.  
After using a MEGA platform and being able to use the serial as a debug tool, I found that SoftwareSerial receives wrong data frequently. Since I didn’t expect such high error rate, I didn’t design to handle it. The next release will address this issue.  
iPhone APP  
https://itunes.apple.com/us/app/brewmaniac/id1030609251  
Arduino Sketch:  
https://github.com/vitotai/BrewManiac  
Known issues:  
– The data transmission error rate is too high that loading setting from Arduino frequently fails. (I’ve modified the code to for better efficiency. The APP, however, need some time to pass Apple’s review)  
– I cannot change BAUD rate by issuing AT+BAUD command.  
Mysterious phenomena of HM10 behavior. To make the AT+BAUD\*, like AT+BAUD2 for 38400, effective, the power of HM10 must be disconnected for a while, like 10 seconds.  
\[Update: the baud rate of HM10 will change after next power cycle. Reset or restart won’t do the magic, but totally disconnecting power will do.\]