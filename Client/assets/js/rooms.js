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
                                        <img src="assets/images/room.jpg" class="width-50 h-90 align-self-center">
                                    </span>
                                    <h3 class="card-label">${data[i].roomName}</h3>
                                </div>
                                <div class="card-toolbar">
                                    <button class="btn btn-warning mr-6">Bérletek</button>
                                    <button class="btn btn-danger">Törlés</button>
                                </div>
                            </div>`;
            document.getElementById('all-rooms').appendChild(card);
        }
      });

    
}

loadRooms();


document.getElementById("add-new-room").addEventListener("click", () => {
    const data = {
        roomName: `${document.getElementById("room-name-input").value}`,
        IsDeleted: "false",
    };
    
    fetch("http://localhost:5000/TrainingRoom", {
        method: "POST", // or 'PUT'
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            location.reload();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
    

