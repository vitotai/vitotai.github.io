---
id: 629
title: 'Mash-in/Dough-in temperature'
date: '2017-02-17T22:35:39+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=629'
permalink: /2017/02/629
categories:
    - BrewManiac
---

The following change will be available on next release

- Kettle(equipement) thermal mass for more precise calculation
- A setting to specify if temperature control(PID) is applied during doughing-in, which is the time you put malt into kettle. **The calculated Mash-In temperature will not work as expected in current release.**

TL;DR part 1:  
The calculation of strike water temperature is easy if we simplify the model.  
Grain at **Tg**, water at **Tw**, and target temperature is **Tm**.  
The mash, mix of grain and water, will be at final temperature **Tm**.  
The heat absorbed by grain is (**Tm** – **Tg**)\* **\[Grain weight\]** \* **\[grain heat capacity\]**.  
The heat loss of water is (**Tw** – **Tm**) \* **\[water amount\]**.  
Assuming no heat is lost, in a simplified world, the heat is perfectly transferred from water to grain. Make a equation of these two terms will derive the formula that is the same as Palmer’s.  
But, Wait, there are other objects in the “system”: the kettle. Because the kettle is heated with water, it is the heat-loss side. The relative idea formula should be added a term like grain: (**Tw** – **Tm**) \* **\[kettle thermal mass\]**. This term can be simplified as “**equipment adjustment**“. Using **\[kettle thermal mass\]** should be more precise.  
If you know the value of **\[kettle thermal mass\]** in your system, or you know how to get it. That would be a better option.  
TL;DR part 2:  
I used to use the first rest temperature as Mash-In temperature because I thought that the temperature should recover in a short time. Of course, the more precise the better. Using a calculated temperature to get exact the first rest temperature might be desired. There is a problem here: should we ***control*** the temperature during doughing-in? In original Open ArdBir, there’s a setting for it, which is the **PID Pipe**(Active or Passive). I thought it was unnecessary and just implemented it as active. That is, PID is applied during doughing-in. If the Mash-In temperature is the same as first rest temperature, it is fine. However, if the Mash-In temperature is calculated by the formula which assumes a CLOSED system, then the equation is broken and the result might not be as expected. It might be fine if the setting temperature is the same as the first rest. In this case, PID algorithm won’t turned the heating element if the temperature is greater than setting temperature. **However, in current release, the setting temperature during doughing-in is the Mash-In temperature. Therefore, the calculated Mash-In temperature will not work as expected.** This will be fixed as well.