function changeHeight() {
    //declare height variables for comparison
    var windowH = $(window).height();
    
    var contentH = $("#content").height();
    
    //compare if window is larger than content, resize content accordingly
   if (windowH > contentH){
        var newHeight = $(document).height() - $("#navbg").height() - $("#footer").height(); 
        document.getElementById('content').style.minHeight = newHeight.toString() + "px";
    }
    //if the window is resized, resize the content div
    $(window).resize( function(){
        var newHeight = $(document).height() - $("#navbg").height() - $("#footer").height(); 
        document.getElementById('content').style.minHeight = newHeight.toString() + "px";
    });
    //change CSS to make html visible once resizing happens
    //otherwise the display jumps around while loading
    document.getElementsByTagName("html")[0].style.visibility = "visible";
}
const resize = setInterval(changeHeight, 500);
    

