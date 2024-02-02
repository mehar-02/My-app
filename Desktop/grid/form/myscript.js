// function errorMessage(element, msg) {
//     const parent = element.parentElement;
//     console.log(parent);
// }
function RemoveErrorMessageFromPage(){
    var IDofContainer = "my-error-message-container";
    document.getElementById(IDofContainer).innerHTML = "";
    document.getElementById(IDofContainer).style.display = "none";
}
function InsertErrorMessageIntoPage(content){
    var IDofContainer = "my-error-message-container";
    document.getElementById(IDofContainer).style.display = "block";
    document.getElementById(IDofContainer).innerHTML = content;
}
function validateForm() {
    RemoveErrorMessageFromPage();
    var name = document.forms["myForm"]["name"].value;
    if(name == ""){
        // alert("name must be filled out");
        // errorMessage();
        InsertErrorMessageIntoPage("The name is required.");
        return false;
    }
    var letter = /[0-9]/
    if(letter.test(name)){
        // alert("not a valid name");
        InsertErrorMessageIntoPage("The name appears to be invalid.");
        // errorMessage();
        return false;
    }
    var email = document.forms["myForm"]["email"].value;
    if(email == ""){
        // alert("email must be filled out");
        InsertErrorMessageIntoPage("The email is required.");
        return false;
    }
    var y = /[^@]+@[a-zA-Z]+\.[a-zA-Z]{2,6}/
    if(y.test(email)){

    }
    else{
        // alert("not a mail id");
        InsertErrorMessageIntoPage("The email appears to be invalid.");
        return false;
    }

    var phone = document.forms["myForm"]["phone"].value;
    if(phone == ""){
        // alert("phone must be filled out");
        InsertErrorMessageIntoPage("Phone number is required");
        return false;
    }
    if(isNaN(phone) || phone.length>10 || phone.length<10){
        // alert("The phone number must be valid");
        InsertErrorMessageIntoPage("Phone number appears to be invalid");
       return false;
    }
}