---
id: 351
title: 'Grainfather + BrewManiac'
date: '2016-02-05T03:17:56+00:00'
author: Vito
excerpt: 'The experience of using Arduino-based BrewManiac, a Open ArdBir "clone", with Grainfather.'
layout: post
guid: 'http://vito.tw/?p=351'
categories:
    - BrewManiac
---

[![grainfatherxbrewmaniac](http://vito.tw/wp-content/uploads/2016/02/grainfatherxbrewmaniac.jpg)](http://vito.tw/wp-content/uploads/2016/02/grainfatherxbrewmaniac.jpg)  
Finally, I brewed with my BrewManiac with Grainfather. Yes, it is not really finished, and I have not yet find a good control box. Nevertheless, it just worked.  
I used three steps mash, 50(C)-57-67, and got 88% pre-boil efficiency, which is very good.  
Here are some catches:

- There should be a way to control PUMP during boiling stage. The original Open ArdBir has a setting for PUMP ON/OFF during Boiling stage, but you can’t turn it on or off during Boiling. Using GrainFather, the pump is not necessary to be ON during boiling, but if the counterflow chiller is to be used, the pump should run for 5 minutes to sanitize the counterflow chiller. It’s very easy to add pump control during boiling because only UP and DOWN buttons are used in that stage. I’ve already modified the code on github to support PUMP control during boiling.
- PUMP REST. I had no idea of the reason to use PUMP REST, but I programmed it as what OPEN ARDBIR does. I set it to 5 minutes and found the temperature dropped a little during the REST period. Maybe I should set it to zero next time.
- The setting of boiling temperature. I set it to 100 Celius, however it was boiling at 99.75, which made it fail to reach “boiling” stage. I had to quit the process to adjust boiling temperature setting and resume the process.
- There was a bug of negative number display. patched, already.
- GrainFather is built to be modified. I believe.

\[Update:\] More fixes:

- Adding Pause function during boiling. The Pause function during boiling will pause TIMER only and keep the heating element working under PID control. It will be available after boil temperature reaches. It should be useful when too much wort is collected, and extended boiling time is desired. In that case, you can PAUSE the timer after boiling and resume the process after a period of time.
- Bug fixed. No sound alarm when boiling finishes.
- Bug fixed. Blinking time and repeating buzzing when return to Main Screen. \[Thanks to Andy.\]