---
title: 'Rancilio Silvia改GaggiMate記錄'
date: '2025-07-04T14:50:35+00:00'
author: Vito
layout: post
categories:
    - caffe
---
## 前言

選擇GaggiMate而非Gaggiuino的理由:

- GaggiMate的操作介面比較簡潔
我通常在早上喝咖啡，在得到咖啡因之前，要看Gaggiuino那複雜的面板，感覺會很頭痛。需要的時候，GaggiMate也可以透過手機提供這些複雜的資訊，所以我偏好GaggiMate。

- GaggiMate的官方支援Silvia
少了很多自己摸索的功夫。

- GaggiMate(目前)是Open Source的
Gaggiuino現在不完全open source，對於一個接近於私人的"產品"，充滿不確定性。需要Open Source除了保留依自己需求改原始碼的可能性，對功能運作上有問題時，也可以查原始碼自己得到答案。

- Gaggiuino有一些不好的評論？
有不少人表示Gaggiuino的Discord不太友善，相反地GaggiMate的Discord則資訊豐富，支援也不錯。


GaggiMate也是有些缺點的，最大的問題還是"新"，可能是新的project，很多東西還在改版中，有些文件沒有很清楚，而youtube上有一個改裝的影片也跳過很多細節，看了幾次都沒看懂。
為了確定到時候不會接錯線，仔細地看了網站上的資料，對照了Silvia的接線，大約確認了如何改裝，分享如下：

（官方的文件一直在更新，也寫的愈來愈清楚。還是建議以官方的文件為主。）

## 材料
### PCB & Lilygo T-RGB

- GaggiMate Pro PCB
   Pro版是有pump變壓控制的，我早就改PID了，就是沖著變壓控制來的，當然要買Pro版的。
- Lilygo T-RGB (Full Circle)
   如果是自己買，要注意有三個型號，要挑Full Circle/ST820觸控的那個型號。有能力自搞的就連2.8吋的都可以。
- PCB Housing
   3D列印PCB的殼。
- Display Housing
    3D列印LilyGo T-RGB的殼。

### 壓力傳感器 及管件
- 0-1.6mPa, 5V,訊號0.5-45V，接頭 G1/4
- G1/4 轉 6mm快拆
- 6mm管快拆三通
- 1/4 矽膠墊圈
- 外徑6mm內徑4mm鐵弗龍管

GaggiMate官方的Silvia接法是從鍋爐接出來，把三通接在OPV和鍋爐之間，取代原本在那個位置的直通；不過一來這個接法較麻煩，二來我的V1根本沒有那個直通可以取代，所以不採用。


官網有強調，管子裡要加水，不要留有空氣，空氣會影響壓力傳感器的測量。比較好的方式是傳感器放在三通的**下方**，這樣會排掉，另外根據在Discord上的說法，傳感器最好和
地面平行放置，而從三通到傳感器最好有一段管子，而不是直接接在三通上。此外，傳感器太靠近pump，可能受到pump的電磁干擾。

### 線材

| 編號 | 名稱 | AWG | 顏色 | 長度 | 接頭 |
|  -- |  -- | -- | -- | -- | -- |
| L1 | Heater bridge | 18 | 紅 | 30mm | male-male  |
| L2 | Eco bridge | 18 | 黃 | 30mm | male-male  |
| L3 | 3-way valve | 18 | 紅 |450mm  | spad-  |
| L4 | Pump | 18 | 綠 | 450mm | female -  |
| L5 | Neutral | 18 | 藍 | 450mm | male -  |
| L6 | Live | 18 | 灰 | 450mm + 30mm | 三頭  |
| L7 | Heater to SSR (x2) | 18 | 黄 | 300mm | male-fork |


18AWG我個人覺得有點太細，pump和電磁閥還好，但連接加熱器的L1 Bridge，及L7到SSR的兩條線，我覺得可以考膚用粗一點的線，
像是12或14AWG或至少16AWG似乎會比較好？

訊號線(22AWG)

| 編號 | 名稱 | 接頭 | Pin |顏色 | 接頭 | pin |  長度 | 
| -- | --    | -- | --  | --  | --  | --  | -- |
| S1 | Buttons | JST PH 2.0mm 4P | 1(Brew) | 綠 | female | | 450mm | 
|  |         |  | 2(Steam) | 綠 | female |  |  |
|  |         |  | 3(GND) | 黑 | female |  |  |
|  |         |  | 4(GND) | 黑 | female |  | |
| S2 | SSR Signal | JST PH 2.0mm 3P | 1(x) |   | | | 150mm | 
|  |         |  | 2(Signal +) | 黄 | fork |  |  |
|  |         |  | 3(GND -) | 黑 | fork |  | |
| S3 | Screen Power | JST PH 2.0mm 2P |1(GND) | 黑   | JST PA 2.0mm 4P | 1 (GND) | 550mm | 
|  |         |  |  2(3V3) | 紅 | | 2(3V3) |  | | 
|  |         |  |   | | | 3(SDA) |  | | 
|  |         |  |   | | | 4(SCL) |  | | 


## 前置作業一：燒錄
必須使用Google Chrome、Opera或Microsoft Edge，連上[網頁](https://docs.gaggimate.eu/docs/flashing/)，分別燒錄PCB和LilyGo。
PCB需要插入USB時按住SW1才會進入燒錄模式，那個按鈕很小、很難按，不過只需要這麼一次。

## 前置作業二：標注接線
在把線拆下來前，先把所有的接線貼上標注(我用油性馬克筆直寫在接外殻)，按鈕的編號順序是面向機器正面、從左到右、從上到下：


| 標注 | 名稱 | 線 |  原廠連接 | 改裝連接 |
| -- | --  | --  | --  | 
| C.1 | Coffee Switch 1 | 白 | 供水按鍵(W.1)、電磁閥和Pump(PMP.B)  | 連上 C.3成為電源的L線 |
| C.2 | Coffee Switch 2 | 橘/白紅 | 電磁閥 | 連上 PCB的V port,由PCB來控制電磁閥 |
| C.3 | Coffee Switch 3 | 黑 | 電源L線 | C.1 |
| C.4 | Coffee Switch 4 | 紅 | 電源N線 | x  | 
| W.1 | Water Switch 1  | 白 | 沖煮鍵(C.1)，電磁閥和Pump(PMP.B)  | x |
| W.3 | Water Switch 3  | 黑 | 電源L線 | x |
| W.4 | Water Switch 4  | 紅 | 電源N線 | x  |
| S.2 | Steam Switch 2  | 灰/白藍 | Steam Thermostat | x |
| S.3 | Steam Switch 3  | 黑 | 電源L線 | x |
| S.4 | Steam Switch 4  | 紅 | 電源N線 | x  |
| BT.A | Brew Thermostat | 紅 | 電源N線 | BT.B   |
| BT.B | Brew Thermostat  | 灰 | 蒸汽鍵(S.2)，Steam Thermostat | BT.A |
| ST.A | Steam Thermostat | 灰 | 沖煮鍵(BT.B)，Brew Thermostat | SSR | 
| ST.B | Steam Thermostat | 黄 | 鍋爐電熱 | SSR |
| PMP.A | Pump | 紅 | Brew Thermotat(BT.A),電源N線 | PCB P port |
| PMP.B | Pump | 白| 供水按鍵(W.1)、沖煮鍵(C.1),電磁閥 | PCB N port |

線的顏色純供參考，最好還是仔細檢查實際連接到那個元件。例如在我的機器上，連接電磁閥的是白色帶紅條紋的線，而應該是灰色那條則為白色帶藍色。

[Whole Latte Love](https://wiki.wholelattelove.com/Rancilio_Silvia/diagrams_and_manuals)有Silvia各元件的
圖，可以看出那個是Brew thermostat和Steam thermostat。

[這邊](https://www.pidsilvia.com/Boiler%20Electrical.htm)有很多Silvia的拆機圖，也可以參考。

## 接線

Silvia(V3)原裝的接線圖：

![Silvia Wiring](/wp-content/2025-01/RANCILIO-SILVIA-Coffee-Machine-8.png.webp)

雖然這是V3的，線路非常簡單，我相信V1/V2應該也是一樣的。把標示和線的顏色畫上去：

![Silvia Wiring/labels](/wp-content/2025-01/Silvia.wiring.png)

上圖標注的電源線是110V的顏色，如果是220V，電源的三條線是藍/棕/白綠（110V是黑/白/綠）。

改裝後成的圖：

![Silvia Wiring Mod](/wp-content/2025-01/Silvia.wiring-mod.png)

### 接線步驟

注意：使用這個PCB和網站的接線方法，**電源的L火線會連到PCB的N、N中性線接到PCB的L，極性會是反的**，不過不會影響功能，因為實際上在PCB電路中，是控制**L**連通到**P**或**V**，而依這個接法，
Pump和電磁閥連接到P和V實際上是N(中性)線，而拉到L的實際上是來自電源的N(中性)線。要說有差的話，是PCB上的將直流電轉5V/3.3V的供電器，但這個供電器極性應該是無所謂的。

### Silvia線路改線
1. 拔掉連接Brew thermostat的接頭 **BT.A** 和  **BT.B** ，用短紅線<span color=#FF0000>L1.Heater bridge</span>把兩條線接起來。
2. 拔掉連接Steam thermostat的接頭 **ST.A**, **ST.B**， 用 2條黄色 <span color=#FFFF00> L7.Heater to SSR </span> 延長，連接到SSR的AC端。
3. 移除thermostats及夾具，把M3 thermocouple測溫線鎖上其中一個孔，不要鎖太緊，可以考慮用散熱膠。
4. 拔掉連接Brew按鈕的 **C.2** ，接上<span color=#FF0000> L3. 3-way valve </span>，另一頭接上**PCB的 V port**
5. 拔掉連接Brew按鈕的 **C.1** & **C.3**. 用短黃線 <span color=#FFFF00> (L2.Echo bridge)</span>把兩條線接起來
6. 拔掉連接Brew按鈕的 **C.4**，用藍色<span color=#0000FF>L5.Netral</span>延伸, 接上**PCB的 L port**
7. 拔掉靠近thermostat的 **PMP.A**，用綠色<span color=#00FF00>L4.Pump</span>連接到 **PCB的 P port**
8. 拔掉 PMP.B,用灰色 <span color=#DDDDDD> L6.Live </span> 連接到 **PCB的 N port**

短紅線<span color=#FF0000>L1.Heater bridge</span>可以省略，2條黄色 <span color=#FFFF00> L7.Heater to SSR </span> 接**BT.A**和**ST.B**即可。

### 按鍵線路
（除了電源，原按鍵的線應該是全部拔掉。）這些接線是把沖煮和蒸汽的按鍵控制接到PCB。

1. 把S1.Buttons的線**1.Brew(綠)**接到沖煮按鍵的**C.2**位，一條黑色的**GND**接到**C.4**的位置
2. **2.Steam(綠)**接到蒸汽按鍵的**S.1**，另一條黑色的**GND**接到 **S.3**

這個Project名稱叫GaggiMate，不是SilviMate，所以是以改Gaggia為出發點的，Gaggia並沒有"熱水鍵"，可能因為如此，PCB也沒有支援熱水鍵的接線（雖然可以有這個功能）。要該熱水鍵起作用，
就必須額外從熱水鍵接線給pump，不過不確定這樣是否會對電路版造成問題。另一個變通的方法是改用可以按鍵，變成可以切換成"PCB（軟體）按制"和直接供電的的按鍵。不熟悉的人就不要自己接吧。

## 壓力傳感器

比較新的接法和我採用的接法都是接在pump的出口處，實際的接法視管件接頭而定。我的是古老的V1，pump出口到鍋爐間是一條軟管。

### 訊號線
1. 連接PCB和SSR訊號
2. 熱電偶控制線
3. 壓力傳感器
1. 連接LilyGo的線

## 心得
個人心得，僅供參考。（隨著版本的進步，或許有些行為也會改變。）
- 在裝機前可以先試電路和做設定；只要把PCB和LilyGo T-RGB都插上USB-C供電即可。不過我在試的時候，必須把熱電偶接上PCB，不然Display無法動作，如果有問題，還是先接上熱電偶。
- 電路不難，水路比較難。鐵弗龍管和快速接頭如果尺寸不太合，可能會漏水，一定要先測試會不會漏水。我後來改用鎖的"飛速"接頭，或者叫"快擰接頭"。另外，官方或從淘寶買的接頭規格通常是BSP/G的，但台灣廠商的預設是PT，一樣是兩分(1/4)，但不相容，買的時候注意一下。
- 如果在設定中勾選**Boiler refill plugin**，一開機便會啓動pump打水，如果壓力傳感器沒接好，偵測不到壓力，會一直打。可以考慮先不要勾選，測試時快速進入Water模式，手動啓動pump打水。在設定的Default Temperature可以設為**0**，那麼進入Water模式便不會啓動加熱。
- 我用的電線連接端子是尼龍全絕緣外殻的，它的公端尼龍外殻比較大，剛好可以罩住原廠接頭，感覺上絕緣和保護效果比較好；我是看到我原先裝的Auber PID kit是用這種的才決定轉用的。
- 比較老的機器，原廠靠近鍋爐的連接端子外殻可能都脆化了。這種外殻是買得到的，Auber和Stefano's Espresso Care都有，我在蝦皮也買到一家有賣，只是沒有一個好找的名稱，要花一些時間。
- 我的Silvia外殻上緣的鋼板有3.2mm以上，官網賣的Display外殻用來插在這個上緣的孔隙是2mm，好像V2以後的厚度是1.8mm。如果是比較舊的Silvia，可能買這個外殻要考慮一下。
- 連接LilyGo T-RGB的那個接頭叫**grove 接頭**，拍賣網站不難找。（不過我花了一些時間才知道它叫什麼。）Display也就是LilyGO的外殼在電源的接頭地方保留一個口，應該是蓋好後再插電源。要注意的是，雖然插可以直接插，但**拔的時候，不可以直接拔**。這個好像是一個陷阱，因為那個接頭插上後會卡住，直接硬拔會把整個接頭扯下來，網路上有不少災情，請小心。
- 拆機接線時最好帶手套，鋒利的地方很多。


## 補圖

改機前留念，已經改PID的機內：

![Silvia Inside](/wp-content/2025-01/Silvia_back.jpg)

改機前正面：

![Silvia Front panel](/wp-content/2025-01/Silvia_front.jpg)


PCB放在前面SSR上方(注意我用的線和官網的不一樣，因為買的線組沒有灰線，我用黑線代替)：

![PCB pro](/wp-content/2025-01/pcb_front.jpg)

在做那幾條訊號線時可以看一下板子上接頭的標示，確定沒接錯：

![PCB pro connector](/wp-content/2025-01/gaggimate_pro_pcb.jpg)

![Lilygo Grove](/wp-content/2025-01/lilygo-t-rgb.jpg)


比起電路方面，我認為輸水管的改裝是比較難的；我最早採用快插(push-in)的接頭，但因為買到的鐵弗龍管尺寸有些微的差異，導致密封不良，第一次裝好要試試看會不會漏水時，因為遵從
官方建議，啓用了Boiler refill plugin ，結果一開機，pump就啓動，就開始噴水。還好本來就有漏水的心理準備，並沒有噴到電路。後來一方面考慮到快插式的接頭構造上有個o-ring
有壽命的問題，網路上買的零件也沒特別說明是什麼材質的o-ring，所以改用和原廠採用的台灣叫"飛速"（中國稱"快擰"）的接頭，不過一開始沒注意到台灣預設的是PT接頭，而中國預設的
是BSP接頭，又買錯了一個接頭。最後勉強接好後，雖然不漏水，但整體感覺並不"平滑"，而且pump的震動䡰有變大。我個人懷疑是因為三通離pump近，加上我沒有接得很好，三通被pump帶動，
導致振動變大。另外，壓力傳感器在三通上方的接法比較容易讓空氣停留在壓力傳感器前，導致壓力讀數波動。


最後的水路接法：**更新，這個接法，pump震動時，接頭會敲到隔開水箱的那塊鋼板，所以後來是用原本的90度彎頭，讓接頭向前彎，就可以避免接觸到鋼板。**

![Final Plumbing](/wp-content/2025-01/silvia_plumbing.png)

除了移動三通到上方，也多加了一個從德國買了一個叫pump pulsor的壓力緩衝器，這個Quickmill出的緩衝器，除了降低震動pump的聲音，據說也有讓壓力比較平順的功能；大概就像電路中的電容
可以緩衝電流一樣。本來想找一個側邊G1/8另兩端飛速接頭的三通，如果有的話，可以直接取代入水口，從三通到壓力傳感器的距離也會長一點點，比較沒不那麼緊迫。沒找到只好用手上既有的東西完成。




參考：
- https://wiki.wholelattelove.com/Rancilio_Silvia/diagrams_and_manuals
- https://www.pidsilvia.com/Boiler%20Electrical.htm