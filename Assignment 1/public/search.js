typePoke = ""
function processByType(data){
    for (i = 0 ; i < data.types.length; i++)
        if(data.types[i].type.name == typePoke)
            $("main").append(`<div class = "PokeType"><a href="/profile/${data.id}"><img src="${data.sprites.front_default}" alt="${data.name}"></a></div>`)
}

function displayPokeType(by_type){
    $("main").empty();
    typePoke = by_type;
    for(i=1; i<1126; i++) {
        $.ajax({
            type: "GET",
            url : `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processByType
        })
    }

}
function setup(){
    displayPokeType($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type  = $("#poke_type option:selected").val();
        displayPokeType($("#poke_type option:selected").val())
    })

}
$(document).ready(setup)