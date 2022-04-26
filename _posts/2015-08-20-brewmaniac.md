---
id: 320
title: BrewManiac
date: '2015-08-20T05:31:22+00:00'
author: Vito
excerpt: 'BrewManiac is a rewritten program which runs on the hardware for Open Ardbir. Running on Arduino, the functionality an behavior is almost the same as Open Ardbir.'
layout: post
guid: 'http://vito.tw/?p=320'
permalink: /2015/08/320
categories:
    - BrewManiac
---

<div>BrewManiac is a rewritten program which runs on the hardware for Open Ardbir. The functionality an behavior is almost the same as Open Ardbir. The reason to re-write from scratch is to support wireless communication. Currently, HM10, a BLE transceiver, is supported. I might consider supporting WIFI by ESP8266 in the future.</div><div>[Some technical Detail]</div><div>The real detail hides in the code. In a nutshell, Open Ardbir is like single-threaded while BrewManiac is event driven. The difference of program structures makes different behaviors between Open Ardbir and BrewManiac. For example, Open Ardbir seems to lock-up when buttons are pressed because the counting time will stop running. On BrewManiac, temperature and time will keep updating while the buttons are pressed. In addition, the timing of buzzer of Open Ardbir is precise while it is not very precise on BrewManiac. Open Ardbir stops to wait while BrewManiac notes the time an let buzzer code decide when to stop. Since no interrupt is used, the time cannot be guaranteed.</div><div>[/Some technical Detail]</div><div></div><div>The differences between Open ArdBir and BrewManiac are listed as below.</div>- The response time to button pressing. The response of BrewManiac is very quick. The program uses 150ms to filter fat fingers. The real time needed for BrewManiac to recognize button pressing will be a little more than 150ms. It is usually less than 250ms.
- Skip Rest. During Automatic Brewing, users can skip current rest and go to next rest. Users need to confirm the operation. Before confirmation is made, the count down will stop on Open Ardbir. The timer will keep counting on BrewManiac.
- Sound of Buzzer.
- Delay Start. When waiting for delay start, users cannot interrupt on Open Ardbir, except back to main menu. On BrewManiac, users can go to Mash-In directly or back to main menu. However, this function may not be available in final version for FLASH size issue.
- Cooling. BrewManiac shows time since entering cooling stage.
- Different representation. BrewManiac will display 5m to represent 5 minutes, while Open ArdBir uses 00:05:00 or 5’.
- Temperature Unit. BrewManiac uses only Celius only. Fahrenheit can be displayed, in price of non-integer numbers.
- Count down for manual mode. I see it in source code of 2.8.3. However, I was not able to make it work on my test platform. Therefore, I implement this functionality in the way I like. When “Enter” and “Start” buttons are pressed at the same time, the time display(00:00:00) will start to blink to indicate that it is under editing. Use Up/Down buttons to change the value, and press “Enter” and “Start” buttons at the same time again to end the edit of count down time. If the time ends with a non-zero value, count down mode is activated. When setting temperature is reached, the count down will start. When the time counts down to zero, BrewManiac starts counting up and exits count down mode. During counting down and before counting to zero, if setting temperature is changed to two degrees away from current temperature, the time for count-down will be reset to original setting value.
- Resume of interrupt in automatic brewing. Please see the following paragraphs.
- Recipe management. BrewManiac doesn’t support it. Please see the following paragraphs.
- Language. English only for now. However, all strings are collected in a file, so it is very easy to support other languages that uses alphabets of ASCII codes.
- LCD. 20×4 only. Although I had considered supporting 16×2 at the beginning, I find it is not a big deal to support 20×4 only.

<div></div><div>About resume interrupt of automatic brew.</div><div>I didn’t want to implement this function. However, considering the time of brewing is long enough, it is better to have resumption of automatic brew process, in case of power failure. If the brew process is interrupt in previous brew, BrewManiac will ask “Resume Process?” when entering automatic brew, while Open Ardbir will ask a step later. The resumption of automatic brew is available only if the interrupt happens during the time from mashing to end of boiling. If the interrupt happens before the malt is added or after end of boiling, BrewManiac will not ask for resumption.</div><div></div><div>About recipe management.</div><div>It seems to be a very good function. However, the small LCD makes it hard to use. Because of the limitation of display and input, the time to review or check a recipe should be the same as making one. Since BrewManiac supports wireless communication, which is the real reason I create it, I prefer doing it on smart phones.</div><div></div>