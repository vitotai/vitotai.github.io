---
id: 649
title: 'Mashing temperature, PID tuning, and wort circulation.'
date: '2017-02-22T03:05:50+00:00'
author: Vito
excerpt: 'This is about my recently finding and though about mashing temperature measure and control in circulated E-BIAB.'
layout: post
guid: 'http://vito.tw/?p=649'
permalink: /2017/02/649
categories:
    - BrewManiac
---

This is about my recently finding and thought about mashing temperature measure and control in recirculated E-BIAB.  
Here is two typical designs of recirculated E-BIAB kettles. The main difference between them is the direction of wort circulation.  
A. Top-down, eg. Grainfather.  
![kettle_topdown](/wp-content/uploads/2017/02/kettle_topdown.jpg)  
B. Bottom-up. eg. Braumeister  
![kettle_bottomup](/wp-content/uploads/2017/02/kettle_bottomup.jpg)  
I don’t have any experience with Braumeister or the like. My issues are about the design of Grainfather. My conclusion is that Braumeister might have a better design, and if you are going to build your own brew kettle, go with design B, the bottom-up method.  
The issue wasn’t clear to me until I drew the picture: the design of Grainfather creates 3 zones of wort/mash.  
When the wort drains down, a compact grain bed will be formed, which results in slow draining from middle part to the bottom. If the mash is mixed well when doughing in and the heat didn’t lose too much, it might be fine. However, it is a different story when multiple rest steps are needed because  
the main sensor and the heater are at the bottom and the flow from middle part to bottom part is slow. The result is slow temperature ramp of the mash in the middle.  
Conducting thin mash or add rice husks can speed up the wort draining but result in fast sparge.  
The temperature of top portion can be risen quickly if the flow of wort is quick and drains through the overflow pipe.  
I have been wondering why the PID parameters tuned with 2 gallon water worked “better” than that with 4.5 gallon water. Now it’s all clear to me: the PID was effectively controlling sound 2 gallon of wort.  
Here are some charts. FYI.  
I forget to switch the heater to “mash” position. The PID was tuned with 4(or 4.5) gallons of water.  
![whole](/wp-content/uploads/2017/02/whole.jpg)  
The heater was switched to “mash” position. The PID was tuned with 4 gallons of water (same as above.)  
![mash-2](/wp-content/uploads/2017/02/mash-2.jpg)  
The PID parameters were derived from tuning with 2 gallons of water.  
![gfbrew](/wp-content/uploads/2016/12/gfbrew.jpg)