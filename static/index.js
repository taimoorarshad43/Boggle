let result = '';
let score = 0;
let words = []
let highscore = 0;
let timesplayed = 0;

// let timer = 60;
let timer = 5;
let $timer = $('div.timer h4');

let timeractive = false;                                                    // Helps with not calling decreaseTimer function twice

$('form').on("submit", async function(e) {
    e.preventDefault();                                                     // Prevent form from refreshing page

    let $input = $('input');                                                // Get the guessed value
    let $guess = $input.val();
    $guess = $guess.toLowerCase();
    // console.log($guess);

    let data = await axios.get("/guess", {params : {guess : $guess}});      // Get the validity of the word from server
    data = data.data;
    result = data[0];

    if(result === 'ok' && !words.includes($guess)){                         // Check for redundant words and alter result if word already entered.
        words.push($guess);
        score += data[1];
    }else if(result === 'ok'){
        result += ' - already entered'
    };

    // console.log(result);
    // console.log(score);

    if (timeractive === false){
        console.log("timer active")
        timeractive = true;
        decreasepagetimer = setInterval(decreasetimer, 1000);
    }

    addScoreResult(result, score, timer, $input);

});

$('button#restart').on("click", function(){                                 // Reset everything
    score = 0;
    words = [];
    result = '';
    // timer = 60;
    timer = 5;
    timeractive = false;
    $('input').val("");
    $("div.result").text("");
    $timer.text("");
})

async function sendScore(score){                                            // Sends score to server
    console.log("score sent");
    let serverscore = await axios.post("/highestscore", {score : score});
    return serverscore;
}

async function decreasetimer(){                                             // Decrements timer var by one sec with a setInterval call
    if (timer >= 0){
        $timer.text(`Timer: ${timer}`);
        timer -= 1;    
    }else{
        $('input').val("");
        $("div.result").text("");
        $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">No more guesses!</h4></div>`);
        $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">Final Score: ${score}</h4></div>`);

        const scoredata = await sendScore(score);
        [highscore, timesplayed] = scoredata.data;
        
        $('div.timesplayed').text(`Times Played: ${timesplayed}`);          // Append highscore and timesplayed to page
        $('div.highscore').text(`High Score: ${highscore}`);

        clearInterval(decreasepagetimer);                                       // To stop the constant score sending and timer decrementing
    }
}

function addScoreResult(result, score, timer, $input){                      // Adds score and result to the web page
    if(timer > 0){
        $input.val("");
        $("div.result").text("");
        $("body").append(`<div class = "text-center mt-5 result">
            <h4 class = "font-weight-bold">Result: ${result}</h4></div>`);
        $("body").append(`<div class = "text-center mt-5 result">
            <h4 class = "font-weight-bold">Score: ${score}</h4></div>`);
    }
}