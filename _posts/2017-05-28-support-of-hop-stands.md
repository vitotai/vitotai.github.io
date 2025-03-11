---
id: 697
title: 'Support of Hop Stands'
date: '2017-05-28T19:30:06+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=697'
categories:
    - BrewManiac
---

[Hop stands](https://byo.com/mead/item/2808-hop-stands) or Post-Boil Hops Additions is gaining popularity along with NEIPA. It should be convenient to have a controller that can help counting time and maintaining the temperature when necessary.  
![PostBoilHopping-pid](/wp-content/uploads/2017/05/PostBoilHopping-pid.png)  
The illustration shows three hop additions in two temperature sessions. Let T1=85C, T2=60C, D1=30min, D2=20min, D3=30C for better illustration.  
After boiling finishes, the controller prompts for wort chilling to 85C(T1). When 85CT1 is reached, it alarms and starts the PID to control the wort at 85C(T1). After 10 minutes, the controller alarms for the addition of Hop2, and prompts for chilling after 20 minutes more.  
That is a perfect way to use hop stand, and it makes it possible to calculate a more precise IBU. However, cooling wort takes time and water. Heating the to-be-cooled wort does not seems right, and the “precise” IBU is not really precise. It might make no difference between 88C and 85C. Using a range of temperature instead of a exact temperate might save time, water, and energy.  
![PostBoilHopping_range](/wp-content/uploads/2017/05/PostBoilHopping_range.png)  
This illustration shows a more common and easy way to use hop stands. Hop1 is added when T1(90) is reached, the wort is not temperature controlled unless necessary(the lower line under T1). If the lower bound is set to 80C, the heating might never be activated if you brew indoors.  
It is a little more complicated to specify a range instead of a temperature, but it provides the flexibility. By specifying the same **start** and **keep** temperature, it will be exact the first scenario.  
![BrewManiacEx-hopstand](/wp-content/uploads/2017/05/BrewManiacEx-hopstand.jpg)  
Please share your opinions.