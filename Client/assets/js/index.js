//Check if the user already signed it, navigate to the home page
checkUser();

function checkUser(){
    //get the user data
    userData = JSON.parse(localStorage.getItem('profile'));

    if(userData){
        window.location.href = "home.html";
    }
}

//function to sign in the client
function signIn(){
    var email = document.getElementById("email-input").value;
    var password = document.getElementById("password-input").value;

    const data = {
        userEmail: `${email}`,
        password: `${password}`,
    }

    //Fetch the data
    fetch("http://localhost:5000/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.status == 400 || data.status == 'Error'){
                document.getElementById("password-input").classList.add('is-invalid')
                document.getElementById("email-input").classList.add('is-invalid')
            }
            else{
                localStorage.setItem('profile', JSON.stringify({ ...data }));
                window.location.href = "home.html";
            }

        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
