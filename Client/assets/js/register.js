//Show the client input form on register page
document.getElementById('client-radio').addEventListener('change', ()=>{
    document.getElementById('client-user-inputs').style.display = "block";
});

//Hide the client input form on register page
document.getElementById('admin-radio').addEventListener('change', ()=>{
    document.getElementById('client-user-inputs').style.display = "none";
});