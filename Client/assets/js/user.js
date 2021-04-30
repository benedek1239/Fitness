//get the user data
userData = JSON.parse(localStorage.getItem('profile'));

//take the user data on the profile window
takeDataToUserPanel();

function takeDataToUserPanel(){
    document.getElementById('user-planel-name').innerText = userData.userName;
    document.getElementById('user-planel-email').innerText = userData.email;
    if(userData.type == 'client'){
        document.getElementById('user-planel-type').innerText = 'Kliens';
    }
    else{
        document.getElementById('user-planel-type').innerText = 'Admin';
    }
}

//sign out the user
function signOut(){
    //clear the local storage
    localStorage.clear();

    //go back to the index page
    window.location.href = "index.html";
}