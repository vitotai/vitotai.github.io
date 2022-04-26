---
id: 665
title: 'Information of BrewPiLess v1.2.6 and V2.0'
date: '2017-03-09T04:55:43+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=665'
permalink: /2017/03/665
categories:
    - BrewPi@ESP8266
---

I used to think that BrewPi already has everything for fermentation temperature control and there isn’t much to be done. It had been true before release v1.2.5, in which the basic functions of BrewPi are implemented.  
Well, there are always fresh ideas, and now I am working on gravity related features. Two main related feature are

- gravity recording/logging 
    - manual input
    - updated by other device, iSpindle.
- gravity-based temperature schedule

The logging function is trivial but the gravity-based schedule is not. In my opinion, the way to specify beer profile in BrewPi is a good design, but I couldn’t figure out a way to extend it. Therefore, a new way to specify the schedule is created, and I would like to put it in version 2.0 because I regard it as a break through. The gravity logging will be available in version 1.2.6 with original time only beer profile.  
BTW#1.  
My current design of new beer profile:  
![bplv2](/wp-content/uploads/2017/03/bplv2.jpg)

- “days” specify the duration of the step. It’s different from “Day” in original beer profile
- The condition to finish a rest step can be 
    - longer than a specified **time**
    - less than a specified **gravity**
    - both conditions meet (time AND gravity)
    - either one meets (time OR gravity)
- A “ramp” step is necessary in the transition of two rest steps. 
    - this design allow specifying the speed of temperature change
- For steps that use gravity as condition, the “days” field is still necessary 
    - to draw the chart
    - under certain conditions, it can be used to derive current steps.
- Changing the profile while beer profile is running will have undetermined result when gravity is involved.

BTW#2,  
The logging with manual input is available in “preview” branch. The input of iSpindle hasn’t been implemented yet. Currently, only manual input of gravity is available.  
https://github.com/vitotai/BrewPiLess/tree/preview  
An issue I would like to highlight is that the gravity values are more concrete than temperature especially when it is manually input. In my option, a line between two gravity values is meaningless, but it helps to track the values. It would be very difficult to find the points of gravity values without connected them by a line.