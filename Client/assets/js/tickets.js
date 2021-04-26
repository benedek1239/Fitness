takeTrainingRoomNameOnHTML();
loadTickets();

//Variable to store the current ticket id
ticketId = '';

//Function to get the selected training room, and take it s name on the HTML
function takeTrainingRoomNameOnHTML(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const trainingRoomId = urlParams.get('roomId')

    fetch(`http://localhost:5000/TrainingRoom/${trainingRoomId}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            document.getElementById('training-room-name').innerText = `${data[0].roomName} terem bérletei`;
        });
}

//Open the add new ticket form
function openNewTicketForm(){
    document.getElementById('tickets').style.display = 'none';
    document.getElementById('new-ticket-form').style.display = 'block';
    
    document.getElementById("ticket-type").classList.remove('is-invalid');
    document.getElementById("ticket-price").classList.remove('is-invalid');
}

//Close the add new ticket form
function closeNewTicketForm(){
    document.getElementById('tickets').style.display = 'block';
    document.getElementById('new-ticket-form').style.display = 'none';
}

document.getElementById('add-new-ticket-button').addEventListener('click', ()=>{
    openNewTicketForm();
    document.getElementById('ticket-name').innerText = 'Új bérlet létrehozása';
    document.getElementById('create-new-ticket-btn').innerText = 'Létrehozás';
    document.getElementById('create-new-ticket-btn').onclick = createNewTicket;
    document.getElementById('ticket-type').value = '';
    document.getElementById('ticket-price').value = '';
    document.getElementById('ticket-lastingInDay').value = 10;
    document.getElementById('ticket-entriesNumber').value = 10;
    document.getElementById('ticket-dailyEntries').value = 1;
    document.getElementById('ticket-from-when').value = '06';
    document.getElementById('ticket-until-when').value = '06';
});

document.getElementById('close-new-ticket-form').addEventListener('click', ()=>{
    closeNewTicketForm();
});

//Load the trainingRooms from database
function loadTickets(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const trainingRoomId = urlParams.get('roomId')

    fetch(`http://localhost:5000/MemberShip/${trainingRoomId}/${true}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            for(i = data.length - 1; i >= 0; i--){
                var card = document.createElement("div");
                card.classList = "card mx-25 custom-card mt-6";
                card.innerHTML = `<h2 class="font-weight-bold"><img src="assets/images/ticket.png" class="width-65 mr-6"/>${data[i].type}
                <div class="ticket-function-btns">
                    <button class="btn btn-success custom-btn-padding mr-3" onclick="navigateToTicket('${data[i].roomId}', '${data[i].id}')"><i class="far fa-folder-open h2"></i></button>
                    <button class="btn btn-warning custom-btn-padding mr-3" onclick="modifyTicket('${data[i].id}')"><i class="far fa-edit h2"></i></button>
                    <button class="btn btn-danger custom-btn-padding" onclick="showTopUp('${data[i].id}')"><i class="far fa-trash-alt h2"></i></button>
                </div>
                </h2>
                `;
                document.getElementById('main-tickets-form').appendChild(card);
            }
        });
}

//showing the delete top up
function showTopUp(TicketId){
    ticketId = TicketId;

    document.getElementById('top-up-back').style.zIndex = 1;

    document.getElementById('top-up-back').classList.remove('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.add('swal2-backdrop-show');

    document.getElementById('top-up').classList.remove('swal2-hide');
    document.getElementById('top-up').classList.add('swal2-show');
}

//Hide the top up from 
function hideTopUp(){
    document.getElementById('top-up-back').style.zIndex = -1;
    document.getElementById('top-up-back').classList.add('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.remove('swal2-backdrop-show');

    document.getElementById('top-up').classList.add('swal2-hide');
    document.getElementById('top-up').classList.remove('swal2-show');
}


//Creating a new ticket
function createNewTicket(){
    //declare variable to store the errors
    error1 = false;
    error2 = false;

    //front end validation
    if(document.getElementById("ticket-type").value.length < 5){
        document.getElementById("ticket-type").classList.add('is-invalid');
        error1 = true;
    }
    else{
        document.getElementById("ticket-type").classList.remove('is-invalid');
        error1 = false;
    }

    
    if(Number(document.getElementById("ticket-price").value) <= 0){
        document.getElementById("ticket-price").classList.add('is-invalid');
        error2 = true;
    }
    else{
        document.getElementById("ticket-price").classList.remove('is-invalid');
        error2 = false;
    }

    if(!error1 && !error2){

        //Declare string variable to store from and until hours ticket entry
        const fromUntil = document.getElementById('ticket-from-when').value +  document.getElementById('ticket-until-when').value;

        //get the room id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const trainingRoomId = urlParams.get('roomId')

        //Construct the data 
        const data = {
            Type: `${document.getElementById("ticket-type").value}`,
            Price: `${document.getElementById("ticket-price").value}`,
            LastingInDay: `${document.getElementById("ticket-lastingInDay").value}`,
            EntriesNumber: `${document.getElementById("ticket-entriesNumber").value}`,
            IsDeleted: "false",
            RoomId: trainingRoomId,
            FromUntill: fromUntil,
            DailyEntries: `${document.getElementById("ticket-dailyEntries").value}`,
        };

        //Fetch the data
        fetch("http://localhost:5000/MemberShip", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

}

//function to modify the current ticket
function pushingModifiedTicket(){
    //declare variable to store the errors
    error1 = false;
    error2 = false;

    //front end validation
    if(document.getElementById("ticket-type").value.length < 5){
        document.getElementById("ticket-type").classList.add('is-invalid');
        error1 = true;
    }
    else{
        document.getElementById("ticket-type").classList.remove('is-invalid');
        error1 = false;
    }


    if(Number(document.getElementById("ticket-price").value) <= 0){
        document.getElementById("ticket-price").classList.add('is-invalid');
        error2 = true;
    }
    else{
        document.getElementById("ticket-price").classList.remove('is-invalid');
        error2 = false;
    }

    if(!error1 && !error2){
        //Declare string variable to store from and until hours ticket entry
        const fromUntil = document.getElementById('ticket-from-when').value +  document.getElementById('ticket-until-when').value;

        //get the room id from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const trainingRoomId = urlParams.get('roomId')

        const data = {
            id: `${ticketId}`,
            Type: `${document.getElementById("ticket-type").value}`,
            Price: `${document.getElementById("ticket-price").value}`,
            LastingInDay: `${document.getElementById("ticket-lastingInDay").value}`,
            EntriesNumber: `${document.getElementById("ticket-entriesNumber").value}`,
            IsDeleted: "false",
            RoomId: trainingRoomId,
            FromUntill: fromUntil,
            DailyEntries: `${document.getElementById("ticket-dailyEntries").value}`,
        };

        fetch(`http://localhost:5000/MemberShip/${ticketId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        setTimeout(()=>{
            location.reload();
        }, 150);
    }
    
}

//Navigate to the details of a ticket
function navigateToTicket(roomId, ticketId){
    window.location.href = "ticket.html?roomId=" + roomId + "&ticketId=" + ticketId;  
}

//Modify a ticket
function modifyTicket(givenTicketId){
    fetch(`http://localhost:5000/MemberShip/${givenTicketId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => 
        response.json()
    )
    .then((data) => {
        openNewTicketForm();
        ticketId = data[0].id;

        document.getElementById('ticket-name').innerText = `"${data[0].type}" bérlet módosítása`;
        document.getElementById('create-new-ticket-btn').innerText = 'Módosítás';
        document.getElementById('create-new-ticket-btn').onclick = pushingModifiedTicket;

        from = data[0].fromUntill.substring(0, 2);
        until = data[0].fromUntill.substring(2, 4);

        document.getElementById('ticket-type').value = data[0].type;
        document.getElementById('ticket-price').value = data[0].price;
        document.getElementById('ticket-lastingInDay').value = data[0].lastingInDay;
        document.getElementById('ticket-entriesNumber').value = data[0].entriesNumber;
        document.getElementById('ticket-dailyEntries').value = data[0].dailyEntries;
        document.getElementById('ticket-from-when').value = from;
        document.getElementById('ticket-until-when').value = until;
    })
}

//Delete a ticket
function deleteTicket(){
    fetch(`http://localhost:5000/MemberShip/${ticketId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => 
        response.json()
    )
    .then((data) => {

        const getedData = {
            id: `${data[0].id}`,
            type: `${data[0].type}`,
            price: `${data[0].price}`,
            lastingInDay: `${data[0].lastingInDay}`,
            entriesNumber: `${data[0].entriesNumber}`,
            IsDeleted: "true",
            roomId: `${data[0].roomId}`,
            fromUntill: `${data[0].fromUntill}`,
            dailyEntries: `${data[0].dailyEntries}`,
        };
    
        fetch(`http://localhost:5000/MemberShip/${data[0].id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getedData),
        })
        setTimeout(()=>{
            location.reload();
        }, 150);
    })
    
}