//function to show the main page when signed out
function showMainPageSignedOut(){
    document.getElementById("without-user-navbar").style.display = "inherit";
    document.getElementById("user-client").style.display = "none";
    document.getElementById("user-admin").style.display = "none";
    document.getElementById("user-icon").style.display = "none";
}

//function to show the main page when signed in as a Client
function showMainPageSignedInClient(){
    document.getElementById("without-user-navbar").style.display = "none";
    document.getElementById("user-client").style.display = "inline";
    document.getElementById("user-admin").style.display = "none";
    document.getElementById("user-icon").style.display = "inline";
}
    
//function to show the main page when signed in as an Admin
function showMainPageSignedInAdmin(){
    document.getElementById("without-user-navbar").style.display = "none";
    document.getElementById("user-client").style.display = "none";
    document.getElementById("user-admin").style.display = "inline";
    document.getElementById("user-icon").style.display = "inline";
}

showMainPageSignedOut();