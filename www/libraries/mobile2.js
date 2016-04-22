var mobile = function(mobile){
​
	mobile.swipe = function (obj) {
		console.log(obj);
		var distance = 10;
		var time = 100; //ms
​
		var mouseX;
		var mouseY;
		obj.addEventListener('mousedown',function(e){
			// console.log(e.clientX);
			var startX = e.nativeEvent.clientX;
			var startY =  e.nativeEvent.clientY;
			console.log(startX,startY)
			// obj.addEventListener('click',doIt);
			// function doIt(e){
​
			// };
			// obj.removeEventListener('click',doIt);
​
			var moveEvent = document.addEventListener('mousemove',function(e){
				mouseX = e.clientX;
				mouseY = e.clientY;
			});
			var swipeTimeout = setTimeout(function(){
				var diffX= mouseX - startX;
				var diffY= mouseY - startY;
				document.removeEventListener('mousemove',moveEvent);
				console.log(diffX,diffY);
				var swipeX = 0;
				var swipeY = 0;
				if(Math.abs(diffX)>Math.abs(diffY)){// swiping in x /abs absolute
					if (diffX < - distance){
						swipeX = -1;
					}
					if (diffX > distance){
						swipeX = 1;
					}
				}else{
					if (diffY < - distance){
						swipeY = -1;
					}
					if (diffY > distance){
						swipeY = 1;
					}
				}
				
				
				var e = new Event('swipe');
				e.swipeX = swipeX;
                e.swipeY = swipeY;
                obj.dispatchEvent(e);
​
			},time);
		});
	}
​
	return mobile;
}(mobile || {})