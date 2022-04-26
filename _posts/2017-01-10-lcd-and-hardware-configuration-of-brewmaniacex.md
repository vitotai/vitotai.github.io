---
id: 592
title: 'LCD and Hardware Configuration of BrewManiacEx'
date: '2017-01-10T20:49:33+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=592'
permalink: /2017/01/592
categories:
    - BrewManiac
---

## Hardware configuration

There are three files you might need to check if you are not using default settings.

- config.h  
    Most software configuration is defined here. The most important one is the number of sensor supported.  
    **\#define MaximumNumberOfSensors 5**  
    For single sensor, set it to 1(one), or 2~5 for multiple sensors.  
    Changing other options is not recommended if you don’t what the options mean. Please also note that some of the options are used during development, and changing them might result in compile error.
- pins.h  
    All hardware related definition is in this file, including PINs and PCF8574 address.
- ui.h  
    LCD type definition. Please see following description. (I should’ve created a option in pins.h, but I did it in a rush manner.)

- - - - - -

## I2C LCD

Most of the cheap I2C LCDs available on eBay seem to be adapted by a PCF8574/PCF8574A. That is the type BrewManiacEx supports.

- Address of LCD  
    BrewManiacEx uses another PCF8574 for input, the address of LCD should be different from the PCF8574 for input. The address of input PCF8574 must be defined in pins.h, while the address of LCD is derived automatically by scanning the I2C to find the other LCD.  
    *The reason of this design is because the two PCF8574 is non-distigunishable, but we have control over the input one. The address of I2C LCD is usually not clear from eBay sellers.*
- Type of I2C LCD  
    There are multiple way to interfacing LCD by PCF8574. The most popular one that marked as “sainsmart” on eBay seems to be “YWROBOT”, which is the default setting. Other configuration and information can be find [here](https://bitbucket.org/fmalpartida/new-liquidcrystal/wiki/schematics#!configurable-i2c-address-modules). If your LCD doesn’t work, you might need to find out the type of your LCD adaption, and change the last parameter at line 30 to one of the following values:  
    HIGHNIB, LOWNIB, BUGNIB, POLLIN,RASP,BUGRASP,SYDZ,YWROBOT,MJKDZ  
    Thanks to *Robert Holmström* who pointed out this issue.  
    *I might switch to the [NewLiquidCrystal](https://bitbucket.org/fmalpartida/new-liquidcrystal/downloads) library, which seems to be more flexible. FYI, the reason I don’t use it is because you have to delete unused files because of the bad design of Arduino IDE.*

- - - - - -

## About Relay Module

I am not good at hardware but just want to share my experience with you. I have two 2-way relay modules which work fine with NodeMcu 3.3V logic. However 2 of my 3 1-way relay modules are inverted logic and don’t accept 3.3V as HIGH. All the relay modules are marked as 5V. I have no idea how to differentiate them. I would suggest please test them by connect the signal directly to 3V3, GND, and 5V before you use them.