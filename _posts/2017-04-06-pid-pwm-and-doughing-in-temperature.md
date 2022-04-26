---
id: 677
title: 'PID, PWM, and Doughing-In temperature'
date: '2017-04-06T02:48:45+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=677'
permalink: /2017/04/677
categories:
    - BrewManiac
---

This is to clarify the time when PID or PWM is applied.  
   
There are a few settings involved:

- PID Start  
    It specify when PID is applied. Before PID is applied, the heat is fully output.
- PID Active/Passive  
    If PID is applied during Doughing-In(Malt In), which is the duration you put the malt into the kettle.
- Boiling Temperature  
    PWM is applied after the temperature is higher than BOIL temperature and Setting Temperature. ( Yes, during boiling stage, there is a changeable setting temperature.)

One thing worths discussing is “Mash-In” temperature and the temperature during “Doughing-In”.  
![PIDandPWM](/wp-content/uploads/2017/04/PIDandPWM-1.png)  
The picture above showing the condition that “**Mash-in**” temperature is used as “**striking temperature**‘, which is set a little bit **higher** than the first rest temperature. Because the temperature of grain is usually lower, mixing the grain with water at higher temperature will get the mash at a lower temperature, right on the first rest rest temperature.  
Some people use “**Mash-In**” temperature in other way, in which the Mash-In temperature is lower than the temperature of first rest. For example, mash-in at 45C, and then rise temperature to first rest, e.g. 55C.  
![PIDandPWM_2](/wp-content/uploads/2017/04/PIDandPWM_2.png)  
In normal condition, the temperature of mash after adding malt should be lower than the mash-in temperature.  
**If PID is used(PID Active), what temperature should it keep? Mash-in or Mash rest 1?**  
In the case of using Mash-in temperature as striking temperature, if the striking temperature is correctly and precisely calculated, the heating should be turned **off** during the time malt is added since the drop of temperature is already considered and expected. If PID should be used, the desired temperature should be Mash rest 1, which is the temperature we try to get.  
When a lower mash-in temperature is used, the desired mash temperature should be the mash-in temperature.  
*Prior to v0.2, the temperature during Doughing-in is PID controlled and the temperature is set to Mash-In temperature. After v0.2.1, the option to enable or disable PID was added and Mash rest 1 temperature is used if PID is enabled.*  
After above discussion, I am thinking to change the setting temperature to Mash-In temperature during doughing-in if PID is enabled. Then, for people who use higher mash-in temperature as striking temperature can set PID off to get desired first rest temperature. People who use lower mash-in temperature can set PID ON to get the mash-in temperature.  
Please share your opinions, if any.