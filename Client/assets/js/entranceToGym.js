//variable to store the room id
choosedRoomId = '';
choosedTicketId = '';

//get the choosed GYM
function chooseGym(element){
    removeChoosedFromAllCustomCard();

    element.classList.add('choosed');
    choosedRoomId = 'test';
}

//get the choosed ticket
function chooseTicket(element){
    removeChoosedFromAllCustomCard();

    element.classList.add('choosed');

    choosedTicketId = 'test';
}

//exit from all the form
function exitFromTheForm(){
    removeChoosedFromAllCustomCard();
    choosedRoomId = '';
    choosedTicketId = '';
    showRooms();
    hideTickets();
    hideEnding()
    document.getElementById('next-btn').onclick = roomIsChoosed; 
    document.getElementById('dont-btn').style.display = "block";
    document.getElementById('back-btn').style.display = "none";
    document.getElementById('back-2-btn').style.display = "none";
    document.getElementById('next-btn').innerText = "Tovább"
}

//remove all choosed classlist
function removeChoosedFromAllCustomCard(){
    var allCards = document.querySelectorAll('.custom-card');

    for(i=0; i<allCards.length; ++i)
    {
        allCards[i].classList.remove('choosed');

    }
}

function showEnding(){
    document.getElementById('ending-form').style.display = "block";
}

function hideEnding(){
    document.getElementById('ending-form').style.display = "none";
}

function showTickets(){
    document.getElementById('choosable-tickets').style.display = "block";
}

function hideTickets(){
    document.getElementById('choosable-tickets').style.display = "none";
}

function showRooms(){
    document.getElementById('choosable-gyms').style.display = "block";
}

function hideRooms(){
    document.getElementById('choosable-gyms').style.display = "none";
}


//the client choosed the room
function roomIsChoosed(){
    if(choosedRoomId){
        document.getElementById('choose-model-title').innerHTML = "Bérlet kiválasztása";
        hideRooms();
        showTickets();
        document.getElementById('next-btn').onclick = ticketIsChoosed; 
        document.getElementById('dont-btn').style.display = "none";
        document.getElementById('back-btn').style.display = "block";
    }
}

//the client choosed the ticket
function ticketIsChoosed(){
    if(choosedTicketId){
        document.getElementById('choose-model-title').innerHTML = "Véglegesítés";
        hideTickets();
        showEnding();
        document.getElementById('next-btn').onclick = sendEnrance; 
        document.getElementById('next-btn').innerText = "Belépés"
        document.getElementById('back-btn').style.display = "none";
        document.getElementById('back-2-btn').style.display = "block";
    } 
}

//goes back to the rooms 
function backToRooms(){
    removeChoosedFromAllCustomCard();
    choosedRoomId = '';
    choosedTicketId = '';
    document.getElementById('choose-model-title').innerHTML = "Terem kiválasztása";
    hideTickets();
    showRooms();
    document.getElementById('next-btn').onclick = roomIsChoosed; 
    document.getElementById('dont-btn').style.display = "block";
    document.getElementById('back-btn').style.display = "none";
}

//goes back to the tickets 
function backToTickets(){
    removeChoosedFromAllCustomCard();
    choosedTicketId = '';
    document.getElementById('choose-model-title').innerHTML = "Bérlet kiválasztása";
    hideEnding();
    showTickets();
    document.getElementById('next-btn').onclick = ticketIsChoosed; 
    document.getElementById('back-btn').style.display = "block";
    document.getElementById('back-2-btn').style.display = "none";
    document.getElementById('next-btn').innerText = "Tovább"
}

//finish and end the entrance form
function sendEnrance(){
    console.log('entrance sent');
}