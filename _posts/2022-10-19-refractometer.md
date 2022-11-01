---
id: 1601
title: 折射儀
date: '2022-10-19T00:00:01+00:00'
author: Vito
layout: post
guid: 'https://www.vito.tw/?p=1601'
categories:
    - 釀酒筆記
---

折射儀或稱為糖度計，是很方便的工具，只要一兩滴就可以量出比重（糖度），比起一般的比重計，通常需要100cc多甚至到250cc，這對批量小的人來說是很大的耗損。除了減少耗損，小量的麥汁在冷卻上也更快，更是增加了使用上的方便性。不過，因為折射儀很容易被誤用，所以自釀前輩們常不推薦，但其實正確使用的話，折射儀是非常方便的。

折射儀的構造並不複雜，但和所有的測量儀器一樣，價格會和精準度和穩定度成正比。據說有些便宜的折射儀測量同一份麥汁都可以得到不同的值。[Brewersfriend.com有一篇文章](https://www.brewersfriend.com/2013/04/24/using-your-refractometer-correctly-for-maximum-accuracy-in-home-brewing/)有完整的使用說明，列舉重點如下：
- 使用前必須用(蒸餾)水歸零。視情況可能每次使用都要歸零。
- 如果你的有比重刻度，不要看，只要使用糖度(Brix)單位。一般都說糖度乘以4大約會是比重，但這只是接近而己，實際上糖度和比重並不是線性的關係。
- 使用前必須降溫，雖然有些會說有ATC（自動溫度補償），但不一定有用。最好降到30幾度以內再量。
- 多量幾次，然後平均。有些便宜的機器誤差很大。

另外，因為折射儀通常測量的是"糖度"，但麥汁的成份和糖有所不同，所以可能會需要一個修正值。很不幸的，每支拆射儀的修正值不同，通常是在1.0~1.06之間，Brewersfriend.com有[如何求出修正值的方法](https://www.brewersfriend.com/how-to-determine-your-refractometers-wort-correction-factor/)。這個方法有點複雜，如果不想做，我會建議拿到一支新的折射儀，還是需要和可以信任的比重計對比幾次。

折射儀的三個使用：

- 測量未發酵麥汁比重

最常用的功能當然是測量**未發酵**的麥汁比重，測量方式如前面Brewersfriend.com的說明。只是想知道概略數值來監控糖化進度，乘以4就是大概的值，如果要準確一點，可以用[計算器](https://www.brewersfriend.com/refractometer-calculator/)。
特別注意麥汁要冷卻到30幾度才量；有個快速冷卻方法：準備可以盛麥汁的小杯子，事先冰在冷凍庫，當10~20cc的熱麥汁進入時，就會馬上到達可測量溫度。不過，由於取用的麥汁量很少，如果杯子中有殘留的水或凝結水，麥汁就稀釋了，所以我在取麥汁時，會裝好後倒回去，再取一次，等於是用麥汁沖洗一次。因為需要的麥汁很少，直接隔水降溫也不需要太多時間。另外，因為麥汁可能會蒸發，放置一陣子後，讀數可能會變高，所以滴上後要馬上判讀。如果麥汁沒有冷卻，這個效應更明顯，可能放個10分鐘會高個0.5brix。


- 測量**已發酵麥汁/啤酒**比重

折射儀最常被誤用的情況就是測量**已發酵麥汁/啤酒**比重，直接使用讀數，因為拆射儀的原理是會受到酒精的影響，所以一旦發酵了、有酒精了，測量出來的值就不是"糖"的濃度比例了。所以每次看到有人問發酵很久比重還是很高，一定要先問是不是用折射儀量的。折射儀的讀數在修正酒精造成的偏移後，還是可以推算出比重的，不過會需要原始比重(OG)的值，才能推算出正確的比重值。這個[計算器](https://www.brewersfriend.com/refractometer-calculator/)的Part II就是用來推算量**已發酵麥汁**比重的。話說回來，已經發酵的麥汁就是啤酒而不是麥汁了。

- 未知原始比重(OG)下，推算出ABV及OG

用OG和折射儀的讀數可以推算出比重(通常但不限於FG)，反過來說，如果知道FG和折射儀的讀數，也可以推算出OG和ABV(酒精度)。所以，同時用比重計和折射儀來量測，即使不知道原始比重，也可以推算出ABV。有時候會在發酵開始兩或三天後才加糖，或者加入果汁、含糖水果時，常常會無法確認OG，這時候就就可以用這種方式來反推OG和ABV。除了啤酒，有人有試過白葡萄酒，推算出來的ABV和標示的13%很接近，所以釀造類的酒可能都適用。不過，這個方法要求的讀數誤差要很小，因為一點點的誤差都會被放大。我找了幾個網站，發現他們用的ABV計算公式是比較不精準的，所以最後決定自己做一個[計算器](https://www.vito.tw/brewutils/brewcal.htm)。 


Reference
- https://www.brewersfriend.com/2013/04/24/using-your-refractometer-correctly-for-maximum-accuracy-in-home-brewing/
- https://www.brewersfriend.com/how-to-determine-your-refractometers-wort-correction-factor/
- [ABV without OG](http://www.woodlandbrew.com/2013/02/abv-without-og.html)
- [BotB- Your Lyin Hydrometer, by Sui Generis Brewing](https://youtu.be/RPfxf-6FcEg)-factor/