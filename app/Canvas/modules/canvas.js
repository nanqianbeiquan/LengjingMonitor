var canvas_current;
var area=[];

var create_canvas=function(id){
    canvas_current=document.createElement("canvas");
    document.getElementById(id).appendChild(canvas_current);
    return this;
}

var draw_rect=function(x1,y1,x2,y2){
    var ctx=canvas_current.getContext("2d");
    
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.rect(20,20,150,100);
    ctx.stroke();
    return this;
}

var draw_arc_rect=function(x1,y1,x2,y2,r){
    var ctx=canvas_current.getContext("2d"); 
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.moveTo(x1,y2-r);
    ctx.lineTo(x1,y1+r);
    ctx.lineWidth=1.5;
    ctx.arcTo(x1,y1,x1+r,y1,r); // 创建弧
    ctx.lineTo(x2-r,y1);
    ctx.arcTo(x2,y1,x2,y1+r,r); // 创建弧
    ctx.lineTo(x2,y2-r);
    ctx.arcTo(x2,y2,x2-r,y2,r); // 创建弧
    ctx.lineTo(x1+r,y2);
    ctx.arcTo(x1,y2,x1,y2-r,r); // 创建弧
    ctx.stroke();
    return this;
}

export default{
    Create:create_canvas,
    DrawRect:draw_rect,
    DrawArcRect:draw_arc_rect
}