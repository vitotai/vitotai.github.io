---
id: 794
title: 'BrewPiLess for Glycol'
date: '2017-08-14T00:44:45+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=794'
categories:
    - BrewPi@ESP8266
---

BrewPi is derived from BrewPi v0.2.x, which is designed for fermentation chambers made by fridges. The latest BrewPi v0.4.x has evolved to be a general temperature control unit. The code is very different from v0.2.x, and porting v0.4.x might not be an easy job. Instead, I implemented two main features that might make glycol possible: fallback sensor and adjustable minimum time.  
In addition to using binary for glycol or building with “EnableGlycolSupport” defined, there are setups and settings that must be tweaked.

## Setup

- Don’t use Fridge Sensor. The “fallback” feature will use the reading from Beer Sensor as Fridge reading.
- (optional) Use second sensor as Room Sensor to monitor glycol temperature.
- Beer Constant or Beer Profile mode is preferred.

## Settings

- minimum times: including **minCoolTime**, **minCoolIdleTime**, **minHeatTime**, **minHeatIdleTime**,and **deadTime**  
    All except **deadTime** are self-explanatory. **deadTime** defines the minimum idle time between heating and cooling, and the waiting time at power-up. 10 seconds seems to be good for all of the values.
- **idleRangeH** &amp; **idleRangeL**  
    The values define the temperature range to stay in idle. That is, no action will be performed if the fridge temperature(from Beer Sensor) stays in this range. The default values are 1.0, so it will start cooling when the temperature reaches 21 degree if the set temperature is 20.
- **maxHeatTimeForEst** &amp; **maxCoolTimeForEst**  
    After cooling or heating, the algorithm expects the temperature to go lower or higher. Usually the temperature won’t go too far in glycol setup. Therefore, set a smaller value for these two, so that it won’t wait too long for detecting peaks.
- PID settings. **Kp**, **Ki**, **Kd** If all of them are set to zero, the FridgeSet will be equal to BeerSet.
- (optional) filter settings: fridgeFastFilt, fridgeSlowFilt, fridgeSlopeFilt, beerFastFilt, beerSlowFilt, beerSlopeFilt  
    Even the data is from the same sensor, the temperature readings of beer and fridge sometimes differ. It is because that they use different filters. The temperature of fridge is volatile, while the beer temperature changes slowly. If you want them to be strictly the same, the filter parameters should be set to same same.

# *After setting, you can use “c” (single lower case c) to read back the setting for verification.*

# My testing

This is my initial test by filling 6 gallons of water in my newly purchased Spike CF10 with coil.  
![glycol](/wp-content/uploads/2017/08/glycol.jpg)  
My test was conducted with a cooler with frozen PET bottles. The room temperature is the temperature of water in the cooler.  
I set all minimum times to 10 seconds, **idleRangeH** to 0.1. **maxCoolTimeForEst** to 30 seconds. PID parameters are left untouched. The result seems acceptable except that more PET bottles (or, a glycol chiller) are needed.