let result = '';

$('form').on("submit", async function(e) {
    e.preventDefault();
    let $input = $('input');
    let $guess = $input.val();
    console.log($guess);
    result = await axios.get("/guess", {params : {guess : $guess}}) // difference using GET/POST?
    result = result.data;
    console.log(result);
    $input.val("")
    $("div.result").text("")
    $("body").append(`<div class = "text-center mt-5 font-weight-bold result">${result}</div>`);
});