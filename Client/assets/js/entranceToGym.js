//variable to store the ticket id
choosedTicketId = '';

//variable top store the client id
clientId = '';

//get the client id
userData = JSON.parse(localStorage.getItem('profile'));
clientId = userData.id;

//get the tickets of a client
loadClientTickets();

//get the choosed ticket
function chooseTicket(element){
    removeChoosedFromAllCustomCard();

    element.classList.add('choosed');

    choosedTicketId = element.id;
}

//exit from all the form
function exitFromTheForm(){
    removeChoosedFromAllCustomCard();
    choosedTicketId = '';
    showTickets();
    hideEnding()
    document.getElementById('choose-model-title').innerHTML = "A te bérleteid";
    document.getElementById('next-btn').onclick = ticketIsChoosed; 
    document.getElementById('dont-btn').style.display = "block";
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


//the client choosed the ticket
function ticketIsChoosed(){
    if(choosedTicketId){
        document.getElementById('choose-model-title').innerHTML = "Véglegesítés";
        hideTickets();
        showEnding();
        document.getElementById('next-btn').onclick = sendEnrance; 
        document.getElementById('next-btn').innerText = "Belépés"
        document.getElementById('back-2-btn').style.display = "block";
    } 
}

//goes back to the tickets 
function backToTickets(){
    removeChoosedFromAllCustomCard();
    choosedTicketId = '';
    document.getElementById('choose-model-title').innerHTML = "A te bérleteid";
    hideEnding();
    showTickets();
    document.getElementById('next-btn').onclick = ticketIsChoosed; 
    document.getElementById('back-2-btn').style.display = "none";
    document.getElementById('next-btn').innerText = "Tovább"
}

//load the tickets of a client
function loadClientTickets(){
	//delete other users ticket
	document.getElementById('choosable-tickets').innerHTML = '';

	//variable to store actual data
	roomNameShower = [];
	ticketNameShower = [];
	entriesShower = [];
	idGetter = [];
	length = 0;

	fetch(`http://localhost:5000/api/ClientMembership/${clientId}`)
	.then((response) => 
		response.json()
	)
	.then((clientMembership) => {
		for(i = clientMembership.length - 1; i >= 0; i--){
			//store the length for the second loop through
			length = clientMembership.length;
			//get the entries number and the id of the clientmembership
			entriesShower.push(clientMembership[i].entered);
			idGetter.push(clientMembership[i].id);
			//get the ticket name
			fetch(`http://localhost:5000/MemberShip/${clientMembership[i].memberShipId}`)
			.then((response) => 
				response.json()
			)
			.then((clientMembershipTicket) => {
				ticketNameShower.push(clientMembershipTicket[0].type);
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
			for(i = length - 1; i >= 0; i--){
				//create the new clientTicket dic on the HTML
				var clientTicket = document.createElement("div");
				clientTicket.innerHTML = `<div class="card mx-8 client-ticket-card mt-6 custom-card" onclick="chooseTicket(this)" id="${idGetter[i]}">
										<h2 class="font-weight-bold d-inherit"><img src="assets/images/clientTicket.png" class="client-membership-img mr-6"/>
											<div class="d-inline mt-4">
												<h4><p class="d-inline font-weight-bolder">Bérlet:</p> ${ticketNameShower[i]}</h3>
												<h4><p class="d-inline font-weight-bolder">Terem:</p> ${roomNameShower[i]}</h3>
												<h4><p class="d-inline font-weight-bolder">Eddigi belépések:</p> ${entriesShower[i]}</h3>
											</div>
										</h2>
										</div>`
				document.getElementById('choosable-tickets').appendChild(clientTicket);
			}
		}, 300);
	});
}

//Updating the client membership
function updateClientMembership(){
	//get the choosed client mebmbership
	fetch(`http://localhost:5000/api/ClientMembership/${choosedTicketId}/${true}`)
	.then((response) => 
		response.json()
	)
	.then((clientMembership) => {
		//check how many entrances left
		fetch(`http://localhost:5000/MemberShip/${clientMembership[0].memberShipId}`)
        .then((response) => 
            response.json()
        )
        .then((membership) => {
			entriesLeft = membership[0].entriesNumber - clientMembership[0].entered;
			if(entriesLeft > 0){
				//construct the data depends on if it s the first enter
				if(clientMembership[0].firstUsed == 'false'){
					//get current date
					var today = new Date();
					var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		
					const data = {
						id: `${choosedTicketId}`,
						clientId: `${clientMembership[0].clientId}`,
						entered: `${Number(clientMembership[0].entered) + 1}`,
						firstUsed: `${date}`,
						isDeleted: `false`,
						memberShipId: `${clientMembership[0].memberShipId}`,
						roomId: `${clientMembership[0].roomId}`,
						soliPrice: `${clientMembership[0].soliPrice}`
					};
					//update the client membership with the enw data
					fetch(`http://localhost:5000/api/ClientMembership/${choosedTicketId}`,{
						method: "PUT",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					})

					//show ending	
					showSuccessTopUp(entriesLeft-1);

					setTimeout( ()=>{
						window.location.reload();
					}, 2000);
				}
				else{
					const data = {
						id: `${choosedTicketId}`,
						clientId: `${clientMembership[0].clientId}`,
						entered: `${Number(clientMembership[0].entered) + 1}`,
						firstUsed: `${clientMembership[0].firstUsed}`,
						isDeleted: `false`,
						memberShipId: `${clientMembership[0].memberShipId}`,
						roomId: `${clientMembership[0].roomId}`,
						soliPrice: `${clientMembership[0].soliPrice}`
					};
					//update the client membership with the enw data
					fetch(`http://localhost:5000/api/ClientMembership/${choosedTicketId}`,{
						method: "PUT",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					})

					//show ending
					showSuccessTopUp(entriesLeft-1);

					setTimeout( ()=>{
						window.location.reload();
					}, 2000);
				}
				//get current date
				var today = new Date();
				var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

				//create entries data
				const entriesData = {
					clientId: `${clientMembership[0].clientId}`,
					memberShipId: `${clientMembership[0].memberShipId}`,
					roomId: `${clientMembership[0].roomId}`,
					date: `${date}`
				}

				//add new entries to db
				fetch("http://localhost:5000/Entries", {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(entriesData),
				})


			}
			else{
				showErrorTopUp();
			}
		});


	});
}

//Show the success top up
function showSuccessTopUp(entriesLeft){
    document.getElementById('top-up-back-2').style.zIndex = 10000;
    document.getElementById('top-up-back-2').classList.remove('swal2-backdrop-hide');
    document.getElementById('top-up-back-2').classList.add('swal2-backdrop-show');
    document.getElementById('top-up-2').classList.remove('swal2-hide');
    document.getElementById('top-up-2').classList.add('swal2-show');
	document.getElementById('swal2-title-2').innerHTML = `Sikeres belépés, még van ${entriesLeft} belépésed!`;
}

//Show the error top up
function showErrorTopUp(){
    document.getElementById('top-up-back').style.zIndex = 10000;
    document.getElementById('top-up-back').classList.remove('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.add('swal2-backdrop-show');
    document.getElementById('top-up').classList.remove('swal2-hide');
    document.getElementById('top-up').classList.add('swal2-show');
}

//Hide the error top up 
function hideErrorTopUp(){
    document.getElementById('top-up-back').style.zIndex = -1;
    document.getElementById('top-up-back').classList.add('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.remove('swal2-backdrop-show');
    document.getElementById('top-up').classList.add('swal2-hide');
    document.getElementById('top-up').classList.remove('swal2-show');
}

//finish and end the entrance form
function sendEnrance(){
	updateClientMembership();
}