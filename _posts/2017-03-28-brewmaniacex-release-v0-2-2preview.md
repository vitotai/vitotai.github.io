---
id: 674
title: 'BrewManiacEx Release v0.2.2[preview]'
date: '2017-03-28T03:40:56+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=674'
categories:
    - BrewManiac
---

## New features

- Extended Mash Rest 
    - When **decoction** mashing is used or conversion doesn’t finished, it provides the option to extend the mash rest after the time runs out.
    - During the mashing rest, **long press STP(Enter)** will bring a new option “Extend”(Up). Press the button to toggle extended mash. A “+” symbol will appear at the first line of LCD, indicating extended mash. The other two options is “Skip”(Start) and “Back”(Enter). “Skip”(Start) is used to skip current rest step and goto next step, while pressing “Back”(Enter) will result in returning to current rest step.
    - When the time of the rest counts to zero, it will start to count **UP** if extended mash is enabled. During extended mashing, **STP(Enter)** can be used to finish current mash rest step.
- Paddle stirring instead of Pump recirculating (supported by compile option) 
    - change the **UsePaddleInsteadOfPump** to true at line 38 in ****config.h**** ```
        #<span class="pl-k">define</span> <span class="pl-en">UsePaddleInsteadOfPump</span> true
        ```
    - Differences from PUMP 
        - no “pump priming” at the start of automatic mode
        - The unit of Pump(stir) Rest/Pump(stir) cycle is **second** instead of minute
        - Heating control(PID) is **not** turned off during “Stir Rest”
        - ‘stir’ is used in place of ‘pump’ for button labels.

## Bug fixed

- Error updating automation/settings 
    - caused by misuse of ArduinoJSON library
- Error handling of Fahrenheit 
    - Now the data is saved in its own unit. The down side is that temperature related settings must be set after temperature unit is changed.

## Other changes

- In manual mode, “Pump”(Stir) rest can be enabled by long pressing of “Pump/Stir” button
- There will be no “–Pump Rest–” as button label when pump rests. During pump rest, the buttons are still accessible.

The release is temporarily available at [preview branch at GitHub](https://github.com/vitotai/BrewManiacEsp8266/tree/preview). It will be pushed to master branch after I use it in a real brew.