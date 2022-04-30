---
id: 704
title: 'BrewManiacEx 0.3'
date: '2017-07-06T16:41:41+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=704'
categories:
    - BrewManiac
---

### Disclaimer:

#### There are more and more functions, but I can’t test all functions because I don’t have all the hardware setup. Neither can they be tested in one single brew. Therefore, please verify before put it into real use.

What’s new

- Post Boil Hop(HopStand)
- Customized audio
- Multi-button in Web interface
- New setting options 
    - button feedback, buzz on button pressed, or not
    - pump priming cycle, on time, off time.
- Iodine test. 
    - There are two options after Iodine Test. Go to Mash Out or Extend the mashing rest.
- Export/import settings in web interface
- Dual heater support by compile option. config.h@39 ```
    #define SecondaryHeaterSupport <strong>true</strong>
    ```

Others

- Sparge heater is no longer *by default supported.*
- revise setting temperature of web interface. Correct setting temperature will be displayed in manual mode.
- code revision.

Known issues:

- The sound doesn’t paly on mobile Safari.
- If the audio file is larger than 120k, it might not work.
- Sometimes, Chrome don’t play the audio unless reloading the page.

- - - - - -

# Post Boil Hop(HopStand)

Check [this post](/posts/support-of-hop-stands).

- - - - - -

# Customized audio

***Currently, it works on Safari and Chrome, not tested on other platform. It doesn’t work on mobile Safari of iOS because it doesn’t allow downloading and playing audio without users’ action.***  
Two files are involve: **sounds.json** and the audio file. All segments of sound is put in a audio file, preferred to m4a(AAC) format, and specified by the **sounds.json** file.  
**sounds.json** should be put in the root of the file system of ESP8266. If it is missing or in wrong format, all the sound effect will be replaced by simple buzzing.  
The format of **sounds.json** is like this:

```
{"src":"sounds.m4a",
"seg":{
"open":{"s":0,"t":2.2,"r":1},
"tr":{"s":2.3,"t":1.5,"r":1},
"addhop":{"s":4,"t":1.2,"r":3},
"addmalt":{"s":5.5,"t":1.4,"r":1},
"boil":{"s":7.1,"t":1.2,"r":1},
"boilend":{"s":8.6,"t":1.2,"r":1},
"bye":{"s":10,"t":2,"r":1},
"chill":{"s":12,"t":1.2,"r":3},
"cool":{"s":13.5,"t":1.2,"r":2},
"iodine":{"s":15,"t":2,"r":3},
"maltin":{"s":17,"t":1.4,"r":3},
"mashout":{"s":18.5,"t":1.4,"r":1},
"nmash":{"s":20,"t":2,"r":1},
"removemalt":{"s":22,"t":1.6,"r":3},
"whirlpool":{"s":24,"t":1.3,"r":2},
"disc":{"s":25.5,"t":1.6,"r":2}}
}
```

“src” specifies the source of the audio file. It doesn’t have to be on the controller. It can be a HTTP URL, and you can put it anywhere that can be assess by your browser. (If your audio file is larger than 150k, you might need to put it anywhere else instead of the controller.)  
“seg” sepcifies the voices:

- “s”: start of the audio, by seconds
- “t”: duration of the audio, by seconds. Use 0 if not used.
- “r”: times of repeat.

The meaning of the tags:

| tag | When | Example |
|---|---|---|
| open | Successfully connecgted | BrewManiac, at your service |
| tr | Setting temperature reached. | Temperature reached. |
| addhop | reminder of adding hop | Time to add hop |
| addmalt | reminder of adding malt | Time to add malt |
| boil | Boiling phase starts | start boiling |
| boilend | Finish boiling | boiling finished |
| bye | brew finished. | brew finished. goodbye. |
| chill | reminder of chilling for hopstand | start chilling |
| cool | start of cooling stage | time to cool |
| iodine | reminder of iodine test | Time for iodine test |
| maltin | temperature reaches mash-in temperature | ready to doughing-in |
| mashout | start of mashout | start mash out |
| nmash | proceed to next mash steop | continue to next mash step |
| removemalt | reminder of removing malt | Time to remove malt |
| whirlpool | reminder of whirlpool starts | time to whirlpool |
| disc | connection disconnected | Controller disconnected |

   
Guideline/tips of audio files

- Keep the file as small as possible. It’s not concert recording, so use lowest sampling rate as possible.
- If your audio file are larger than 150k, putting it on the controller might not work. (This might be issues of ESPAsyncWebServer/ESPAsyncTcp. Keep it as a known issue.)
- There is a lag of playing audio on Safari. Around 200~250ms silence before(including) and after(not including) the audio segment is necessary to make it work better on Safari. For example, if the audio segment is 1 seconds and will be appended at time 15 seconds, you should insert a silence of 0.2 second before the real audio, and another 0.2 second of silence after the audio segment. Then, mark the segment start at 15 second with 1.2 duration.
- OSX has text to speech built-in. You can type something like this to create a audio segment. ```
    >say -v "Samantha" "Hello, I am Siri."
    ```
    
    To output the audio to a file, add “-o” option, like “-o siri”.
- [oceanaudio](http://www.ocenaudio.com) is very good for creating the audio file. You can use it to 
    - merge the audio segments
    - insert/delete silence space between segments
    - re-sample the audio to make it smaller
    - check the start and duration of the audio segment.

- - - - - -

# Multi-button in Web interface

![multibutton](/wp-content/uploads/2017/06/multibutton.png)  
On iOS, you can just press the buttons simultaneously, and **release at the same time**. (Not tested on Android devices.)  
Using mouse to press two or more buttons on laptops or desktops is trickier:

1. Click (and hold) anywhere on the rectangle area around the buttons, but ***not on*** the buttons.
2. Drag through the buttons. The buttons will be hiligh-lighted.
3. Release the mouse **on one of the button**.
4. Releasing the mouse outside the buttons will have no effect. Moving outside the rectangle area during dragging will also cancel the action.