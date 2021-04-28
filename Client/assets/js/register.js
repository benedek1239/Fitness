//Show the client input form on register page
document.getElementById('client-radio').addEventListener('change', ()=>{
    document.getElementById('client-user-inputs').style.display = "block";
});

//Hide the client input form on register page
document.getElementById('admin-radio').addEventListener('change', ()=>{
    document.getElementById('client-user-inputs').style.display = "none";
});

document.getElementById('register-btn').addEventListener('click', ()=>{
    register();
});

//make the retgistration
function register(){
    //let s front end variate the form
    if(validation()){
        //everithing is okey
        console.log('registered');
    }
    else{
        //we have an error, let s scroll to the top
        window.scrollTo(0,0);
    }
}

//validate the register form on front end 
function validation(){
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

    //type
    if(!document.getElementById('client-radio').checked && !document.getElementById('admin-radio').checked){
        document.getElementById('type-radios').classList.add('is-invalid');
        isError =  true;
    }
    else{
        document.getElementById("type-radios").classList.remove('is-invalid');
    }

    //if the user type is client let s validate the 3 more inputs
    if(document.getElementById('client-radio').checked){

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