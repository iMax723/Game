
window.addEventListener("load", function() {

	var stageW;
	var stageH;
	var ready = false;
	var resize;
	var orientation;

	var imagePath = "img/";
    var manifest =[{id:"backing",src:"bear.png"}];
    var preload = new createjs.LoadQueue(false, imagePath);
    preload.loadManifest(manifest);
    preload.on("complete",game);

    function game(){
        
        var backing = new createjs.Bitmap(preload.getResult("backing"));
        backing.setTransform(0,0,500,500);
        stage.addChildAt(backing);
    };
    console.log("good");


	makeCanvas();



	var stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver(10);  // leave out if mobile
	createjs.Touch.enable(stage, true);
	sizeStage();



	





		
	stage.addChild(bitmap);

	// end template header
	//------------------------------------------

	var cols = 7;
	var rows = 7;
	var tileColor = "#314c5c";
	var letterColor = "#c4575c";

	var points = 0;
	var bonus = 100;

	var total = cols * rows;

	console.log("hello");


	////////////////////////////LETTER/////////////////////////////////////////

	var alphabet = "虫角刀牛人八勹匕冫卜厂刀刂儿二匚阝丷几卩冂凵人亻入十厶亠匸讠廴又";
	var words = ["虫角刀牛","",""];
	// var alphabet = "ABCDFGOUOUIOIUUIOIU";
	// var words = ["CAT","DOG","FISH"];
	var letters = [];
	for (var i=0; i<words.length; i++){

		word = words[i];
		var split = word.split("");
		//把词转化成array
		console.log(split);
		
		letters = letters.concat(split);
		//

		

	}
	console.log(letters);

	var add = total-letters.length;

	//letters.length 是真正目标字母之外的随机字母

	for (i=0; i<add; i++){
		letters.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)));
		//charAt代表特定位置
		console.log(letters.length);
		
		mobile.shuffle(letters);


	}



	////////////////////////////TILE//////////////////////////////////////////
	var tiles = new createjs.Container();
	stage.addChild(tiles);

	var spacing = stageW*.007;
	var size = (stageW*.5-spacing*(cols-1))/cols;
	var tile,backing,letter;
	// tiles.x = stageW/2;
	for( i=0; i<total; i++){
		// if (i == 6 || i == 7 || i == 8 || i == 11 || i == 12 || i == 13 || i == 16 || i == 17 || i == 18) continue;
				var col = i%cols;
		var row = Math.floor(i/cols);

		if ( row > 0 && row < rows-1 ){

			if( col>0 && col < cols-1 ){

				continue;
			}
		};



		console.log(i);
		tile = new createjs.Container();
		tile.mouseChildren = false;
		//mouseAble 在此loop内 
		backing = new createjs.Shape();
		backing.graphics.f(tileColor).rr(0,0,size,size,size*.25);
		//间隙大小 乘系数
		tile.addChild(backing);
		tiles.addChild(tile);

		//tile.x = (size + spacing) * i
		//将所有tile横排 如果换成y则竖排

		// var col = i%cols;
		// var row = Math.floor(i/cols);

		// if ( row > 0 && row < rows-1 ){

		// 	if( col>0 && col < cols-1 ){

		// 		continue;
		// 	}
		// }

		tile.x = (size + spacing) * col;
		//不会一直排下去 将重叠放置
		tile.y = (size + spacing) * row;
		//将重叠的tile换行去下一行

		tile.letter = letters[i];

		var letter = new createjs.Text(tile.letter, size*.65 + "px impact",letterColor);
		letter.textAlign = "center";
		letter.textBaseline = "middle";
		tile.addChild(letter);
		letter.x = letter.y = size/2;
	}
	tiles.x = (stageW-tiles.width)/2;
	tiles.y = stageW*.1;

	console.log(tiles);

	tiles.cursor = "pointer";
	tiles.on("mousedown",function(e){
		if(answer.text == "SWIPE TO HINTS") answer.text = "";
		answer.text += e.target.letter;
		//answer.text = e.target.letter; 则为单字


		console.log(e.target.letter);
		stage.update();
	})

	////////////////////////////TRAY//////////////////////////////////////////
	var tray = new createjs.Container();

	tray.height = stageH*.15;
	// tray.width = stageH*.55;
	stage.addChild(tray);

	var trayBacking = new createjs.Shape();
	trayBacking.graphics.f("#314c5c").dr(0,0,stageW,stageH*.15);
	tray.addChild(trayBacking);


	var answer = new createjs.Text("SWIPE TO HINTS", size*.6 + "px impact", letterColor)
	
	answer.textAlign = "center";
	answer.textBaseline = "middle";
	tray.addChild(answer);
	answer.x = stageW/2;
	answer.y = tray.height/2;


	tray.y = stageW*0.95;

	tray.cursor = "pointer";

	mobile.swipe(tray);
	tray.on("swipe",function(e){
		if (e.swipeX != -1) return;
		//如果不是负向则执行下列
		console.log(e.swipeX);

		createjs.Tween.get(answer)
			.to({x:stageW/2 + e.swipeX*stageW*2 },500)
			.call(function(){
///////////////////////Score////////////////////////////////////////////	



				if(words.indexOf(answer.text) >= 0){

					console.log("HINTS")

					points += bonus;
					console.log(points);

					


					//indexOf 检索array中的相
				}

				answer.text = "";
				answer.x = stageW/2;
				stage.update();

				createjs.Ticker.off("tick",stage);


			});

		var tick = createjs.Ticker.on("tick",stage);


	});

//////////////////////////ticker////////////////////


/////////////////counter///////////

var counter = 50;
var countText = new createjs.Text(counter, "100px" + " arial", letterColor);
stage.addChild(countText);


var array = [];

var numString = "1234567";





	////////////////////////////RESIZE////////////////////////////////////////

	resize = function() {
		// here is where we put code to resize

		stage.update();
	}

	stage.update();
	ready = true;

	// ----------------------------------------------
	// start template footer
	function makeCanvas() {
		// make a canvas tag and apply attributes for id, width and height
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", "myCanvas");

		// get maximum size for canvas
		// note: iOS6 does not work from loading icon unless keep canvas within device size
		// thank you apple for this and many other days of hell
		largest = Math.max(window.innerWidth, screen.width, window.innerHeight, screen.height);
		if (!/ip(hone|od|ad)/i.test(navigator.userAgent)) largest *= 3; // handle up to three monitors
		canvas.setAttribute("width", largest);
		canvas.setAttribute("height", largest);

		// add our canvas tag
		document.body.appendChild(canvas);

		// stop the canvas from moving when certain keys are pressed (pgdwn, pgup, arrows, home, end)
		// and stop scrollwheel from moving page
		var a = function(e) {
			if (!e) e = event;
			if (e.keyCode && (e.keyCode >= 32 && e.keyCode <= 40)) e.preventDefault();
		}
		var b = function(e) {
			if (!e) e = event;
			e.preventDefault();
		}
		var c = b;
		window.addEventListener("keydown", a);
		window.addEventListener("mousewheel", b);
		window.addEventListener("DOMMouseScroll", c);
		window.addEventListener('resize', function() {
			sizeStage();
			if (/android|nexus/i.test(navigator.userAgent)) {
				setTimeout(function() {
					sizeStage();
				}, 500); // to catch delayed screen sizes
			}
		});
	}

	function sizeStage() {
		// earlier than IE9 does not have innerWidth
		// inner is better on mobile when zoomed so can't always use client
		// ternary operator
		stageW = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
		stageH = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;

		// if wider than high then we have horizontal (or landscape)
		orientation = (stageW>stageH) ? "horizontal" : "vertical";

		if (stage) stage.setBounds(0,0,stageW,stageH);
		if (ready) resize();
	}
});
