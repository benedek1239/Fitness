

document.getElementById('new-client-btn').addEventListener('click', ()=>{
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