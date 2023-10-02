// buttons
const strikeButton = document.getElementById("strike")
const resetButton = document.getElementById("reset")

// score
const $team1Score = document.getElementById("score-team1")
const $team2Score = document.getElementById("score-team2")

// wickets
const $team1Wickets = document.getElementById("wickets-team1")
const $team2Wickets = document.getElementById("wickets-team2")


// Audio
const strikeAudio = new Audio("http://bit.ly/so-ball-hit")
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")


// everything 0 
var team1Score = 0;
var team1Wickets = 0;
var team1BallsFaced = 0;

var team2Score = 0;
var team2Wickets = 0;
var team2BallsFaced = 0;

var turn = 1;

const possibleOutcomes = [0,1,2,3,4,6,"W"];

function gameOver()
{
    gameOverAudio.play();
    if(team1Score > team2Score)
        alert("IND Wins!")
    else if(team2Score > team1Score)
        alert("PAK Wins!")
    else if(team1Score === team2Score)
        alert("It is another SUPER OVER!")

}

function updateScore() 
{
    $team1Score.textContent = team1Score;
    $team2Score.textContent = team2Score;

    $team1Wickets.textContent = team1Wickets;
    $team2Wickets.textContent = team2Wickets;
}

resetButton.onclick = () => {
    window.location.reload();
}

strikeButton.onclick = () => {

    // for audio
    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();

    // generate random values
    const randomElement = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

    if(turn === 2)
    {
        //increase no of balls faced
        team2BallsFaced++;

        //update score for the ball
        document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`)
        .textContent = randomElement;
        console.log(randomElement);
        
        if(randomElement === "W")
        {
            team2Wickets++;
        }
        else
        {
            team2Score += randomElement;
        }

        // game over condition
        if(
            team2BallsFaced === 6 ||
            team2Wickets === 2 ||
            team2Score > team1Score
        )
        {
            turn = 3;
          
            gameOver();
        }
        else{
            updateScore();
        }
    }

    if(turn === 1)
    {
        //increase no of balls faced
        team1BallsFaced++;

        //update score for the ball
        document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`).textContent = randomElement;
    
        if(randomElement === "W")
        {
            team1Wickets++;
        }
        else
        {
            team1Score += randomElement;
        }


        // game over condition
        if(
            team1BallsFaced === 6 ||
            team1Wickets === 2 
        )
        {
            turn = 2;
            updateScore();
        }
        else{
            updateScore();
        }
    }

}






