
var navLogin= $('#navLogin');
var navRegister = $('#navRegister');
var page = $('#page');
var content = $('#content');
var createAcc =$('#createAcc');

var heroData=0;

function init(){//Functions to run on init and event listeners


	
	//Search Users Event Listener
	document.getElementById('search').addEventListener('click', function(){

		//Look-up User Informatio
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
		content.load('./index.html #content-wrapper')
		$('.nav-fly> .navh4').removeClass('active')
		$(this).addClass('active')

	})

	//Navigate to player search page.
	document.getElementById('nav-li-2').addEventListener('click', function(){
		console.log('2')
		$('.nav-fly >.navh4').removeClass('active')
		$(this).addClass('active')

	})

	//Navigate to static list of Character information
	document.getElementById('nav-li-3').addEventListener('click', function(){
		console.log('3')

		$('.nav-fly > .navh4').removeClass('active')
		$(this).addClass('active')

		content.load('./pages/heroes.html #heroData', function(){
			//Loading Hero Data to UI. Thinking of using react for this...
			heroData.forEach(function(i){
				$('#heroList').append('<li class="hero">'+ i.name+'</li>')
			})
			heroPage(heroData[0])
			$('#heroList li:first').addClass('active')
			

			//Set Event Listener for the loaded list.
			$('li.hero').click(function(){
				heroPage(heroData[$(this).index()])
				$('li.hero').removeClass('active')
				$(this).addClass('active')
			})
		})



	})

	//Before the window is closed, log session persist values
	window.onbeforeunload = (function(){
		//Save window bounds
		//------------------------Change from get Current Window if I'm going to use child windows--------------------------
		window.localStorage.setItem('winBounds', JSON.stringify(require('electron').remote.getCurrentWindow().getBounds()))
		//Save user data (Searched battle tag)
		//Heros list saved in loadHeroes. 

	})
}


document.onreadystatechange = function(){
	console.log("Document State: "+ document.readyState)
	if(document.readyState=="complete"){

		//Parse and load character information synchronously early.
		heroData = loadHeroes()


		//Load Flyout
		$('#flyout').load('./pages/flyout.html #nav-fly', function(){
			//call init() after load is completed
			init();
		})
		
	}
}

function login(){
	var submitted_form = "";
	submitted_form = document.getElementById('login');

	 var email = submitted_form.elements[0].value;
	 var pword = submitted_form.elements[1].value;

	
	firebase.auth().signInWithEmailAndPassword(email, pword)
		.then(function(success){
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





