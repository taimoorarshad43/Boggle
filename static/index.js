let result = '';
let score = 0;
let words = []

// let timer = 60;
let timer = 5;
let $timer = $('div.timer h4');

let timeractive = false;                                                    // Helps with not calling decreaseTimer function twice

$('form').on("submit", async function(e) {
    e.preventDefault();                                                     // Prevent form from refreshing page

    let $input = $('input');                                                // Get the guessed value
    let $guess = $input.val();
    $guess = $guess.toLowerCase();
    console.log($guess);

    let data = await axios.get("/guess", {params : {guess : $guess}});      // Get the validity of the word from server
    data = data.data;
    result = data[0];

    if(result === 'ok' && !words.includes($guess)){                          // Check for redundant words
        words.push($guess);
        score += data[1];
    }else if(result === 'ok'){
        result += ' - already entered'
    };

    console.log(result);
    console.log(score);

    if (timeractive === false){
        timeractive = true;
        decreasetimer = setInterval(decreasetimer, 1000);
    }

    addScoreResult(result, score, timer, $input);

});

function sendScore(score){
    console.log("score sent");
    axios.post("/highestscore", {score : score});
}

function decreasetimer(){                                                   // Decrements timer var with a setInterval call
    if (timer >= 0){
        $timer.text(`Timer: ${timer}`);
        timer -= 1;    
    }else{
        $('input').val("");
        $("div.result").text("");
        $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">No more guesses!</h4></div>`);
        $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">Score: ${score}</h4></div>`);
        sendScore(score);
        clearInterval(decreasetimer);                                       // Stop the constant score sending and timer decrementing
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