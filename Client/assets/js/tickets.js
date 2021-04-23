takeTrainingRoomNameOnHTML();

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
document.getElementById('add-new-ticket-button').addEventListener('click', ()=>{
    document.getElementById('tickets').style.display = 'none';
    document.getElementById('new-ticket-form').style.display = 'block';
});

//Close the add new ticket form
document.getElementById('close-new-ticket-form').addEventListener('click', ()=>{
    document.getElementById('tickets').style.display = 'block';
    document.getElementById('new-ticket-form').style.display = 'none';
});

//Creating a new ticket
document.getElementById('create-new-ticket-btn').addEventListener('click', ()=>{
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

});