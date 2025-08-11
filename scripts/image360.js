const player = document.getElementById('button-360');
const img = document.getElementById('centeredContainer2');
const closer = document.getElementById('closerBtn2');
var sl = document.getElementById('myYouTubeIframe');

player.addEventListener("click", function () {
    if (img.style.display === "block") {
        img.style.display = "none";
    } else {
        img.style.display = "block";
        $('#centeredContainer').css('display', 'none');
    }
});

closer.addEventListener("click", function () {
    img.style.display = "none";
});