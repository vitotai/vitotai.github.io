const bgImage3={
 src:"nihonshuv3.png",
 width:420,
 height:420,
 xrange:[35,420],
 yrange:[384,0],
 shudos:[40,-40],
 sandos:[0.0,3.2]
};

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
    var ox=0;
    if(shudo < info.shudos[1]){
        // over right
        ox = 1;
        x = info.xrange[1];
    }
    if(shudo > info.shudos[0]){
        // over left
        ox = 2;
        x= info.xrange[0];
    }
    var oy=0;
    if(sando < info.sandos[0]){
        // over down
        oy = 1;
        y=info.yrange[0];
    }
    if(sando > info.sandos[1]){
        // over up
        oy = 2;
        y=info.yrange[1];
    }


    var map=[['','down','up'],
             ['right','right-down','right-up'],
             ['left','left-down','left-up']];

    this.drawPoint(ctx,x,y,map[ox][oy]);
},
drawPoint:function(ctx, x, y, direction){
    ctx.fillStyle = "red";
    if(direction == ''){
        ctx.beginPath();
        ctx.arc(x,y,MarkSize,0,2 * Math.PI);
        ctx.fill();
    }else{
        this.drawArrow(ctx,x,y,direction);
    }
},
/**
 * Draws an arrow with the tip at (x, y) pointing in the specified direction.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
 * @param {number} x - X coordinate of the arrow tip.
 * @param {number} y - Y coordinate of the arrow tip.
 * @param {'up'|'down'|'left'|'right'|'left-up'|'left-down'|'right-up'|'right-down'} direction - Arrow direction.
 * @param {number} size - The total length of the arrow (default 30).
 */
drawArrow:function (ctx, x, y, direction, size = 30) {
    const shaftLength = size * 0.5;
    const headLength = size * 0.3;
    const headWidth = size * 0.2;
    const shaftWidth = size * 0.07;

    const dirMap = {
        'up': [0, 1],
        'down': [0, -1],
        'left': [1, 0],
        'right': [-1, 0],
        'left-up': [Math.SQRT1_2, Math.SQRT1_2],
        'left-down': [Math.SQRT1_2, -Math.SQRT1_2],
        'right-up': [-Math.SQRT1_2, Math.SQRT1_2],
        'right-down': [-Math.SQRT1_2, -Math.SQRT1_2],
    };

    const dir = dirMap[direction];
    if (!dir) {
        console.error('Invalid direction:', direction);
        return;
    }

    const [dx, dy] = dir;
    const norm = Math.hypot(dx, dy);

    const ux = dx / norm;
    const uy = dy / norm;

    // Shaft start
    const shaftX = x + ux * shaftLength;
    const shaftY = y + uy * shaftLength;

    // Perpendicular for head width
    const px = -uy;
    const py = ux;

    ctx.beginPath();
    ctx.lineWidth = shaftWidth;
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = 'red';

    // Shaft line
    ctx.moveTo(shaftX, shaftY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Head (triangle)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + ux * headLength + px * headWidth,
        y + uy * headLength + py * headWidth
    );
    ctx.lineTo(
        x + ux * headLength - px * headWidth,
        y + uy * headLength - py * headWidth
    );
    ctx.closePath();
    ctx.fill();
}

};