---
id: 92
title: 'Track Viewer on Gmap-中文版'
date: '2009-04-30T04:18:34+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=92'
permalink: /2009/04/92
categories:
    - 'Flickr &amp; Google Map'
---

我不介意我是唯一的使用者，但如果有人喜歡它，我會覺得很高興。所以，我決定公開這個網頁。  
Track Viewer on Gmap可以看GPX檔（Google Spreadsheet）的軌跡，它也可以將選擇的軌跡存成單一軌跡。  
示範及截圖：  
進入<http://photo.vito.tw/track/>.  
會看到一個很簡單的Google Map:  
[![opening](http://vito.tw/wp-content/uploads/2009/04/opening.png "opening")](http://vito.tw/?attachment_id=79)  
右上方的Google control下有一列工具列：  
[![toolbar](http://vito.tw/wp-content/uploads/2009/04/toolbar.png "toolbar")](http://vito.tw/?attachment_id=76)  
這些工具列包括了所有的功能：  
載入 – 載入軌跡  
儲存 – 將顯示的軌跡存成GPX 檔  
顯示／隱藏軌跡資訊 - 顯示或者隱藏目前選擇的軌跡資訊  
顯示／隱藏高度變化圖 - 顯示或者隱藏目前選擇的高度變化圖  
顯示／隱藏速度變化圖 - 顯示或者隱藏目前選擇的速度變化圖  
顯示／隱藏軌跡列表 - 顯示或者隱藏軌跡資訊列表  
About - 關於  
從載入開始看，可以載入Google Spreadsheet的資料，當然，這個spreadsheet必須是公開發佈而且是符合要求格式的：  
[![load_track_gss](http://vito.tw/wp-content/uploads/2009/04/load_track_gss.png "load_track_gss")](http://vito.tw/?attachment_id=82)  
或者是指定GPX檔的網路路徑，這個網路路徑當然也是必須可以被其他人看到的。  
[![load_track_url](http://vito.tw/wp-content/uploads/2009/04/load_track_url.png "load_track_url")](http://vito.tw/?attachment_id=81)  
最後一個可能是上傳GPX檔。請注意：由於Javascript無法存取本地機器上的檔案（是的，有例外，但不是很方便），所以GPX檔必須先上傳再下載，所以會花一些時間。  
一旦載入成功，就可以見到地圖上顯示的軌跡，以及右上方有一個軌跡的列表。  
勾選／取消勾選可以顯示／隱藏對應的軌跡。  
要選擇一條軌跡請點選軌跡的名字。  
[![load_](http://vito.tw/wp-content/uploads/2009/04/load_.png "load_")](http://vito.tw/?attachment_id=83)  
這個列表也可隱藏起來。  
[![hide_track_list](http://vito.tw/wp-content/uploads/2009/04/hide_track_list.png "hide_track_list")](http://vito.tw/?attachment_id=84)  
點第三個圖示即可顯示目前所選的軌跡的一些資訊：  
[![select_track](http://vito.tw/wp-content/uploads/2009/04/select_track.png "select_track")](http://vito.tw/?attachment_id=77)  
可以顯示高度及速度變化圖，點變化圖則會在地圖上對應的點出現infowindow：  
[![chart](http://vito.tw/wp-content/uploads/2009/04/chart.png "chart")](http://vito.tw/?attachment_id=86)  
最後，可以儲存目前顯示（也就是有勾選的）軌跡，如果選擇合併，則所有的軌跡會合併成一條軌跡。  
[![save](http://vito.tw/wp-content/uploads/2009/04/save.png "save")](http://vito.tw/?attachment_id=78)