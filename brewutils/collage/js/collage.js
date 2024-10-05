var MXOFF=10;
var MYOFF =10;
var SelectedThumb=null;
var DragDrop={
    img:null,
    thumb:null
};

var PaperDimension={
    a4:[210,297],
    letter:[215.9,279.4]
};

function parseMargin(str){
// Top, right, bottom, left

/* Apply to all four sides */
//margin: 1em;

/* vertical | horizontal */
//margin: 5% auto;
/* top | horizontal | bottom */
// margin: 1em auto 2em;
/* top | right | bottom | left */

    var values= str.split(" ");
    var V=[];
    $.each(values,function(i,v){
        V[i] = parseFloat(v);
    });
    if(V.length ==1){
        return { top:V[0], right:V[0], bottom:V[0], left:V[0]};
    }else if(values.length ==2){
        return { top:V[0], right:V[1], bottom:V[0], left:V[1]};
    }else if(values.length ==3){
        return { top:V[0], right:V[1], bottom:V[2], left:V[1]};
    }else{
        return { top:V[0], right:V[1], bottom:V[2], left:V[3]};
    }
}
function savePDF(images,row,col,paper,page,label,filename){
    var dim=PaperDimension[paper];

    var doc= new jsPDF({orientation: "portrait",unit:"mm",format:"[" + dim[0] +"," + dim[1] +"]"});
    var w=(doc.internal.pageSize.getWidth() - page.left - page.right) /col;
    var h=(doc.internal.pageSize.getHeight() - page.top - page.bottom) /row;
    var iw = w - label.left - label.right;
    var ih = h - label.top - label.bottom;
    var i=0;
    $.each(images,
        function(){ 
            var x = page.left + w * Math.floor(i%col) + label.left;
            var y = page.top  +  h * Math.floor(i/col) + label.top; 
            if(typeof images[i] != "undefined") doc.addImage(images[i], 'JPEG', x ,y ,iw,ih);     
            i++;
        });

        //var filename= $("#filename").val().trim();

        doc.save(filename);
    alert("saved as "+ filename);
}

    
var Canvas={
images:[],
paper:"a4",
row:4,
col:2,
init:function(div){
    var t=this;
    t.div = div;
    t.PM=parseMargin("0");
    t.LM=parseMargin("0");

    // draw size
    t.setPaper(t.paper);

    $(t.div).click(function(e){
        var mouseX = e.pageX - $(t.div).offset().left;
        var mouseY = e.pageY - $(t.div).offset().top;    
        t.dropAt(mouseX,mouseY,SelectedThumb);
    });
    $(t.div).mouseup(function(e){
        console.log("mouseup");
    });
},
dropAt:function(mouseX,mouseY,img){
    var t=this;
    console.log("X:" + mouseX +" Y:" + mouseY);
    if(mouseX < t.PM.left || mouseX > (t.width - t.PM.right)) return;
    if(mouseY < t.PM.top || mouseX > (t.height - t.PM.bottom)) return;

    var width = (t.width - t.PM.left - t.PM.right)/t.col;
    var height = (t.height - t.PM.top - t.PM.bottom)/t.row;

    var col = Math.floor( (mouseX - t.PM.left) /width);
    var row = Math.floor( (mouseY - t.PM.top)/height );
    console.log("col:" + col +" row:" +  row);
  
    if(img){
        t.fillGrid(row,col,$(img).find(".thumbnail")[0]);
        t.images[row * t.col +col ]= $(img).find(".thumbnail")[0];
    }
},
fillGrid:function(row,col,img){
    var t=this;
    var ctx = $(t.div)[0].getContext('2d');
    var width = (t.width - t.PM.left - t.PM.right)/t.col;
    var height = (t.height - t.PM.top - t.PM.bottom)/t.row;

    var x=  t.PM.left + col * width  +t.LM.left;
    var y = t.PM.top  + row * height +t.LM.top; 

    var w= width -(t.LM.left +t.LM.right);
    var h= height -(t.LM.top + t.LM.bottom);
    ctx.drawImage(img, x,y,w,h);
},
frame:function(){
    var t=this;
    var ctx = $(t.div)[0].getContext('2d');
    // clear
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,t.width,t.height);
    ctx.strokeRect(t.PM.left,t.PM.top,t.width - t.PM.left - t.PM.right ,t.height - t.PM.top - t.PM.bottom );
},
grid:function(){
    var t=this;
    var ctx = $(t.div)[0].getContext('2d');
    var width = (t.width - t.PM.left - t.PM.right)/t.col;
    var height = (t.height - t.PM.top - t.PM.bottom)/t.row;
    // draw vertical lines
    for(var i=1;i< t.col;i++){
        ctx.beginPath();
        ctx.setLineDash([3, 1]);
        ctx.moveTo(t.PM.left + width * i ,t.PM.top);
        ctx.lineTo(t.PM.left + width * i ,t.height - t.PM.bottom);

        ctx.stroke();
    }

    // draw horizontal lines
    for(var i=1;i< t.row;i++){
        ctx.beginPath();
        ctx.setLineDash([2, 1]);
        ctx.moveTo(t.PM.left ,            t.PM.top + height * i);
        ctx.lineTo(t.width - t.PM.right,  t.PM.top + height * i);
        ctx.stroke();
    }
},
setPaper:function(paper){
    var t=this;
    t.paper=paper;
    var dim=PaperDimension[paper];

    t.width = Math.round(dim[0] *2);
    t.height = Math.round(dim[1] *2);

    $(t.div).attr("width",t.width);
    $(t.div).attr("height",t.height);

    // draw frame
    t.frame();
    t.grid();
    t.images=[];
},
setCut:function(col,row){
    var t=this;
    t.col =col;
    t.row= row;

    t.frame();
    t.grid();
    t.images=[];
},
redraw:function(){
    var t=this;
    t.frame();
    t.grid();
    // redraw all
    for(var r=0;r<t.row;r++){
        for(var c=0;c<t.col;c++){
            var idx = r * t.col + c;
            if(typeof t.images[idx] != "undefined") t.fillGrid(r,c,t.images[idx]);
        }
    }
},
setLabelMargin:function(margin){
    var t=this;
    t.LM=margin;
    t.redraw();
},
setPaperMargin:function(margin){
    var t=this;
    t.PM=margin;
    t.redraw();
}
};
$(function(){
    $("#paper-size").change(function(){
        Canvas.setPaper($("#paper-size").val());
    });

    $("#paper-cut-row").change(function(){
        Canvas.setCut(parseInt($("#paper-cut-col").val()),parseInt($("#paper-cut-row").val()));
    });
    $("#paper-cut-col").change(function(){
        Canvas.setCut(parseInt($("#paper-cut-col").val()),parseInt($("#paper-cut-row").val()));
    });

    $("#paper-margin").change(function(){
        Canvas.setPaperMargin(parseMargin($("#paper-margin").val()));
    });

    $("#label-margin").change(function(){
        Canvas.setLabelMargin(parseMargin($("#label-margin").val()));
    });

    $("#export-pdf").click(function(){
        var images=[];
        $.each(Canvas.images,function(i,img){
            if(typeof img != "undefined"){
                images[i] = new Image();
                images[i].src=img.src;
            }
        });
        savePDF(images,Canvas.row,Canvas.col,Canvas.paper,Canvas.PM,Canvas.LM,"labels.pdf");
    });

    Canvas.init("#paper");

    var thumbTemplate = $("#thumbmail-list li").remove();


    function addImage(img){
        var thumb= $(thumbTemplate).clone(true);
        $(thumb).find(".thumbnail").attr("src",img);
        $("#thumbmail-list").append(thumb);
        $(thumb).click(function(e){
            e.preventDefault();
            if(SelectedThumb) $(SelectedThumb).find(".card").removeClass("selected");
            $(thumb).find(".card").addClass("selected");
            SelectedThumb = thumb;
          });
                    
        $(thumb).mousedown(function(e){
            e.preventDefault();
            var mImg=$("<img>");
            mImg.attr("src",img);
            mImg.addClass("moving");
            mImg.css("left",e.clientX -MXOFF);
            mImg.css("top",e.clientY - MYOFF);
            mImg.css("width", $(e.target).width() );
            mImg.css("height", $(e.target).height() );

            $(document.body).append(mImg);

            DragDrop.thumb=thumb;
            DragDrop.img=mImg;
        });
        }

        document.body.addEventListener('mousemove', function (e) {
            if(DragDrop.img != null){
                e.preventDefault();
                DragDrop.img.css("left",e.clientX -MXOFF);
                DragDrop.img.css("top",e.clientY - MYOFF);
            }
        });

        document.body.addEventListener('mouseup',function(e){
            if(DragDrop.img != null){
                console.log("up");
                e.preventDefault();
                DragDrop.img.remove();
                DragDrop.img = null;

                var mouseX = e.pageX - $(Canvas.div).offset().left;
                var mouseY = e.pageY - $(Canvas.div).offset().top;    
                Canvas.dropAt(mouseX,mouseY,DragDrop.thumb);
        
            }
        });

    function readImage(file) {
        // Check if the file is an image.
        if (file.type && !file.type.startsWith('image/')) {
          console.log('File is not an image.', file.type, file);
          return;
        }
      
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          addImage(event.target.result);
        });
        reader.readAsDataURL(file);
      }
    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        //console.log(files);
        $.each(files,function(i,file){
            readImage(file);
        });
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles);
        return false;
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
        return false;
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }


});