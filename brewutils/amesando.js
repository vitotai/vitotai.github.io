const bgImage2={
 src:"nihonshu2.png",
 width:446,
 height:446,
 xrange:[46,446],
 yrange:[400,0],
 shudos:[30,-30],
 sandos:[0.2,2.6]
};


const bgImage={
 src:"nihonshu.png",
 width:557,
 height:572,
 xrange:[70,544],
 yrange:[550,29],
 shudos:[25,-30],
 sandos:[0.4,2.6]
};


const MarkSize=6;
var AmeSan={
init:function(cid,bgInfo){
    // get div
    var canvas = document.getElementById(cid);
    canvas.style.width = bgInfo.width +'px';
    canvas.style.height = bgInfo.height + 'px';
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = bgInfo.src;
    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 0,0);
    });    
    this.ctx= ctx;
    this.bgImage=image;
    this.bgInfo=bgInfo;
},
plotOn:function(shudo,sando){
    const info = this.bgInfo;
    var x =info.xrange[0] + (info.xrange[1] - info.xrange[0]) * (shudo - info.shudos[0])/ (info.shudos[1] - info.shudos[0]); 
    var y =info.yrange[0] + (info.yrange[1] - info.yrange[0]) * (sando - info.sandos[0])/ (info.sandos[1] - info.sandos[0]); 

    const ctx =this.ctx;
    // clear
    ctx.drawImage(this.bgImage, 0,0);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,MarkSize,0,2 * Math.PI);
    ctx.fill();
}
};