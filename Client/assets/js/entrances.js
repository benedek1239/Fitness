//Get thew entrances of a client
getEntrances();

function getEntrances(){
	//get client id
	userData = JSON.parse(localStorage.getItem('profile'));
	clientId = userData.id;

	//variable to store actual data
	roomNameShower = [];
	ticketNameShower = [];
	dateShower = [];
	length = 0;

	//get data
	fetch(`http://localhost:5000/Entries/${clientId}`)
		.then((response) => 
			response.json()
		)
		.then((data) => {
			for(i = data.length - 1; i >= 0; i--){
				console.log(data[0]);
				//store the length for the second loop through
				length = data.length;

				dateShower.push(data[0].date)
				//get the ticket name
				fetch(`http://localhost:5000/MemberShip/${data[i].memberShipId}`)
				.then((response) => 
					response.json()
				)
				.then((clientMembershipTicket) => {
					ticketNameShower.push(clientMembershipTicket[0].type);
				});

				//get the room name
				fetch(`http://localhost:5000/TrainingRoom/${data[i].roomId}`)
				.then((response) => 
					response.json()
				)
				.then((clientMembershipRoom) => {
					roomNameShower.push(clientMembershipRoom[0].roomName);
				});
			}

			//need to wait a little for the data
			setTimeout( ()=>{
				for(i = length - 1; i >= 0; i--){
					//create the new ClientEntry on the HTML
					var clientEntry = document.createElement("div");
					clientEntry.classList = "card card-custom col-lg-8 centered mt-8";
					clientEntry.innerHTML = `<div class="card-header custom-mg-top">
											<div class="card-title">
											</div>
										
											<div class="card-toolbar">
												<img class="width-50 mt-5" src="assets/images/entrance.png">
											</div>
										</div>
										<div class="card-body">
											<h3><p class="d-inline font-weight-bolder">Terem:</p> ${roomNameShower[i]}</h3>
											<h3><p class="d-inline font-weight-bolder">Bérlet:</p> ${ticketNameShower[i]}</h3>
											<h3><p class="d-inline font-weight-bolder">Dátum:</p> ${dateShower[i]}</h3>
										</div>`
					document.getElementById('user-entrances').appendChild(clientEntry);
				}
			}, 300);
		})
}	