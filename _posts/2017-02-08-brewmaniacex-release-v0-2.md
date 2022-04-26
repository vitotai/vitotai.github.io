---
id: 608
title: 'BrewManiacEx Release v0.2'
date: '2017-02-08T20:32:53+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=608'
permalink: /2017/02/608
categories:
    - BrewManiac
---

New features

- Recipes management 
    - Import BeerXML
    - View and brew recipes

Bugs fixed:

- No logging if the automatic process is interrupted and power-off or entering manual mode before resumption.
- Wrong hop schedule of automation editing

Changes

- Add a minimum limit of time(500ms) for sensor reading. Without this limitation, the system will be busy trying to get temperature readings when the sensors are not correctly connected and response with error.

- - - - - -

## About Recipes

The recipes are created by import of BeerXML. The imported BeerXML should have the following information so that it can be used and translated as automation settings:

- Boil time
- Mash profile

The following fields are also referenced if available

- Hop and other additions schedules 
    - The information will be translated into time of “Hop#1”, “Hop #2”, etc.
- Water amount of first mash step 
    - If the mash-in temperature is set to “calculated”, this field is used in the formula to derive mash-in temperature.

Other fields are display only.

- - - - - -

## Recipe Options

![recipe-option](/wp-content/uploads/2017/02/recipe-option.jpg)

- The unit setting is for displaying the recipe only.
- Mash-in temperature will be inserted automatically based on the settings. The formula to calculate mash-in temperature is based on [Palmer’s formula](http://howtobrew.com/book/section-3/the-methods-of-mashing/calculations-for-boiling-water-additions).  
    Temp = R \* \[Grain weight\] / \[Water amount\] \* ( \[First rest temp\] – \[Grain temp\] ) + \[First rest temp\] + \[Equipment Adjustment\]  
    R: is the heat capacity coefficient of grain.  
    General speaking, the “Equipment Adjust” should be a minus value because the kettle is at the “mash-in” temperature when dough-in.
- Mash-out is necessary for BrewManiacEx. If the last mash step in the BeerXML recipe is in the mash-out range( &gt;75C), it will be regarded as Mashout step. Otherwise,”Default Mash Out” will be inserted automatically.

## Import BeerXML

![recipe-import](/wp-content/uploads/2017/02/recipe-import-1.jpg)

- A BeerXML file might contains more than one recipes. Therefore, you might need to select desired recipe.
- The recipe can be “Save” and “Brew” only if it has at least Boil Time and Mash Profile.
- The saved name can’t contains special characters and space. The maximum length is 28.
- Using the same recipe name as existing saved recipe will overwrite the existing saved recipe.
- You can “brew” it without “saving” it. Press “Brew” button will set the automation settings.
- The “Mash-In” temperature is derived from the settings at the time it is shown. So does the “Mash-out” step if it is missed in the BeerXML imported. **The original BeerXML is saved**, and you can have different Mash-In and Mash-out(if not present in the BeerXML) if you change the options before “viewing” a recipe.

## Saved Recipes

![recipe-view](/wp-content/uploads/2017/02/recipe-view-1.jpg)

- You can “delete” and “brew” the saved recipes.
- You can change the options to get different Mash-In temperature just before “brew” it.