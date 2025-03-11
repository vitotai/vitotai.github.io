---
id: 208
title: SunMoonAR
date: '2012-08-28T15:26:24+00:00'
author: Vito
excerpt: 'This is the APP that I wanted to create when I was writing Twilight Compass. SunMoonAR Displays the positions of the sun and the moon in the way of augmented reality.'
layout: post
guid: 'http://vito.tw/?p=208'
categories:
    - 'iPhone App'
---

   
[](https://itunes.apple.com/us/app/sunmoonar/id552011760?mt=8&uo=4)  
This is the APP that I wanted to create when I was writing Twilight Compass. SunMoonAR Displays the positions of the sun and the moon in the way of augmented reality. The reason that I didn’t do it is that iPhone SDK didn’t support CameraOverlay, real time video stream, or AVFoundation frame at that time.(Please don’t count the hacks.) With the power of AVFoundation frame and, even more, the CoreMotion framework, this APP is sure to be.  
The UI of SunMoonAR is kept as simple as possible. However, to avoid overlay of the sun and the moon, I have to create UI to show/hide the suns and moons.  
[![](http://vito.tw/wp-content/uploads/2012/08/IMG_1624.jpg "IMG_1624")](http://vito.tw/wp-content/uploads/2012/08/IMG_1624.jpg)  
[![](http://vito.tw/wp-content/uploads/2012/08/IMG_1644.jpg "IMG_1644")](http://vito.tw/wp-content/uploads/2012/08/IMG_1644.jpg)  
Everything works fine, except that the compass of iPhone usually has error about 10~30 degrees. I am figuring out a way to get azimuth by using gyroscope with a target for calibration, whose precision would only depend on the gyroscope. It is said to be more accurate.  
[](https://itunes.apple.com/us/app/sunmoonar/id552011760?mt=8&uo=4)