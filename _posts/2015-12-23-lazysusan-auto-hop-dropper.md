---
id: 338
title: 'LazySusan- Auto Hop Dropper'
date: '2015-12-23T20:16:50+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=338'
categories:
    - BrewManiac
---

<div> Sometimes, we do something because it can be done. This is something like that.</div><div></div><div></div><div><div class="jetpack-video-wrapper"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="473" loading="lazy" src="https://www.youtube.com/embed/Q3FI-BXuH_0?feature=oembed" title="Hop Dropper V1" width="840"></iframe></div></div><div><div class="jetpack-video-wrapper"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="473" loading="lazy" src="https://www.youtube.com/embed/WhqO-yYpklw?feature=oembed" title="Hop Dropper V2" width="840"></iframe></div></div><div></div><div>Components:</div>- Arduino Uno
- KY-040 rotary encoder
- I2C LCD 16×2 (I use a 20×4 LCD, but I design to use 16×2)
- Stepper motor 28BYJ-48 w/ ULN2003 driver board
- Optional a microswitch or photo interrupter
- Buzzer
- A Spinner or conveyor that can be driven by the motor

<div>Wiring: (5V&amp;GND has to be wired for Driver Board, Ky040, and LCD)</div><div>[![hop dropper](http://vito.tw/wp-content/uploads/2015/12/hop-dropper.png)](http://vito.tw/wp-content/uploads/2015/12/hop-dropper.png)</div><div></div><div>I don’t have the resource to build a complicated machine. Therefore, I let the motor directly drive the spinner or rolling band. If the motor is not powerful enough, a gear set or a more powerful motor can be used. A larger torque stepper motor might cost more, so a cheap servo motor is also a good option. The sketch must be modified to use different components.</div><div>A cheap continuous servo I found:</div><div>http://www.ebay.com/itm/201482392044?_trksid=p2060353.m1438.l2649&amp;ssPageName=STRK%3AMEBIDX%3AIT</div><div></div><div></div># **Usage:**

<div>1. you have to enter correct settings according to your system. The settings are **Number of Buckets** (hop holders, I felt like calling it buckets), **Auto Anchor**, **Spin Over**, and **Forward Rotate**. To access the setting, enter \[**More../Settings\]**
2. Set the correct moving distance for every bucket. in \[**More../Set Position** \].
3. Optionally check if it works as expected. in \[**More../Test Spinner**\].
4. Edit the hop schedule. in \[ **Edit** \]
5. \[**Run**\] the hop dropper.

</div><div>Ready to go? Wait. Here is One More thing. The hop holders can be at any position when the system is started, and putting them into correct and “ready” positions is necessary. I call it “anchor” because there should be a mark or microswitch at the “anchor point” which indicates that the holders are at the correct positions, in which the first hop holder is ready to dump the hop. Moving the bucket to correct position is necessary when “**Run**“, “**More../Set Position**“, and “**More../Test Spin**“.</div><div></div># Details:

<div>**Main** menu</div>- **Edit**: edit hop schedule
- **Run**: start auto hop dropping
- **Remote**: to be implemented. it doesn’t function for now.
- **More..**: setting and others

**More..** menu

- **Test Spinner**: to test the hop dropper
- **Set Position**: set hop dropper position. to set correct distance to move between hop
- **Manual Spin**: manually move the hop holders. Push to enter/exit.
- **Settings**: settings
- **Back**: back to upper level

<div>**More../Settings**:</div>- **Bucket Number**: the number of hop holders. It ranges 4-12.
- **Auto Anchor**: by using microswitch or photo interrupt, the dropper can move to ready position automatically.
- **Spin Over**: If this value is not zero, the dropper will move over the amount specified, hold for one second, and then move back.
- **FW Rotate**: CW(clockwise)/CCW(counterclockwise). Facing the shaft of the motor, the rotating direction of the shaft to make dropper move forward.

<div>**How to put the dropper/spinner in ready state?**</div><div>If Auto Anchor is set to YES, the dropper/spinner will move to the position automatically. Otherwise, the dropper/spinner will start to move until the rotary encoder is pushed, when it moves the holders to correct positions. After that, turn the encoder to adjust the position and push again to finish “anchoring process”.</div><div></div><div>**How to set the position?**</div><div>First, anchoring the dropper/spinner. Then turn the encoder until the first hop is dumped, then push the encoder. Do the same thing for other holders.</div><div></div><div>**How to test the dropper/spinner?**</div><div>First, anchoring the dropper/spinner. Then push to “dump” first hop, then the rests.</div><div></div><div>**How to edit the hop schedule?**</div><div>First, set the boil time by turning the encoder (5~120min). Then, edit the time of each event. An event can be an Alarm or Hop Adding. LONG PRESSing the encoder to edit the type to Alarm/Hop. Push the encoder to back to editing time. Push for next event editing. Change the time to ZERO to finish editing. The time can be the same as previous event. In that case, the hop will be dumped right after the previous one.</div><div></div><div>**How to run?**</div><div> First, anchor. Then, put hop in the corresponding holders. When the wort starts boiling, push the encoder to start counting time. LONG PRESS the encoder to abort running.</div><div></div><div></div><div>Find the code at:</div><div>https://github.com/vitotai/LazySusan</div><div>You will need three libraries that I created:</div><div>[libraries](http://vito.tw/wp-content/uploads/2015/12/libraries.zip)</div><div>You will also need I2C LCD library for Arduino.</div><div></div>