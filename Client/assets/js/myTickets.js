//load the client tickets
loadclientTickets();

function loadclientTickets(){
	//get the clint id
	userData = JSON.parse(localStorage.getItem('profile'));
	clientId = userData.id;

	//variable to store actual data
	roomNameShower = [];
	ticketNameShower = [];
	ticketIdShower = [];
	length = 0;

	//get the data and take it to the HTML
	fetch(`http://localhost:5000/api/ClientMembership/${clientId}`)
	.then((response) => 
		response.json()
	)
	.then((clientMembership) => {
		for(i = clientMembership.length - 1; i >= 0; i--){
			//store the length for the second loop through
			length = clientMembership.length;

			//get the ticket name
			fetch(`http://localhost:5000/MemberShip/${clientMembership[i].memberShipId}`)
			.then((response) => 
				response.json()
			)
			.then((clientMembershipTicket) => {
				ticketNameShower.push(clientMembershipTicket[0].type);
				ticketIdShower.push(clientMembershipTicket[0].id);
			});

			//get the room name
			fetch(`http://localhost:5000/TrainingRoom/${clientMembership[i].roomId}`)
			.then((response) => 
				response.json()
			)
			.then((clientMembershipRoom) => {
				roomNameShower.push(clientMembershipRoom[0].roomName);
			});
		}

		//need to wait a little for the data
		setTimeout( ()=>{
			console.log(roomNameShower);
			for(i = length - 1; i >= 0; i--){
				//create the new clientTicket dic on the HTML
				var clientTicket = document.createElement("div");
				clientTicket.classList = 'card card-custom col-lg-8 centered mt-8';
				clientTicket.innerHTML = `<div class="card-header custom-mg-top mt-2">
										<div class="card-title">
											<button onclick="navigateToTicket('${ticketIdShower[i]}')" class="btn btn-danger">Bérlet megtekintése</button>
										</div>
									
										<div class="card-toolbar">
											<img class="width-50" src="assets/images/clientTicket.png">
										</div>
									</div>
									<div class="card-body">
										<h4><p class="d-inline font-weight-bolder">Bérlet:</p> ${ticketNameShower[i]}</h3>
										<h4><p class="d-inline font-weight-bolder">Terem:</p> ${roomNameShower[i]}</h3>
									</div>`;
				document.getElementById('client-tickets').appendChild(clientTicket);
			}
		}, 180);
	});

}

//Navigate to the details of a ticket
function navigateToTicket(ticketId){
    window.location.href = "ticket.html?roomId=clientSide&ticketId=" + ticketId;  
}