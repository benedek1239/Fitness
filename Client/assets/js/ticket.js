GetTicketAttributes()

//Get the ticketId from the URL and GET it's attributes to take them on the HTML
function GetTicketAttributes(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticketId = urlParams.get('ticketId');
    const roomId = urlParams.get('roomId');

    if(!roomId){
        document.getElementById('admin-back-btn').style.display = 'none';
    }


    fetch(`http://localhost:5000/MemberShip/${ticketId}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            
            from = data[0].fromUntill.substring(0, 2);
            until = data[0].fromUntill.substring(2, 4);
            
            document.getElementById('ticket-name').innerText = `${data[0].type} bérlet`;
            document.getElementById('ticket-price').innerText = `Ár: ${data[0].price} Ron`;
            document.getElementById('ticket-from-when').innerText = `Használható ekkortól: ${from}:00 óra`;
            document.getElementById('ticket-until-when').innerText = `Használható eddig: ${until}:00 óra`;
            document.getElementById('ticket-lastingInDay').innerText = `Időtartam: ${data[0].lastingInDay} nap`;
            document.getElementById('ticket-entriesNumber').innerText = `Használható összesen: ${data[0].entriesNumber} alkalom`;
            document.getElementById('ticket-dailyEntries').innerText = `Napi maximum belépések száma: ${data[0].dailyEntries}`;
        });
}

//Goes back href depends on the user type (given room id)
function backToTickets(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const roomId = urlParams.get('roomId');

	if(roomId == 'clientSide'){
		window.location.href = "myTickets.html";
	}
	else{
		window.location.href = "tickets.html?roomId=" + roomId;
	}
}