//function to show the main page when signed in as a Client
function showCenterTextClient(){
    document.getElementById("user-client-text").style.display = "block";
    document.getElementById("user-admin-text").style.display = "none";
}
    
//function to show the main page when signed in as an Admin
function showCenterTextAdmin(){
    document.getElementById("user-client-text").style.display = "none";
    document.getElementById("user-admin-text").style.display = "block";
}

//get the user data
userData = JSON.parse(localStorage.getItem('profile'));

//show the right center text, depends on the user type
if(userData.type == 'admin'){
    showCenterTextAdmin();
}
else{
    showCenterTextClient();
}
