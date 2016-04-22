
var im = function(mobile) {

    im.shuffle = function(array) {
        if (array == null) return;
        var i = array.length, j, temp;
        if (i == 0) return array;
        while(--i) {
            j = Math.floor(Math.random()*(i+1));
            temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
        return array;
    }

    im.swipe = function(obj) {
        console.log(obj);
        var distance = 10;
        var time = 100; // ms
        var mouseX;
        var mouseY;
        obj.addEventListener("mousedown", function(e) {
            console.log(e.clientX);
            var startX = e.clientX;
            var startY = e.clientY;


            var moveEvent = document.addEventListener("mousemove", getMouse);
            function getMouse(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };
            var swipeTimeout = setTimeout(function() {
                var diffX = mouseX - startX;
                var diffY = mouseY - startY;
                document.removeEventListener("mousemove", getMouse);
                console.log(diffX, diffY);
                var swipeX = 0;
                var swipeY = 0;
                if (Math.abs(diffX) > Math.abs(diffY)) { // swiping in x
                    if (diffX <-distance) {
                        swipeX = -1
                    }
                    if (diffX > distance) {
                        swipeX = 1;
                    }
                } else {
                    if (diffY <-distance) {
                        swipeY = -1
                    }
                    if (diffY > distance) {
                        swipeY = 1;
                    }
                }
                var e = new Event("swipe");
                e.swipeX = swipeX;
                e.swipeY = swipeY;
                obj.dispatchEvent(e);
                // if (Math.abs(diffX))

            }, time);

        })
    }
    return im;
}(mobile || {})
