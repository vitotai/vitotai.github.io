---
id: 407
title: 'Simplified Mash Step'
date: '2016-08-01T00:05:27+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=407'
permalink: /2016/08/407
categories:
    - BrewManiac
---

   
I created a new branch for BrewManiac &amp; BMESP8266. The main difference of these branches is the simplified mash steps. The original mash steps has a name, and you can skip all except that last rest, bAmylase2.  
The new branch simplifies the mash steps. There are no names for the rests, but only labeled with number. The editing of mash rests on Arduino(BrewManiac) changes:  
1.You cannot skip the first Mash Step, because at least one mash step is needed.  
2.First step of editing a rest is entering the temperate. In original BrewManiac, you can SKIP the first rest. Now you can’t.  
3.In second step of editing rest time, the buttons are “Up Down Done More” instead of original “Up Down — OK”. Both “Done”(start) and “More”(Enter) will finish current rest editing, but “More” means you need more rest while done means that this is the last rest.  
4\. Maximum 6 rests are supported. Exactly the same number of original named rest.  
No changes were made to Mash-in and Mash-out.  
If you want to do singe rest as most brewers normally do, you just

1. enter mash (1) temperature, and “OK”
2. enter mash (1) time, and “**Done**“.

compared to original named rest, you have to

1. skip Phytase
2. skip Glucanase
3. skip Protease
4. skip bAmylase
5. skip aAmylase1
6. enter temperature of aAmylase2
7. enter time of aAmylase2.

3-step rest is common, too. The procedure will be

1. enter mash (1) temperature, and “OK”
2. enter mash (1) time, and “**More**“
3. enter mash (2) temperature, and “OK”
4. enter mash (2) time, and “**More**“
5. enter mash (3) temperature, and “OK”
6. enter mash (3) time, and “**Done**“.

compared to original way

1. skip Phytase
2. skip Glucanase
3. enter temperature of Protease
4. enter time of Protease
5. enter temperature of bAmylase
6. enter time of bAmylase
7. skip aAmylase1
8. enter temperature of aAmylase2
9. enter time of aAmylase2.

   
The source is at  
Arduino: https://github.com/vitotai/BrewManiac/tree/SimpleMashStep  
ESP8266: https://github.com/vitotai/BMESP8266/tree/SimpleMashStep