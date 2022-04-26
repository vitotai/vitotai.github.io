---
id: 632
title: 'BrewPiLess Release 1.2.3'
date: '2017-02-16T20:06:11+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=632'
permalink: /2017/02/632
categories:
    - BrewPi@ESP8266
---

This release is to solve one issue.  
Under certain circumstances, the log chart will not shown.  
   
TL;DR  
The cause is that the reading from SPIFFS returns zero. I suspect it has something to do with resources for file handle of SPIFFS. According to an advice I googled, I kept file handle opened and reused it to read the log. The solution is to close re-open the file when reading fails.