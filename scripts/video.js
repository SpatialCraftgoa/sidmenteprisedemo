// Get references to the player, video container, and close button
const player = document.getElementById("player");
const videoDiv = document.getElementById("video_starter");
const videoclose = document.getElementById("vidcloser");
const video = player.querySelector("video");

// Add an event listener to the video container
videoDiv.addEventListener("click", function() {
    // Check if the player is currently displayed
    if (player.style.display === "flex") {
         // Display draggable elements and hide the player, pausing and resetting the video
        $('#draggable2').css('display', 'block');//display  the landmarks list 
        $('#draggable').css('display', 'block');//display  the layers list 
        
        player.style.display = "none"; // Hide the player if it's visible
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset the current time of the video to 0
        video.src = ""; // Set the video source to an empty string to stop the video completely
    } else {
         // Show the player, and set the video source to the specified URL, then play the video
        player.style.display = "flex"; // Show the player if it's hidden
        player.style.justifyContent = 'center'; // Horizontally center the content
        player.style.alignItems = 'center'; // Vertically center the content
        $('#draggable2').css('display', 'none');//hide the landmarks list 
        $('#draggable').css('display', 'none');//hide the layers list 
        //$('#threesixtypic').css('display', 'none');
        video.src = "https://testrastercog.s3.ap-south-1.amazonaws.com/Your+dream+home+nestled+amidst+a+sea+of+emerald+green+trees..mp4"; // Set the video source to the original URL
        video.play(); // Play the video
    }
});
// Add an event listener to the close button
videoclose.addEventListener("click", function() {
     // Hide the player, and pause, reset, and stop the video
    player.style.display = "none";
    $('#draggable2').css('display', 'block');
        $('#draggable').css('display', 'block');
    video.pause(); // Pause the video when the close button is clicked
    video.currentTime = 0; // Reset the current time of the video to 0
    video.src = ""; // Set the video source to an empty string to stop the video completely
});
