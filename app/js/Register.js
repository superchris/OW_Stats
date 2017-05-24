
module.exports= (function function Register(){
    const electron = require('electron');
    const $ = require('jquery');    

    var formContent = form_submit('Register');
    //console.log(form_data);
    console.log(formContent);
        //console.log(form_data);
         //console.log("Form data: "+ form_data.email + form_data.pword);
          firebase.auth().createUserWithEmailAndPassword(formContent.email, formContent.pword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
          // ...
        });
   
});


