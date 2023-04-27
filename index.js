/* Starting variables */
let arrUserButtonOrder = [];
let arrCompButtonOrder = [];
let buttonArr = document.querySelectorAll(".btn");
let counter = 0;
let started = false;

/* Game start */
$(document).keypress(function () { 
    if(started === false)
    {
        started = true;
        compMove();
    }
});

/* For tracking user clicks and animating clicked button */
$(".btn").click(function () { 
    arrUserButtonOrder.push($(this).attr("id"));
    buttonPressed(this);
    playSound($(this).attr("id"));
    runCheck(arrUserButtonOrder.length-1);
});

/* For tracking computer clicks and animating clicked buttons */
function compMove()
{
    let randomNum = Math.floor(Math.random()*buttonArr.length);
    let computerChoice = buttonArr[randomNum];
    arrCompButtonOrder.push($(computerChoice).attr("id"));
    counter++;
    $("h1").text("Level "+counter);
    playSound($(computerChoice).attr("id"));
    $("#"+$(computerChoice).attr("id")).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

/* Function to generate clicking animation */
function buttonPressed(butn)
{
    $(butn).addClass("pressed");
    setTimeout(function() {
        $(butn).removeClass("pressed");
    }, 100);
}

/* Check if the patterns match up */
function runCheck(userLength)
{
    if(arrUserButtonOrder[userLength] === arrCompButtonOrder[userLength])
    {
        if(userLength === arrCompButtonOrder.length-1)
        {
            arrUserButtonOrder=[];
            setTimeout(function() {
                compMove();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("h1").text("Game Over. Press Any Key to Restart.");
        startOver();
    }
}

/* plays the sound for the respective button */
function playSound(soundBtn)
{
    let audio = new Audio("sounds/"+soundBtn+".mp3");
    audio.play();   
}

/* reset game */
function startOver()
{
    arrCompButtonOrder = [];
    arrUserButtonOrder = [];
    started = false;
    counter = 0;
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");;
    }, 200);
}


