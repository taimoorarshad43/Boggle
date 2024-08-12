let result = '';
let score = 0;
let words = []

let timer = 60;
let $timer = $('div.timer h4')

$('form').on("submit", async function(e) {
    e.preventDefault();

    let $input = $('input');                                                // Get the guessed value
    let $guess = $input.val();
    console.log($guess);

    let data = await axios.get("/guess", {params : {guess : $guess}})       // Get the validity of the word from server
    data = data.data;
    result = data[0];

    if(result == 'ok' && !words.includes($guess)){                          // Check for redundant words
        words.push($guess);
        score += data[1];
    }else if(result == 'ok'){
        result += ' - already entered'
    };

    console.log(result);
    console.log(score);

    $input.val("")                                                          // Append result and score by clearing the div.result and reappending
    $("div.result").text("")
    $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">Result: ${result}</h4></div>`);
    $("body").append(`<div class = "text-center mt-5 result">
        <h4 class = "font-weight-bold">Score: ${score}</h4></div>`);
});

function decreasetimer(){
    $timer.text(`Timer: ${timer}`)
    timer -= 1
}
