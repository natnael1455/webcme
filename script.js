


let video;
let CANVAS;
let SIZE =700;


window.onload = function () {
 	main();  
}




function main(){
	CANVAS=init_canvas("myCanvas",SIZE,SIZE)
	ctx=CANVAS.getContext("2d");
	inti_camera();
	setInterval(function (){
		draw_video(ctx)}
		, 100);
}

function draw_video(ctx){
	if(video!=null){
		ctx.drawImage(video,0,0);
	}
}
function init_canvas(name,width,hieght){
	let canvas = document.getElementById(name);
	canvas.width=width;
	canvas.height=hieght;
	return canvas;
}
function inti_camera(){
	var camera_promise = navigator.mediaDevices.getUserMedia({video:true});
	camera_promise
	.then(
		function(signal){
			 video= document.createElement('video');
			video.srcObject = signal;
			video.play();
		}
	)
	.catch(
		function(err){
			alert(err.message)
		}
	);
}
