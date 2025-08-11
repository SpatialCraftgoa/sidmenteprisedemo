const player = document.getElementById('youtube-icon');
const vid = document.getElementById('centeredContainer');
const closer = document.getElementById('closerBtn');
const video = document.getElementById('youtube_vid');

player.addEventListener("click", function () {
    if (vid.style.display === "block") {
        vid.style.display = "none";
        
        
        
    } else {
        vid.style.display = "block";
        $('#centeredContainer2').css('display', 'none');
       
    }
    
});
closer.addEventListener("click", function () {
    vid.style.display = "none";
    video.src = video.src;
});