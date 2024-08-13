let result = '';
let score = 0;
let words = []

let timer = 60;
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
        setInterval(decreasetimer, 1000);
    }

    // $input.val("")                                                          // Append result and score by clearing the div.result and reappending
    // $("div.result").text("")
    // $("body").append(`<div class = "text-center mt-5 result">
    //     <h4 class = "font-weight-bold">Result: ${result}</h4></div>`);
    // $("body").append(`<div class = "text-center mt-5 result">
    //     <h4 class = "font-weight-bold">Score: ${score}</h4></div>`);
    addScoreResult(result, score, timer, $input);

});

function decreasetimer(){
    if (timer >= 0){
        $timer.text(`Timer: ${timer}`);
        timer -= 1;    
    }else{
        $('input').val("");
        $("div.result").text(""); 
        $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">No more guesses!</h4></div>`);
    }
}

function addScoreResult(result, score, timer, $input){
    if(timer > 0){
        $input.val("");
        $("div.result").text("");
        $("body").append(`<div class = "text-center mt-5 result">
            <h4 class = "font-weight-bold">Result: ${result}</h4></div>`);
        $("body").append(`<div class = "text-center mt-5 result">
            <h4 class = "font-weight-bold">Score: ${score}</h4></div>`);
    }
}