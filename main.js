song1 = "";
song2 = "";


function preload() {

    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
leftWirstX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
scoreleftWrist=0;
ScorerightWrist=0;

function setup() {

    canvas = createCanvas(0, 0, 600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {

    console.log('posenet is Initialized')
}

function gotPoses(results) {

    if(results.length > 0) 
    {
        console.log(results);
        ScorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist= results[0].pose.keypoints[9].score;
        console.log("ScorerightWrist =" + ScorerightWrist + "scoreleftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }
}

function draw(){
    
    image(video, 0, 0,600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("FF0000");
    stroke("FF0000");

    if(ScorerightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

    if( rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("Speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5)
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1x";
        song.rate(1)
    }
    else if(rightWristY >100 && rightWristY <=300)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5)
    }
    else if(rightWristY >100 && rightWristY <=400)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2x";
        song.rate(2)
    }
    else if(rightWristY >100 && rightWristY <=500)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5)
    }

    }

    if(scoreLeftWrist > 0.2) { 
      circle(leftWristX,leftWristY,20); song1.stop(); 
    
      if(song2_status == false) { 
            
     song2.play(); 
     document.getElementById("song").innerHTML = "Playing - Peter Pan Song" } }
}

function play() {

    song.play();
    song.setVolume(1);
    song.rate(1);
}

