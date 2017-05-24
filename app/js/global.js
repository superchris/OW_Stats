
var navLogin= $('#navLogin');
var navRegister = $('#navRegister');
var page = $('#page');
var createAcc =$('#createAcc');


function init(){//Functions to run on init and event listeners

		loadHeroes()
	//Search Users Event Listener
	document.getElementById('search').addEventListener('click', function(){
		var test = searchUser()
		//Resize Window to last configuration
		var winBounds = window.localStorage.getItem('winBounds')
		if( winBounds = null){
			console.log('Local storage is null')
			window.localStorage.setItem('winBounds', '{width:570, height:570, x:0, y:0}')
		}else{
			winBounds = localStorage.getItem('winBounds')
			console.log("Window Bounds: "+ winBounds)
			var temp = JSON.parse(winBounds)
			require('electron').remote.getCurrentWindow().setBounds(temp)
		}
		console.log(test)
	})


	//Expand and contract the Flyout menu
	document.getElementById('nav-li-1').addEventListener('click', function(){
		console.log('1')
	})

	//Player Search
	document.getElementById('nav-li-2').addEventListener('click', function(){
		console.log('2')
	})

	//Navigate to list of Character information
	document.getElementById('nav-li-3').addEventListener('click', function(){
		console.log('3')
		page.load('./pages/heroes.html #content')

	})

	//Before the window is closed, save the window bounds
	window.onbeforeunload = (function(){
		window.localStorage.setItem('winBounds', JSON.stringify(require('electron').remote.getCurrentWindow().getBounds()))
	})
}


document.onreadystatechange = function(){
	console.log("Document State: "+ document.readyState)
	if(document.readyState=="complete"){
		init();
	}
}

function login(){
	var submitted_form = "";
	submitted_form = document.getElementById('login');

	 var email = submitted_form.elements[0].value;
	 var pword = submitted_form.elements[1].value;

	
	firebase.auth().signInWithEmailAndPassword(email, pword)
		.then(function(success){
			//page.load("../app/pages/homepage.html #content");
			//console.log("Sending Firebase UID");
			var user = firebase.auth().currentUser;
			var name, email, photoUrl, uid, emailVerified;

			//console.dir(user)
			ipcRenderer.send('userAuth', user);
			//console.log("User sent");


			if (user != null) {
				console.log(user);
				name = user.displayName;
				email = user.email;
				photoUrl = user.photoURL;
				emailVerified = user.emailVerified;
				uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
				                   // this value to authenticate with your backend server, if
				                   // you have one. Use User.getToken() instead.
			}
			else {
				console.log('User is empty.')
			};
		})

		.catch(function(error) {
		// Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
		console.log(error);
		
	});
}







