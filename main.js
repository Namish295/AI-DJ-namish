song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1Status="";
song2Status="";
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(550,450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video,0,0,600,500);
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX,rightWristY, 20);
        song2.stop();
        if(song1Status==false)
        {
            song1.play();
            document.getElementById("songName").innerHTML="Playing Harry potter";
        }
    }
    if(scoreRightWrist>0.2)
    {
        circle(leftWristX,leftWristY, 20);
        song1.stop();
        if(song2Status==false)
        {
            song2.play();
            document.getElementById("songName").innerHTML="Playing PEter PAn";
        }
    }
}

function play()
{
    song.play();
    song.volume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist X= "+leftWristX);
        console.log("Left wrist Y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist X= "+rightWristX);
        console.log("Right wrist Y= "+rightWristY);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
    }
}