//function to show the main page when signed in as a Client
function showMainPageSignedInClient(){
    document.getElementById("user-client").style.display = "inline";
    document.getElementById("user-admin").style.display = "none";
    document.getElementById("user-client-text").style.display = "block";
    document.getElementById("user-admin-text").style.display = "none";
}
    
//function to show the main page when signed in as an Admin
function showMainPageSignedInAdmin(){
    document.getElementById("user-client").style.display = "none";
    document.getElementById("user-admin").style.display = "inline";
    document.getElementById("user-client-text").style.display = "none";
    document.getElementById("user-admin-text").style.display = "block";
}

showMainPageSignedInAdmin();


 