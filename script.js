


let video;
let CANVAS;
let SIZE =700;
let red = 100;
let blue=100;
let green=100;


window.onload = function () {
	const redinput = document.getElementById("red")
	const greeninput = document.getElementById("Green")
	const blueinput = document.getElementById("Blue")
	redinput.addEventListener('change', (event) => {
		red=event.target.value
	  });

	greeninput.addEventListener('change', (event) => {
		green=event.target.value
	  });

	blueinput.addEventListener('change', (event) => {
		blue=event.target.value
	  });
 	main();  
}




function main(){
	CANVAS=init_canvas("myCanvas",SIZE,SIZE)
	ctx=CANVAS.getContext("2d");
	inti_camera();
	setInterval(function (){
		draw_video(ctx)}
		, 10);
}

function draw_video(ctx){
	if(video!=null){
		let min=Math.min(video.videoWidth,video.videoHeight);
		let sx = (video.videoWidth-min)/2;
		let sy = (video.videoHeight-min)/2;
		ctx.drawImage(video,sx,sy,min,min,0,0,SIZE,SIZE);
		effects(ctx);
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

function effects(ctx){
   let imgData=ctx.getImageData(0,0,SIZE,SIZE)
   let data=imgData.data;
   for(let y=0;y<SIZE;y++){
	   for(let x=0;x<SIZE;x++){
			let pixel_data = pixel(data,x,y);
			data[(y*SIZE+x)*4+0]=colorvalue(pixel_data.red,red);
			data[(y*SIZE+x)*4+1]=colorvalue(pixel_data.green,green);
			data[(y*SIZE+x)*4+2]=colorvalue(pixel_data.blue,blue);

	   }
   }
   let hest_array= new Array(2**24).fill(0);
   ctx.putImageData(imgData,0,0);
}

function pixel(data,x,y){
	return {
			red:data[(y*SIZE+x)*4+0],
			green:data[(y*SIZE+x)*4+1],
			blue:data[(y*SIZE+x)*4+2],
			alpha:data[(y*SIZE+x)*4+3],
		}
}

function colorvalue(value,cof){
	let result = value*cof/100;
	if(result >255){
		result = 255;
	}
	return (Math.round(result));
}

function singleColor(r,g,b){
	let x=r;
	x=(x<<8)+g;
	x =(x<<8)+b;
	return x; 
}