typePoke = " ";
abilityPoke = " " ;
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
function showPoke_name(data){
    console.log(data);
    reveal_pokemon = '';
    reveal_pokemon += `<div class="img-container" id="pokeReveal"> <b>This Pokemon Name:</b> ${data.name} <br>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    <br>Click on the Pokemon to reveal it's stats!</div>`
    $("main").html(reveal_pokemon);
}

function showPoke_ability(data){
    console.log(data)
    console.log(data.name)
    console.log(data.pokemon)
    console.log(data.pokemon.length) //for loop here
    show_pokemon = '';
    
    // for(i=0; i<data.pokemon.length; i++){
    //     show_pokemon +=
    // }
    
}

function alertError(){
    alert("Wrong Input!")
}
function searchPokeName(){
    // console.log("test")
    var searchName = $("#name_input").val()
    console.log(JSON.stringify(searchName))
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon/${searchName}`,
        "type": "GET",
        "success": showPoke_name,
        error: alertError
    })
}
function searchPokeAbility(){
    console.log("This button was pressed")
    var searchAbility = $("#ability_input").val();
    abilityPoke = searchAbility
    $.ajax({
        "url": `https://pokeapi.co/api/v2/ability/${abilityPoke}`,
        "type": "GET",
        "success": showPoke_ability,
        error: alertError
    })
    

    // console.log(typeof(searchHeight) )


}
function setup(){
    displayPokeType($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type  = $("#poke_type option:selected").val();
        displayPokeType($("#poke_type option:selected").val())
    })
    $("#name").click(searchPokeName)
    $("#ability").click(searchPokeAbility)

}
$(document).ready(setup)