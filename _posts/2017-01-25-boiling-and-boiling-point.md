---
id: 602
title: 'Boiling and Boil Temperature Setting'
date: '2017-01-25T18:02:54+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=602'
categories:
    - BrewManiac
---

Boiling temperature is one important setting for boiling stage.  
First, **counting of boil time** starts when boiling temperature is reached.  
Second, the PWM control is available when temperature is higher than “**Boiling temperature**” AND “**Setting temperature**“. (Setting temperature is the temperature controlled by UP/DOWN during boiling.)  
If the temperature can’t reach boil temperature for some reasons, the timer will never start and the brew will never finish.  
The default boiling temperature is 100 degree Celius, which might be a problem for some people, like me.  
At my very first brew, the temperature stop at 99.75. I had to stop the brew and change boil temperature setting to 99. The is also one reason for pause function during boil stage, which pauses counting of time.  
Conclusion:

- **Set the Boil Temperature to 99 degree Celius or lower at your first brew.**  
    If the wort is not really boiling at 99 degree, you can just adjust the PWM to 100%, pause the timer, and resume the timer after it really boils. The default value of boil temperature will be changed to 99 on next release.
- **The design is arguable**. Checking only the setting temperature might just be fine.