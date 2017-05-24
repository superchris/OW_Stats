var $ = require('jquery');
var nav= $('#nav');


//Hiding & showing the nav menu
$('#navMenu').on('click', function(){

//If the window is hidden
	if (nav.hasClass('hide')){
		nav.css('width', '200px');
		nav.toggleClass('hide');
		//nav.firstChild.css('background-color','#43484c');
		//nav.firstChild.css('color','#fff');
		setTimeout( function(){
			$('.navh4').toggleClass('hidden');
		}, 500);
	}
//if the window is showing
	else {
		nav.css('width', '14px');
		$('.navh4').toggleClass('hidden')
		setTimeout( function(){
			nav.toggleClass('hide');
		},300);
	}
});




 