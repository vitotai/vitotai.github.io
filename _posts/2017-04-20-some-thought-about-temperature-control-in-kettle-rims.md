---
id: 684
title: 'Some thought about temperature control in Kettle-RIMS'
date: '2017-04-20T17:50:42+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=684'
permalink: /2017/04/684
categories:
    - BrewManiac
---

I know nothing about kettle-RIMS until **Abel Ribeiro** and  **mojonojo** mentioned about it.  
It was a coincidence that I saw people discussing this setup on HBT soon after that. After roughly surveying LODO(Low oxygen brewing), my interest about K-RIMS rises.  
Can BrewManiacEx support K-RIMS? Why not? If we move out the **malt pipe** of Grainfather, add a solid bottom and a drain, and then call the new malt pipe **MLT**. We are turning a Grainfather into a K-RIMS. BrewManiacEx works even better because we can use two temperature probes to monitor BK and MLT at the same time.  
IMO, the most advantage compared to E-BIAB is that K-RIMS avoids the splash during lifting malt pipe or the bag.(Saving a pulley system should be another one if you brew big batch.)  
The most disadvantage, except the lower efficiency of non-sparging nature, is the temperature difference between two kettles. The separation of two kettles will make the temperature difference bigger than [the Grainfather.](http://vito.tw/?p=649)  
I have been thinking about using the probe inside grain pipe (that would be MLT temperature for K-RIMS system) as the PID input during mashing on Grainfahter. However, I am concerning the temperature of wort at the bottle of the kettle( BK for K-RIMS). I am not sure how high it will rise when the temperature of mash rises slowly because of solid grain bed.  
A solution I come out is to limit the temperature of BK(or the reading of probe inside kettle) while using the temperature of MLT(or the probe inside the malt pipe) as PID input. The AUXiliary temperature will be limited by a maximum valve or a maximum difference to mashing temperature.  
How do you think?  
![kettle-rims](/wp-content/uploads/2017/04/kettle-rims.png)

# Update:

My concern about temperature difference issue was relived by a simple fact:  
***The enzyme exists in the LIQUID part, not the solid part.***   
It means that the temperature of the liquid is the temperate needs to be controlled. Sure, it is better to have consistent temperature, but if it is not possible, the temperature of liquid part is what we need to take care of.