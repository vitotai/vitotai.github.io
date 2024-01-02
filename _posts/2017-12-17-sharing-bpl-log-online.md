---
id: 821
title: 'Sharing BPL log online'
date: '2017-12-17T18:12:03+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=821'
categories:
    - BrewPi@ESP8266
---

Here is a new easy way to share BrewPiLess logs over the internet, on-line.

# Step 0: Hosting on GitHub.

If you have your own host, it should be easy and you can skip this part. Using GitHub hosting service is simple and easy. I would suggest you too google on this subject to find better illustration and description.

# Step 2: Get the log viewer

Get the “BPLog.htm” file from my GitHub:  
<https://github.com/vitotai/vitotai.github.io>  
Don’t forget to get the “raw” version.

# Step 3: Upload the file and logs to share

The logs will be put at the same place as the BPLog.htm file. Subdirectories can be used. I put my log in a subdirectory, named “log”.

# ![](/wp-content/uploads/2017/12/lv.jpg)

# Step 4: Test the shared link.

First open the log viewer page on your browser. The url should be something like

```
https://[your_name].github.io/BPLog.htm
```

If you can see the empty log chart page. You are almost done.

# Step 5: Create the shared link.

Append log name after the URL above in this format

```
https://your_name.github.io/BPLog.htm?log=[Your log name]
```

If the log is put in a subdirectory, replace “/” by “%2F”. You will need to uriEncodeComponent special characters. If you don’t understand previous sentence, please don’t use special characters in the path and log file names.  
eg. A log name “**nottingham.035.20171114**” in subfolder “**log**”

```
https://vitotai.github.io/BPLog.htm?log=log%2Fnottingham.035.20171114
```


# Step 6: Optional with selection range

Select the desired range, right click mouse on the chart.  
A menu of “Open Selection” will popup, click that item to open a new window that will zoom to the selection range on open.