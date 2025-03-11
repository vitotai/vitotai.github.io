---
id: 720
title: 'BrewPiLess v2.1 available'
date: '2017-07-03T18:21:47+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=720'
categories:
    - BrewPi@ESP8266
---

*By using the word “available”, I mean that it is not well tested, and I don’t have enough confidence of it.*

## New Features

The major improvement of this version is about gravity stability and beer profile handling.

- More flexible, and complicated, beer profile. [Detail@Github](https://github.com/vitotai/BrewPiLess#saved-beer-profiles)
    - New stable gravity condition by checking the gravity differences between current reading and up-to 72 hours ago.
    - Specifying gravity condition by apparent attenuation(%), which makes it easier to reuse beer profile. OG must be provided.
- Fermentation progress indication 
    - It is just a simple indication that the gravity change within last few hours is less than the specified gravity stable threshold.
- Low pass filtered gravity reading 
    - To filter out wrong readings by bumping, a simple low pass filter is applied, and filtered data is used in beer profile algorithm. The filtered data is shown in this version. (check Github for more detail.)
- (LogViewer) Exporting data to CSV format

## Bug Fixes

- Wrong auxiliary temperature( temperature reading from iSpindel) display
- beer profile related bugs
- (Utility) iSpindel Calibration utility showing the same line for both polynomial.