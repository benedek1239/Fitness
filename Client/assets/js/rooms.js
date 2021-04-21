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

myObj = {
    "rooms": [
        "Fitness club", "Power Huni GYM", "Safari fitness", "Yourself Gym"
    ]
}

function loadRooms(){
    for(i in myObj.rooms){
        var card = document.createElement("div");
        card.classList = "card card-custom col-lg-8 centered mt-8 py-5";
        card.innerHTML = `<div class="card-header">
                            <div class="card-title">
                                <span class="card-icon">
                                    <img src="assets/images/room.jpg" class="width-50 h-90 align-self-center">
                                </span>
                                <h3 class="card-label">${myObj.rooms[i]}</h3>
                            </div>
                            <div class="card-toolbar">
                                <button class="btn btn-danger">Bérletek</button>
                            </div>
                        </div>`;
        document.getElementById('all-rooms').appendChild(card);
    }
}

loadRooms();