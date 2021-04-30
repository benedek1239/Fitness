//function to show the main page when signed in as a Client
function showMainPageSignedInClient(){
    document.getElementById("user-client").style.display = "inline";
    document.getElementById("user-admin").style.display = "none";
}
    
//function to show the main page when signed in as an Admin
function showMainPageSignedInAdmin(){
    document.getElementById("user-client").style.display = "none";
    document.getElementById("user-admin").style.display = "inline";
}

//get the user data
userData = JSON.parse(localStorage.getItem('profile'));

//show the right menus, depends on the user type
if(userData.type == 'admin'){
    showMainPageSignedInAdmin();
}
else{
    showMainPageSignedInClient();
}
