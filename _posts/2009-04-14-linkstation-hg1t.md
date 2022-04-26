---
id: 56
title: 'Linkstation HG1T'
date: '2009-04-14T11:38:48+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=56'
permalink: /2009/04/56
categories:
    - Uncategorized
---

服役四年的Linkstation HG250早就不敷使用；放了約150G的RAW檔和50G的JPEG檔，剩下沒有多少空間，不過因為有這些功能，還是得清一些空間來放照片：

- flickr upload/download 
    - 已經寫好的PHP script，可以上傳到flickr；隨著相機pixel的成長，檔案也跟著成長，每次upload(2g~4g)都花了10個小時左右，用NAS傳其實還不錯，不用一直開著PC等。
- Rsync 
    - 照片和一些重要的資料都用rsync備份到另一台NAS TS-209 pro。東西放在兩台機器上感覺比較放心。
- Svn 
    - 用來放一些自己寫的小程式，PHP/Javascript什麼的。

在裝svn的時候，不小心搜尋到[Kuro-SATA](http://www.kuroutoshikou.com/modules/display/?iid=898)，是一個讓Linkstation/Kuro-box可以裝上SATA硬碟的轉接卡。  
然後，我買了5D2，兩千萬畫素，兩倍於5D的RAW檔－兩倍的吃硬碟空間速度。  
去東京玩的時候，心想該不會BIC CAMERA有賣吧？竟然真的讓我在有樂町店找到了：日幣2480。  
回台灣後，考慮了幾天，還是在PCHOME買了一台1T的SATA硬碟。  
安裝過程參考http://www.mobile01.com/topicdetail.php?f=168&amp;t=90488 的拆機過程，圖文解說得非常詳細。  
裝上硬碟後，照[wiki](http://buffalo.nas-central.org/wiki/Upgrade_%28or_replace%29_the_existing_LinkStation_hard_drive)的方法  
Update firmware上openlink，第一次會因為format硬碟太久失敗，等硬碟燈不閃了，再試一次，照理說會成功，不過我是第三次才成功。  
把拆下來的原本250G硬碟裝到USB外接盒，插上linkstation的前USB，試著mount  
&gt;mount -t ext3 /dev/sda3 /mnt2/usbhda3  
成功！  
接下來就是把原本的debian複制到partition 3，然後用rsync把資料copy到新的硬碟，沒想到200G的資料花了快兩天整－速度約1.4MB/sec。不知道是linkstation的USB效能不彰還是CPU太弱？還是這個外接盒太舊了，速度太差？  
本來應該是到此告一個段落了，但看到U-BOOT，不禁心癢了起來，又花了一些時間，上了U-BOOT。U-BOOT的部分放在另一篇。