//variable to store the room id
choosedRoomId = '';
chooseTicketId = '';

//get the choosed GYM
function chooseGym(element){
    var allCards = document.querySelectorAll('.custom-card');

    for(i=0; i<allCards.length; ++i)
    {
        allCards[i].classList.remove('choosed');

    }
    element.classList.add('choosed');
    choosedRoomId = 'test';
}

//get the choosed ticket
function chooseTicket(element){
    var allCards = document.querySelectorAll('.custom-card');

    for(i=0; i<allCards.length; ++i)
    {
        allCards[i].classList.remove('choosed');

    }
    element.classList.add('choosed');
    choosedTicketId = 'test';
}

function showTickets(){
    document.getElementById('choosable-tickets').style.display = "block";
}

function hideRooms(){
    document.getElementById('choosable-gyms').style.display = "none";
}

document.getElementById('next-on-rooms-btn').addEventListener('click', ()=>{
    if(choosedRoomId){
        document.getElementById('choose-model-title').innerHTML = "Bérlet kiválasztása";
        hideRooms();
        showTickets();
    }
});