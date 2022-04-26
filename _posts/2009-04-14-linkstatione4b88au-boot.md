---
id: 58
title: Linkstation上U-BOOT
date: '2009-04-14T12:15:10+00:00'
author: Vito
layout: post
guid: 'http://vito.tw/?p=58'
permalink: /2009/04/58
categories:
    - Uncategorized
---

花了半天的時間（不含survey的時間！）成功將linkstation刷成u-boot及可以急救的系統，記錄一下，或許他日或他人會用到。

- Flash Information 
    - Flash分成四個部分，參考[wiki的詳細說明](http://buffalo.nas-central.org/wiki/Information/HGFlashROM)。  
        比較重要的是以下兩個section: 
        - FFC0-0000, 3MB, kernel image，及開機的一些設定(initrds)；支援急救的firmimg.bin則是要燒這裏。
        - FFF0-0000 448K, Boot code；U-boot就是要取代原廠的bootcode，所以就是燒在這裏
    - Flash的information可以用’cat /proc/mtd’看到address &amp; size
    - <span style="color: #ff0000;">有些版本的kernel可能沒有flash driver，或者flash driver設定不對</span>；在linkstation wiki Forum中有一篇提到在2.4.20中才能用dd if=u-boot-hg.flash.bin of=/dev/mtd1 bs=1k的方法，其他版本有風險。
- Booting 
    - （推測）原廠的開機流程，load flash中（FFC0-0000)的kernel，然後將root設成/dev/hda1；以往的改機是將debian裝在hda3，然後將hda1和hda3對調，所以事實上kernel還是使用flash中的kernel。
    - U-Boot的開機是可以設定的；預設的開機有 
        - Flash開機 flboot：boot FFC0-0000，root設成/dev/hda1。
        - 緊急模式 emboot：開flash中的kernel，root設在RAM disk中；要注意原廠的firmimg.bin不能進入EM，因為一來沒有telnet/tftp，另外有密碼的問題會無法登入。
        - 硬碟開機 hdboot：將kernel image load到80-0000，然後boot 80-0000，視kernel所在而做設定。
    - 預設的variables: http://buffalo.nas-central.org/wiki/U-boot\_Default\_Environmental\_Variables\_and\_Values
    - 不修改firmware更改kernel的方法：開機後再用loader 載入新的kernel；在kernel 2.6中有使用這種做法，很方便切換不同版本的kernel；不同版本的kernel有不同版本的loader，不可混用 。
    - Linux kernel 2.6的kernel有使用一個dtb檔用來記錄硬體設定，在U-Boot中會load到7f-0000。
- Firmimg.bin 
    - 包含了kernel和initrds；有很多個版本，除了原廠版本（kernel是2.4.20或2.4.17） 
        - linuxnotincluded支援U-boot的版本，kernel是2.4.33，支援telnet/tftp/fdisk，可以進EM: http://buffalo.nas-central.org/wiki/Uboot\_firmimg.bin\_ppc
        - linuxnotincluded不需要U-boot的版本，和U-boot版內容似乎一樣，以後的openlink可能使用這版本 : http://buffalo.nas-central.org/wiki/Telnet\_and\_FTP\_enabled\_ramdisks

由於不能肯定我的LS上的kernel版本flash driver有沒有問題，所以決定採用u-boot來刷u-boot及firmimg.bin，以降低風險。嘗試過自行build RAM load，但始終無法在netconsole看到東西，最後決定使用網路上已經build好的版本，先用RAM版玩一玩。  
玩了好幾次，稍微了解u-boot的操作後，就決定了要怎麼做，也發現了一個小問題：我的硬碟中沒有原廠2.4.20 kernel的uImge(vmlinux.Uboot)，網路上也找不到，如果刷了那個可以急救的firmimg.bin，kernel就會變成2.4.33。因為我的系統都是在2.4.20下運作的，為了確定2.4.33沒有問題，還是先試一下－這就是先試RAM版的好處。很幸運的，2.4.33的uImage找得到－應該是先有這個kernel才有這個firmimg.bin的。  
使用到的檔案列表：

1. Kernel image – kernel 2.4.33  
    http://downloads.buffalo.nas-central.org/LSHG\_PPC/Kernel/Kernels/Uboot/linuxnotincluded/linux-2.4.33.3-list.mg.2-v3/ 附檔名是UBoot的那個檔案。
2. Firmimg.bin – linuxnotincluded的U-Boot版, kernel 2.4.33  
    在http://buffalo.nas-central.org/wiki/Uboot\_firmimg.bin\_ppc 內文中有連結。
3. Uloader.o 及u-boot-load-hg.sh  
    http://buffalo.nas-central.org/index.php/U-boot\_bootloader 中有,不過似乎只有支援kernel為2.4.17及2.4.20。
4. U-boot ram build  
    http://downloads.buffalo.nas-central.org/LSHG\_PPC/Bootloader/Uboot/Precompiled/u-boot-hg.ram.bin
5. u-boot flash build  
    http://downloads.buffalo.nas-central.org/LSHG\_PPC/Bootloader/Uboot/Precompiled/u-boot-lsppchg-flash-1.2.0-r2.bin

以下是我刷u-boot和firmimg.bin的過程，設定IP，使用nc，以及在hda3中取消swaphd.sh的過程就如很多教學中的作法一樣，就不再提了。

1. 準備檔案  
    下載符合系統的uloader.o，預設是從/dev/hda1開機，然後檔案放在hda3的share中，所以是在/mnt/share中；包含  
    `<br></br>uloader.o<br></br>u-boot-hg.ram.bin<br></br>u-boot-load-hg.sh<br></br>`  
    這個RAM版的upgrade預設是燒 partition 3的/share/u-boot/u-boot-hg.flash.bin，所以要將檔案放在/mnt/share/u-boot中。不過，我在測試的過程發生了找不到檔案的狀況，試著用ext2ls發現進/share就有問題，推測或許是/share中有中文檔名的關係，所以只好將u-boot搬到partition 1的/u-boot，更改u-boot的ubfile及ubpart後還是成功了，後來firmimg.bin也放在/u-boot。  
    將(１.)找到的2.4.33 kernel image放在patition 1 &amp; 3的/boot/vmlinux.UBoot，這是下載的u-boot-hg.ram.bin中的預設值。
2. 測試  
    或許是timing的問題，RAM版的netconsole反應有點遲鈍，很容易掉資料，有時候似乎要猜猜看時機直接輸入s 才會看到東西；小小的懷疑之前自己build的版本可能也是這樣。不過，只要抓到停下來看到提示的”=&gt;”符號，就很正常了。  
    試patition 1上的/boot/vmlinux.UBoot開機，root也設成/dev/hda1，正常。  
    reboot，因為這個vmlinux.Uboot的kernel是2.4.33，而我用的uloader.o是2.4.20；所以要先reboot成flash中的kernel後，才能再load u-boot-hg.ram.bin。  
    試patition 3上的/boot/vmlinux.UBoot開機，root也設成/dev/hda3，正常。這是工作的系統，花了很多時間測試。  
    測完還是要先reboot回2.4.20的kernel才行－就是這樣才擔心有些東西在2.4.20跑得好好的不知道到了2.4.33後會不會有問題。
3. 刷u-boot  
    Linkstation wiki上說最好先試著寫128k，看看有沒有timeout的問題再刷flash，原本想試，因為時間有點晚了，也花了很久的時間，精神不太清楚了，心一橫就直接”run upgrade”了；這告訴我們，長時間的工作事實上品質是有問題的，也很容易下錯誤的決定。  
    第一次run的結果是失敗，因為u-boot讀不到檔案，重來將u-boot-hg.ram.bin放在patition 1的/u-boot後，就成功了。  
    這個版本的u-boot和那個RAM版的事實上是不一樣的，environment variables不一樣，似乎是用來boot foonas用的，而且netconsole的反應也較快，比較沒有掉資料的問題。
4. 刷firmimg.bin  
    (刷firmimg.bin的過程有點驚險，還好之前有看這些說明一下，反應得當，否則．．．)  
    刷成功u-boot後，馬上接著嘗試firmimg.bin，參考刷u-boot的流程以及 http://buffalo.nas-central.org/index.php/U-boot\_bootloader 上的範例，結果發生了timeout！  
    還好提示符號（=&gt;）還是有出現，再試一次，一樣失敗，再試著將erase及write分開，還是一樣timeout。  
    冷靜下來，心想結果一樣就好了，過程可以不一樣，測試過每次都是0xffe0-0000不一樣，0xffc0-0000 ~ 0xffdf-fffff是成功的，算了一下firmimg.bin的大小是2,991,408合0x2DA530（果然和filesize一樣），剛好前2MB都成功，只要把剩下的0xDA530再寫進去就行了：  
    `<br></br>=>protect off ffe00000 ffefffff<br></br>=>erase ffe00000 ffefffff<br></br>=>cp.b a00000 ffe00000 DA530<br></br>`  
    再比較一下：  
    `<br></br>=>cmp.b 800000 ffc00000 2DA530<br></br>`  
    一模一樣~成功了~  
    試了進入EM，竟然沒辦法連線192.168.11.150，仔細研究  
    http://buffalo.nas-central.org/wiki/How\_to\_use\_Uboot\_and\_2.4.33.3\_firmimg.bin\_%28ppc%29  
    “sometimes it seems that DHCP works”，連到router，果然找到了。其實DHCP看似方便，但要有一些方法才能找到IP，比起來固定的IP不用猜不用找是比較方便的。  
    到此，才真的算是成功了。其他的就是更改開機流程的參數，然後saveenv就行了。
5. 後記  
    本來想要將ipaddr及serverip改成192.168.1.x，後來想想，下次用到netconsole的時候不知是何年何月，到時候可能不記得到底設成什麼了，所以還是維持192.168.11.149/150。  
    另外，要改變ippaddr要注意，一旦更改，連線馬上中斷，所以要下連續的command，像是  
    `<br></br>=>setenv ipaddr 192.168.1.x;saveenv<br></br>`  
    這樣才能成功改變IP。