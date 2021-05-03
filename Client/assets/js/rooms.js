//Variable to store the current training room id
trainingRoomId = '';

//Show the add new room form
document.getElementById('new-room-btn').addEventListener('click', ()=>{
    document.getElementById('new-room-form').style.display = 'block';
    document.getElementById('all-rooms').style.display = 'none';
});

//Navigate back to the current rooms
document.getElementById('back-to-rooms-btn').addEventListener('click', ()=>{
    document.getElementById('new-room-form').style.display = 'none';
    document.getElementById('all-rooms').style.display = 'block';
});


loadRooms();

//Load the trainingRooms from database
function loadRooms(){
    fetch("http://localhost:5000/TrainingRoom")
        .then((response) => 
            response.json()
        )
        .then((data) => {
            for(i = data.length - 1; i >= 0; i--){
                var card = document.createElement("div");
                card.classList = "card card-custom col-lg-8 centered mt-8 py-5";
                card.innerHTML = `<div class="card-header">
                                    <div class="card-title">
                                        <span class="card-icon">
                                            <img src="assets/images/room.png" class="width-50 h-90 align-self-center"/>
                                        </span>
                                        <h3 class="card-label" id="training-room-name-${data[i].id}">${data[i].roomName}</h3>
                                    </div>
                                    <div class="card-toolbar">
                                        <button onclick="navigateToTickets('${data[i].id}')" class="btn btn-warning mr-6">Bérletek</button>
                                        <button class="btn btn-danger" id=${data[i].id} onclick="showTopUp(this)">Törlés</button>
                                    </div>
                                </div>`;
                document.getElementById('all-rooms').appendChild(card);
            }
        });
}

//Show the top up form
function showTopUp(deleteButton){
    trainingRoomId = deleteButton.id;

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

//Delete the clicked training room
function deleteSelectedTrainingRoom(){
    deleteTrainingRoom(trainingRoomId)
	setTimeout( ()=>{
		location.reload();
	}, 200)

}

//Delete a training room fetch
function deleteTrainingRoom(id){

	fetch(`http://localhost:5000/TrainingRoom/${id}`, {
        method: "DELETE",
        mode: "cors"
    })
}

//Add new training room fetch
document.getElementById("add-new-room").addEventListener("click", () => {

    if(document.getElementById("room-name-input").value){
        const data = {
            roomName: `${document.getElementById("room-name-input").value}`,
            IsDeleted: "false",
        };
        
        fetch("http://localhost:5000/TrainingRoom", {
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
    else{
        document.getElementById("room-name-input").classList.add('is-invalid');
    }
    
});
    
//Navigate to the tickets page of a current training room 
function navigateToTickets(roomId){
    window.location.href = "tickets.html?roomId=" + roomId;  
}