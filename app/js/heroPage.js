function heroPage(data){
		//Load the UI for each hero
		console.log(data)
		$('#heroName').html(data.name)
		$('#heroAge').html(data.age)
		$('#heroDetails').html(data.description)
}