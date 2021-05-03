//get a list of clients
getClients();

choosedClient = '';

function getClients(){
	fetch("http://localhost:5000/api/AdminActions")
        .then((response) => 
            response.json()
        )
        .then((data) => {

            for(i = data.length - 1; i >= 0; i--){
                var row = document.createElement("tr");
				row.classList = "datatable-row";
				row.style.left = "0px";
				row.innerHTML = `<td class="datatable-cell datatable-toggle-detail">
									<img class="symbol-label wd-40" src="${data[i].imageURL}">
								</td>
								<td data-field="Név" class="datatable-cell">
									<span style="width: 108px;"></span>${data[i].userName}</span>
								</td>
								<td data-field="Telefon" class="datatable-cell">
									<span style="width: 100px;">${data[i].phoneNumber}</span>
								</td>
								<td data-field="Email" class="datatable-cell">
									<span style="width: 138px;">${data[i].userEmail}</span>
								</td>
								<td data-field="Személyi" aria-label="10/15/2017" class="datatable-cell">
									<span style="width: 108px;">${data[i].cnp}</span>
								</td>
								<td data-field="Cím" aria-label="5" class="datatable-cell" style="display: none;">
									<span style="width: 108px;">${data[i].address}</span>
								</td>
								<td data-field="Vonalkód" data-autohide-disabled="false" aria-label="1" class="datatable-cell">
									<span style="width: 100px;">${data[i].barcode}</span>
								</td>
								<th data-field="Megjegyzések" data-autohide-disabled="false" class="datatable-cell datatable-cell-sort">
									<span style="width: 120px;">${data[i].comment}</span>
								</th>
								<td data-field="Actions" data-autohide-disabled="false" aria-label="null" class="datatable-cell">
									<span style="overflow: visible; position: relative; width: 125px;">                        
										<div class="dropdown dropdown-inline">      

										<a onclick="chooseUser('${data[i].id}')" data-toggle="modal" data-target="#exampleModalLong" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">
											<span class="svg-icon svg-icon-md">                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                            <rect x="0" y="0" width="24" height="24"></rect>                                            <path d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z" fill="#000000"/>                                        </g>                                    
											</svg>                                </span>                            
										</a>                            
							
										<a onclick="updateUser('${data[i].id}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">
											<span class="svg-icon svg-icon-md">                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                        <rect x="0" y="0" width="24" height="24"></rect>                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path>                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect>                                    </g>                                </svg>                            </span>                        
										</a> 

										<a onclick="showTopUp('${data[i].id}')" class="btn btn-sm btn-clean btn-icon" title="Delete">
											<span class="svg-icon svg-icon-md">                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                        <rect x="0" y="0" width="24" height="24"></rect>                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>                                    </g>                                </svg>                            </span>                        
										</a>
									</span>
								</td>`;
                document.getElementById('clients-db').appendChild(row);
            }
        });
}


function choosed(clickedAvatar){
	for(i=0; i<50; ++i){
		document.getElementById(`avatar-${i}`).classList.remove('filtered');
	}
	clickedAvatar.classList.add('filtered');
	document.getElementById('profile-picture').classList.add('h-75');
	document.getElementById('profile-picture').classList.remove('attached-img');  
	document.getElementById('profile-picture').src = clickedAvatar.getElementsByTagName('img')[0].src;

}

//Choose a user to add a ticket to him
function chooseUser(clientID){
	choosedClient = clientID;
	loadClientTickets();
}

//make the retgistration
function addNewClient(){
    //let s front end variate the form
    if(validation()){
        //everithing is okey

        //get current date
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


        const data = {
            userName: `${document.getElementById("name-input").value}`,
            phoneNumber: `${document.getElementById("phone-input").value}`,
            userEmail: `${document.getElementById("email-input").value}`,
            IsDeleted: "false",
            insertedDate: `${date}`,
            cnp: `${document.getElementById("cnp-input").value}`,
            address: `${document.getElementById("address-input").value}`,
            barcode: `${document.getElementById("barcode-input").value}`,
            password: `${document.getElementById("password-input").value}`,
            type: "Client",
			imageUrl: `${document.getElementById('profile-picture').src}`,
            comment: `${document.getElementById("comment-input").value}`,
        };

        //Fetch the data
        fetch("http://localhost:5000/api/AdminActions",{
             method: "POST",
             mode: "cors",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify(data),
         })
		 setTimeout( ()=>{
			window.location.reload();
		}, 150);
    }
    else{
        //we have an error, let s scroll to the top
        window.scrollTo(0,0);
    }
}

//validate the register form on front end 
function validation(){
    //Just in case :)))
    document.getElementById('email-already-used-input').classList.remove('is-invalid');

    //variable to check if there are errors or at least one error
    isError = false;

    //name
    if(document.getElementById("name-input").value.length < 5){
        document.getElementById("name-input").classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("name-input").classList.remove('is-invalid');
    }

    //email
    if(!validateEmail(document.getElementById("email-input").value)){
        document.getElementById("email-input").classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("email-input").classList.remove('is-invalid');
    }

    //phone
    if(document.getElementById("phone-input").value.length < 7){
        document.getElementById("phone-input").classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("phone-input").classList.remove('is-invalid');
    }

    //password length
    if(document.getElementById("password-input").value.length < 5){
        document.getElementById("password-input").classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("password-input").classList.remove('is-invalid');
    }

    //password confirm
    if(document.getElementById("password-confirm-input").value != document.getElementById("password-input").value){
        document.getElementById("password-confirm-input").classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("password-confirm-input").classList.remove('is-invalid');
    }

	//cnp
	if(document.getElementById("cnp-input").value.length < 5){
		document.getElementById("cnp-input").classList.add('is-invalid');
		isError =  true;
	}
	else{
		document.getElementById("cnp-input").classList.remove('is-invalid');
	}

	//address
	if(document.getElementById("address-input").value.length < 7){
		document.getElementById("address-input").classList.add('is-invalid');
		isError =  true;
	}
	else{
		document.getElementById("address-input").classList.remove('is-invalid');
	}

	//barcode
	if(document.getElementById("barcode-input").value.length < 5){
		document.getElementById("barcode-input").classList.add('is-invalid');
		isError =  true;
	}
	else{
		document.getElementById("barcode-input").classList.remove('is-invalid');
	}

    //send true if everithing okey, false if there are errors
    if(isError){
        return false;
    }
    else{
        return true;
    }
}

//function to correctly validate an e-mail
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//store the client that the admin wants to delete
choosedClientID = '';

//Show the top up form
function showTopUp(clientID){
	choosedClientID = clientID;

    document.getElementById('top-up-back').style.zIndex = 1;
    document.getElementById('top-up-back').classList.remove('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.add('swal2-backdrop-show');
    document.getElementById('top-up').classList.remove('swal2-hide');
    document.getElementById('top-up').classList.add('swal2-show');
}

//Hide the top up from 
function hideTopUp(){
	choosedClientID = '';

    document.getElementById('top-up-back').style.zIndex = -1;
    document.getElementById('top-up-back').classList.add('swal2-backdrop-hide');
    document.getElementById('top-up-back').classList.remove('swal2-backdrop-show');
    document.getElementById('top-up').classList.add('swal2-hide');
    document.getElementById('top-up').classList.remove('swal2-show');
}

//delete the client
function deleteSelectedClient(){
	fetch(`http://localhost:5000/api/AdminActions/${choosedClientID}`, {
        method: "DELETE",
        mode: "cors"
    })
	setTimeout(()=>{
		window.location.reload();
	}, 150)
}

//Update the user
function updateUser(userID){
	//get the single user
	fetch(`http://localhost:5000/api/AdminActions/${userID}`)
	.then((response) => 
		response.json()
	)
	.then((data) => {
		showNewClientForm();
		//change the button on new client form
		document.getElementById('add-client-btn').innerHTML = 'Módosítás';
		document.getElementById('add-client-btn').onclick = updateClient;

		//store the choosed client
		choosedClientID = data[0].id;

		//remove filter from all avatars
		for(i=0; i<50; ++i){
			document.getElementById(`avatar-${i}`).classList.remove('filtered');
		}
		
		//load the data to HTML
		document.getElementById('name-input').value = `${data[0].userName}`;
		document.getElementById('phone-input').value = `${data[0].phoneNumber}`;
		document.getElementById('email-input').value = `${data[0].userEmail}`;
		document.getElementById('cnp-input').value = `${data[0].cnp}`;
		document.getElementById('address-input').value = `${data[0].address}`;
		document.getElementById('barcode-input').value = `${data[0].barcode}`;
		document.getElementById('password-input').value = `${data[0].password}`;
		document.getElementById('password-confirm-input').value = `${data[0].password}`;
		document.getElementById('comment-input').value = `${data[0].comment}`;
		document.getElementById('profile-picture').src = `${data[0].imageURL}`;
	});
}

//update the current client
function updateClient(){
	//let s front end variate the form
	if(validation()){
		//everithing is okey

		//get current date
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		const data = {
			id: `${choosedClientID}`,
			userName: `${document.getElementById("name-input").value}`,
			phoneNumber: `${document.getElementById("phone-input").value}`,
			userEmail: `${document.getElementById("email-input").value}`,
			IsDeleted: "false",
			insertedDate: `${date}`,
			cnp: `${document.getElementById("cnp-input").value}`,
			address: `${document.getElementById("address-input").value}`,
			barcode: `${document.getElementById("barcode-input").value}`,
			password: `${document.getElementById("password-input").value}`,
			type: "Client",
			imageURL: `${document.getElementById('profile-picture').src}`,
			comment: `${document.getElementById("comment-input").value}`,
		};

		//Fetch the data
		fetch(`http://localhost:5000/api/AdminActions/${choosedClientID}`,{
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		setTimeout( ()=>{
			window.location.reload();
		}, 200);
	}
	else{
		//we have an error, let s scroll to the top
		window.scrollTo(0,0);
	}
}

//variable to store the room id
choosedRoomId = '';
choosedTicketId = '';

//get the choosed GYM
function chooseGym(element){
    removeChoosedFromAllCustomCard();

    element.classList.add('choosed');
    choosedRoomId = element.id;
}

//get the choosed ticket
function chooseTicket(element){
    removeChoosedFromAllCustomCard();

    element.classList.add('choosed');

    choosedTicketId = element.id;
}

//remove all choosed classlist
function removeChoosedFromAllCustomCard(){
    var allCards = document.querySelectorAll('.custom-card');

    for(i=0; i<allCards.length; ++i)
    {
        allCards[i].classList.remove('choosed');

    }
}

document.getElementById('new-client-btn').addEventListener('click', ()=>{
	document.getElementById('add-client-btn').innerHTML = 'Létrehozás';
	document.getElementById('add-client-btn').onclick = addNewClient;
	choosed(document.getElementById('avatar-0'));

	//delete data on HTML
	document.getElementById('name-input').value = '';
	document.getElementById('phone-input').value = '';
	document.getElementById('email-input').value = '';
	document.getElementById('cnp-input').value = '';
	document.getElementById('address-input').value = '';
	document.getElementById('barcode-input').value = '';
	document.getElementById('password-input').value = '';
	document.getElementById('password-confirm-input').value = '';
	document.getElementById('comment-input').value = '';

    showNewClientForm();
});

document.getElementById('back-to-clients-btn').addEventListener('click', ()=>{
    showClientsDB();
});

//function to show the new client form and hide the clients db
function showNewClientForm(){
    document.getElementById('new-client-form').style.display = 'block';
    document.getElementById('clients-database').style.display = 'none';
}

//function tho show the clients db and hide the new client form
function showClientsDB(){
    document.getElementById('new-client-form').style.display = 'none';
    document.getElementById('clients-database').style.display = 'block';
}


//Add new ticket to the client
function addNewTicket(){
	document.getElementById('choose-model-title').innerText = "Terem kiválasztása";
	document.getElementById('client-tickets').style.display = 'none';
	document.getElementById('choosable-gyms').style.display = 'block';
	document.getElementById('add-ticket-btn').style.display = 'none';
	document.getElementById('next-btn').style.display = 'block';
}

//the admin choosed the room
function roomIsChoosed(){
    if(choosedRoomId){
		//load tickets for the choosed room
		loadTickets();
        document.getElementById('choose-model-title').innerHTML = "Bérlet kiválasztása";
		document.getElementById('choosable-gyms').style.display = 'none';
		document.getElementById('choosable-tickets').style.display = 'block';
        document.getElementById('next-btn').onclick = ticketIsChoosed; 
		document.getElementById('next-btn').innerText = "Hozzáadás!";
    }
}

//exit from all the form
function exitFromTheForm(){
    removeChoosedFromAllCustomCard();
    choosedRoomId = '';
    choosedTicketId = '';
	choosedClient = '';
	document.getElementById('choose-model-title').innerHTML = "Kliens bérletei";
	document.getElementById('client-tickets').style.display = 'block';
	document.getElementById('choosable-gyms').style.display = 'none';
	document.getElementById('choosable-tickets').style.display = 'none';
    document.getElementById('next-btn').onclick = roomIsChoosed; 
    document.getElementById('next-btn').innerText = 'Tovább';
	document.getElementById('next-btn').style.display = 'none';
	document.getElementById('add-ticket-btn').style.display = 'block';
}

//the admin choosed the ticket
function ticketIsChoosed(){
    if(choosedTicketId){
		//get the choosed ticket
		fetch(`http://localhost:5000/MemberShip/${choosedTicketId}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            //create a clientMembership data, this is how we add a ticket to a client

			 //Construct the data 
			 const newData = {
				clientId: choosedClient,
				memberShipId: choosedTicketId,
				roomId: choosedRoomId,
				entered: 0,
				soldPrice: Number(data[0].price),
				isDeleted: 'false',
				firstUsed: `false`,
			};
	
			//Fetch the data
			fetch("http://localhost:5000/api/ClientMembership", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
			})
				.then((response) => response.json())
				.then((newData) => {
					setTimeout( ()=>{
						window.location.reload();
					}, 150)
				})
				.catch((error) => {
					console.error("Error:", error);
				});

        });
    } 
}

//Add rooms to the addTicketToTheClient form
loadRooms();

function loadRooms(){
	fetch("http://localhost:5000/TrainingRoom")
	.then((response) => 
		response.json()
	)
	.then((data) => {
		for(i = data.length - 1; i >= 0; i--){
			var room = document.createElement("div");
			room.innerHTML = `<div class="card mx-8 custom-card mt-6" onclick="chooseGym(this)" id='${data[i].id}'>
				<h2 class="font-weight-bold"><img src="assets/images/room.png" class="width-65 mr-6"/>${data[i].roomName}</h2>
				</div>`;
			document.getElementById('choosable-gyms').appendChild(room);
		}
	});
}

//Add tickets of a given room
function loadTickets(){
    fetch(`http://localhost:5000/MemberShip/${choosedRoomId}/${true}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
			document.getElementById('choosable-tickets').innerHTML = '';
            for(i = data.length - 1; i >= 0; i--){
                var ticket = document.createElement("div");
                ticket.innerHTML = `<div class="card mx-8 custom-card mt-6" onclick="chooseTicket(this)" id='${data[i].id}'>
				<h2 class="font-weight-bold"><img src="assets/images/ticket.png" class="width-65 mr-6"/>${data[i].type}</h2>
				</div>
                `;
                document.getElementById('choosable-tickets').appendChild(ticket);
            }
        });
}

//load the tickets of a client
function loadClientTickets(){
	//delete other users ticket
	document.getElementById('client-tickets').innerHTML = '';

	//variable to store actual data
	roomNameShower = [];
	ticketNameShower = [];
	length = 0;

	fetch(`http://localhost:5000/api/ClientMembership/${choosedClient}`)
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
				clientTicket.classList = 'card mx-8 client-ticket-card mt-6';
				clientTicket.innerHTML = `<h2 class="font-weight-bold d-inherit"><img src="assets/images/clientTicket.png" class="width-65 mr-6"/>
					<div class="d-inline mt-4">
						<h4><p class="d-inline font-weight-bolder">Bérlet:</p> ${ticketNameShower[i]}</h3>
						<h4><p class="d-inline font-weight-bolder">Terem:</p> ${roomNameShower[i]}</h3>
					</div>
				</h2>`;
				document.getElementById('client-tickets').appendChild(clientTicket);
			}
		}, 180);
	});
}

//front end user search
document.getElementById('user-search-input').addEventListener('keyup', ()=>{
	//delete every user from clients table
	document.getElementById('clients-db').innerHTML = '';

	//get clients from the db
	fetch("http://localhost:5000/api/AdminActions")
	.then((response) => 
		response.json()
	)
	.then((data) => {

		for(i = data.length - 1; i >= 0; i--){
			if(data[i].userName.toLowerCase().includes(document.getElementById('user-search-input').value.toLowerCase())){
				var row = document.createElement("tr");
				row.classList = "datatable-row";
				row.style.left = "0px";
				row.innerHTML = `<td class="datatable-cell datatable-toggle-detail">
									<img class="symbol-label wd-40" src="${data[i].imageURL}">
								</td>
								<td data-field="Név" class="datatable-cell">
									<span style="width: 108px;"></span>${data[i].userName}</span>
								</td>
								<td data-field="Telefon" class="datatable-cell">
									<span style="width: 100px;">${data[i].phoneNumber}</span>
								</td>
								<td data-field="Email" class="datatable-cell">
									<span style="width: 138px;">${data[i].userEmail}</span>
								</td>
								<td data-field="Személyi" aria-label="10/15/2017" class="datatable-cell">
									<span style="width: 108px;">${data[i].cnp}</span>
								</td>
								<td data-field="Cím" aria-label="5" class="datatable-cell" style="display: none;">
									<span style="width: 108px;">${data[i].address}</span>
								</td>
								<td data-field="Vonalkód" data-autohide-disabled="false" aria-label="1" class="datatable-cell">
									<span style="width: 100px;">${data[i].barcode}</span>
								</td>
								<th data-field="Megjegyzések" data-autohide-disabled="false" class="datatable-cell datatable-cell-sort">
									<span style="width: 120px;">${data[i].comment}</span>
								</th>
								<td data-field="Actions" data-autohide-disabled="false" aria-label="null" class="datatable-cell">
									<span style="overflow: visible; position: relative; width: 125px;">                        
										<div class="dropdown dropdown-inline">      
	
										<a onclick="chooseUser('${data[i].id}')" data-toggle="modal" data-target="#exampleModalLong" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">
											<span class="svg-icon svg-icon-md">                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                            <rect x="0" y="0" width="24" height="24"></rect>                                            <path d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z" fill="#000000"/>                                        </g>                                    
											</svg>                                </span>                            
										</a>                            
							
										<a onclick="updateUser('${data[i].id}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">
											<span class="svg-icon svg-icon-md">                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                        <rect x="0" y="0" width="24" height="24"></rect>                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path>                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect>                                    </g>                                </svg>                            </span>                        
										</a> 
	
										<a onclick="showTopUp('${data[i].id}')" class="btn btn-sm btn-clean btn-icon" title="Delete">
											<span class="svg-icon svg-icon-md">                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">                                        <rect x="0" y="0" width="24" height="24"></rect>                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>                                    </g>                                </svg>                            </span>                        
										</a>
									</span>
								</td>`;
				document.getElementById('clients-db').appendChild(row);
			}
		}
	});
});