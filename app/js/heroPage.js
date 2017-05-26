function heroPage(data){
		//Load the UI for each hero
		$('#heroName').html(data.name)
		$('#heroAge').html(data.age)
		$('#heroDetails-p').html(data.description)
		$('#realName').html(data.real_name)
		$('#hero-img').empty()
		$('#hero-img').append('<div><img src="./img/heroes/'+data.name+'.png" width=200px/></div>')
		$('#difficulty').empty()
		for (var x=0; x <data.difficulty; x++){
			$('#difficulty').append('<i class="fa fa-star fa-2x" aria-hidden="true"></i>'+ ' ')
		}
}