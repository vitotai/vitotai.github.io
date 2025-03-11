---
id: 66
title: 'Flickr Editor on Google MAP'
date: '2009-04-20T13:20:26+00:00'
author: Vito
excerpt: 'My Flickr and Google Mashup. To facilite my usage of Flickr.'
layout: post
guid: 'http://vito.tw/?p=66'
categories:
    - 'Flickr &amp; Google Map'
---

This application is here for two reasons.  
The first reason: I am learning Javascript/AJAX, and I love Flickr and Google Map.  
The second reason: I upload all my photos to Flickr, most of them are during travel and location is important, and select some of them to share with friends. Flickr Organizer is good to manage photos/photosets. However, it’s hard for me to select photos from one set in Flickr Organizer, for I cannot make selection by seeing the thumbnails. To look larger photo, and the location where the photo was taken is also cumbersome. Not to mension that you must wait to save modification to title/description of each photo.  
The goals are:

1. Google Map is used, of course.
2. Keyboard Control for Previous/Next, and Tag set/unset.
3. “Medium” photo displayed, and preloaded. “Large” photo is available and can be quickly accessed.
4. Update modification in one batch

So this Flickr-Gmap mashup is created, so that I can edit title/description, by look where the photo was taken, and set tags quickly. Other operations, like  
perimission setting or creating new set, can be done easily in Flickr Organizer.  
<http://photo.vito.tw/som/index.html>  
Usage:

1. Login Flickr and Authorization
Click the link “<span style="color: #0000ff;">Login Flickr</span>” on left-bottom to login Flickr and authorize “Flickr Editor” to access your photos.  
You can also VIEW photo sets by manually input SET ID, without login. Of course, you can only see PUBLIC photoswithout login.  
The authorization data is not saved, so you must “log-in” everytime.  
If you want to edit Titles, Descriptions, Locations, Tags of your photos, you must authorize “Flickr Editor” to “Write Access”.

3. Browse  
    ![select set](http://vito.tw/wp-content/uploads/2009/04/select.png "select set")  
    Once login and authorized, you can select your photoset from the drop down list.  
    Scroll and click the thumbnails to view photos. You can also click the markers on map to select photos.  
    <span style="color: #ff0000;">Keyboard action:</span>  
    ‘z’: previous photo.  
    ‘x’: next photo.click the photo to see “Large Image”. Click on the “Large Image” to dismiss it.
4. Edit  
    If “Write Access” is authorized, you can edit the meta data following.  
    Click “End Edit” button to end edit mode.  
    Or, click “Update All” to update editing to Flickr.  
    Everything you modified is kept locally, before you “<span style="color: #0000ff;">Update All</span>” to Flickr.The description must be loaded before you can edit it. Since description is loaded in asynchronous manner, you might see “<span style="color: #0000ff;">loading</span>” in the description textarea. 
    1. label &amp; description  
        Input the text in the text fields.
    2. location  
        Click the “<span style="color: #0000ff;">Set Location</span>” button, and click on map to set photo location.
    3. tags  
        The most complex items here.  
        Check/uncheck the checkboxes to set/unset Tags.  
        The tag names can be changed. Just place mouse cursor over “Tags”, the  
        tag names editor will pop-up.  
        ![tagname editor](http://vito.tw/wp-content/uploads/2009/04/tagname.png "tagname editor")  
        Change the text to what you want.  
        The real tag names used to update to Flickr are those before you press  
        “<span style="color: #0000ff;">Update All</span>“. For example, if you select tag 1, named “*select\_1*“, and later change the “*select\_1*” to “*myselection\_1*“, and then press “<span style="color: #0000ff;">Update All</span>“, the tag set to Flickr will be “*myselection\_1*“. Changing tag names will change status of the checkboxes, to reflect the real status of TAG- set or unset. For example, if one photo already has one TAG , named “*myprevious\_select*“, and after changing one of the tag names to “*myprevious\_select*“,the corresponding checkbox will be checked. The TAGs of the photo will also show on the Tag Name Editor, following the “*This Photo*“.  
        <span style="color: #ff0000;">Keyboard Action:</span>  
        press key 1,2, or 3 to set/unset corresponding tags.

View Mode:  
See “Browse” section. If setid is given in URL, it is in “View only” mode.  
eg.  
http://photo.vito.tw/som/index.html?set=72157600565648150  
—————————————————————–  
寫這個應用有兩個理由；第一，我在學Javascript/AJAX，我喜歡Flickr及Google Map。  
其次，我把所有的照片都放上Flickr，然後挑選一些公開；這些照片大都是去玩的時候拍的，所以拍照的地點有重要性。Flickr Organize很好用，但是拿來選照片就很難用：只看縮圖很難決定，而要看大一點的圖及地圖，更是要用Mouse點好幾次才行。更提每更改一張照片的資訊，就要等一下子。  
想要的樣子是：

1. 使用Google Map。
2. 可以用Keyboard看下／上一張，以及設Tag
3. 可以看到”Medium”（中等）的照片，有預載，也可以很快地看大圖。
4. 一次更新所有的變動，而不是改一下就要更新。因為更新要等一下，節奏不順。

這個Flickr-Gmap的「混搭」就是這樣來的；可以編輯Title/Description、可以看到照片在那裏拍的，快速地設Tag。設好Tag後就可以很方便地用Flickr Organize來做其他動作；例如，更改權限或加入新的SET。  
<http://photo.vito.tw/som/index.html>  
使用方法：

1. 登入Flickr及授權
點左下角的”<span style="color: #0000ff;">登入 Flickr</span>” 授權”Flickr Edito on Google Map”的存取。不登入也可以用輸入SET ID的方式看照片，但只能看到公開的照片。  
因為授權的資料沒有被儲存，所以每次都要「登入」。  
要編輯Title/Description/location/Tag的話，必須授權「寫入的權限」。

3. 流覽  
    ![select set](http://vito.tw/wp-content/uploads/2009/04/select.png "select set")  
    一旦登入也授權後，你的所有的SET都會出現，可以在左下方那個下拉式選單點選。  
    選了一個SET後，縮圖就會出現，如果有設定位置，也會在相對的地圖上出現一個標記。縮圖和地圖上的標記都可以點。點左方的圖可以看大圖。  
    <span style="color: #ff0000;">鍵盤操作</span>  
    ‘z’: 前一張。  
    ‘x’: 下一張。
4. 編輯  
    如果是授權「寫入」，就會出現「編輯」的按鈕。按下則可以更改下列的項目。  
    按下「結束編輯」就會結束編輯狀態。  
    或者，如果已經有變動，按下「更新全部」就會將全部的變動更新到Flickr。  
    請注意在按下「更新全部」之前，所有的變動都不會動到Flickr。另外，照片的說明（description）必須要下載完成才能進行編輯。因為說明是以非同步的方式下載的，所以你可能會看到”Loading”出現。 
    1. 標題及說明  
        輸入文字即可。但按「更新全部」才會將變動存到Flickr。
    2. location  
        按”<span style="color: #0000ff;">設定位置</span>” 按鈕，然後在地圖上對應的點按一下。
    3. Tag  
        這個有點複雜：  
        基本上就是可以勾選三個Tag前的checkbox。不過，tagname是可以改變的：只要將游標移到”Tags”，就會出現一個可以編輯tagname的editor。  
        ![tagname editor](http://vito.tw/wp-content/uploads/2009/04/tagname.png "tagname editor")  
        勾選Tag只是勾選邏輯上的三個tag，真的會寫到flickr的tag最在按「更新全部」鈕之前的tagname。例如，原本第一個tag是”select\_1″，勾了第一個tag，後來將”select\_1″改成”myselection\_1″，如果接著就儲存變動，則真正的tag是”myselection\_1″。改變這三個tagname也會改變checkbox的狀態，以反應真正的狀態：例如，如果有張圖已經有一個tag叫”myprevious\_select”，當把第一個tagname改成”myprevious\_select”後，對應的checkbox就會被勾選。照片原本有的TAG會出現在編輯tagname的editor下，在”This Photo：”後面。  
        <span style="color: #ff0000;">鍵盤操作</span>  
        按1,2,3 即可勾／取消勾選這三個Tag。

純流覽模式  
操作請參考前面的說明。如果網址加上set id進入，則不會出現可以編輯的畫面。  
例如：  
http://photo.vito.tw/som/index.html?set=72157600565648150