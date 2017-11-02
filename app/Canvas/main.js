import $ from 'jquery';
import canvas from './modules/canvas';


$(document).ready(function () {
    init_page();
    console.log("ready");
})

var init_page=function(){
    canvas
    .Create("canvas")
    .DrawArcRect(10,10,100,100,10)
    .DrawRect();
}