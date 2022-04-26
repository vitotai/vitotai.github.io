---
id: 435
title: 'BrewManiac-Multiple Sensor support'
date: '2016-08-11T17:03:28+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=435'
permalink: /2016/08/435
categories:
    - BrewManiac
---

DS18B20 uses OneWire bus which can be connected to multiple devices at the same time, which implies that supporting multiple sensors seems trivial. **It is**. However, there are some software issues that must be addressed.

- Usage of sensors  
    One sensor will surely provide one reading. The temperature reading is used as **input of PID** and to be **displayed for information.** Using multiple sensors rises a question: “*which one to be used?*” 
    - PID input  
        I make them selectable in these phases: PreMash, Mash, Mashout, Boiling, Cooling. The ***Primary*** one will be the one used as PID input.
    - Display  
        It is nearly impossible to display all readings. Although more might be better, TWO are displayed because of minor impact to original screen display. The ***Aux**iliary* one will be the one displayed next to ***Primary*** one.
- Identifying the sensors:  
    To use multiple sensors, identifying them is necessary. Thus, **the first thing before everything could work is setup the sensors**. Depending on the compile option and the number of sensors connected, you will need to identify them in the setup menu. ## Simple Usage direction
- Setup sensors  
    In “Menu” after “Automation Setup”, a new menu “Sensor Setup” is added.  
    ![multi_sensor_menu](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_menu.jpg)It is for sensor setup. The first step is to identify the sensors by assigning a number(id) to each one. Starting from “#1” to the number of sensors, the addresses and temperature reading will be displayed. Use UP and DOWN buttons to change the sensor, and press ENTER to assign that sensor. *****Due to the limit of LCD display, only last 4 bytes(8 digit) of the address are displayed. The temperature reading will not be updated unless it is re-printed by UP/DOWN\*.*****   
    ![multi_sensor_select_sensor](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_select_sensor.jpg)
- Setup sensors used  
    After assigning the sensors, assign **Primary** and **Aux sensor for each brew stage, including PreMash, Mash, Boiling, and Cooling.**![multi_sensor_setup_primary](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_setup_primary.jpg)![multi_sensor_setting_aux](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_setting_aux.jpg)
- Calibration setting  
    The calibration setting is the same as original design, but multiple sensors.
- Display  
    The reading of Primary sensor is always displayed at TOP or Left.  
    ![multi_sensor_main](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_main.jpg)![multi_sensor_automode](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_automode.jpg)![multi_sensor_paused](http://vito.tw/wp-content/uploads/2016/09/multi_sensor_paused.jpg)

(\*note) Displaying the temperature readings makes it easier to identify the sensors, since the address is meaningless unless another program is used. By a cup of iced water or holding the sensor, you will be able to identify the sensors by the change of readings. However, since the sensor setup procedure is supposed to be run once, or at least rarely. I don’t want to use too much code to refresh the reading. The reading is updated only when it is “printed” on LCD, which means you can use UP/DOWN to change sensors and force updating of readings.

# **Compile option**

Single sensor is the default configuration, so you have to change the option by yourself. The option can be found at  
BrewManiac.ino @line 96  
\#define MaximumNumberOfSensors 1  
**Memory Impact**  
Flash: roughly additional 2.5K flash is needed.  
RAM: nearly additional 100 bytes for 3 sensors.  
***Warning***  
I don’t have the setup of multiple sensors. Please test before use, and use at your own risk.  
Github:  
https://github.com/vitotai/BrewManiac/tree/MultipleSensor  
Known issues:

- T<del>he temperature reading in IDLE/Main screen and Manual mode is not defined. When Power up, the default Primary is the first sensor(#1) and default Auxiliary is the second sensor(#2). However, entering auto-mode process will change the configuration, but it won’t change back after entering idle screen.</del>

TODO

- Using average temperature of all sensors as input of PID.