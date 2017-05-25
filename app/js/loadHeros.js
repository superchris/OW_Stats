var heroData=[]

function loadHeroes(){
	//Check Local Storage for array of heroes
	var heroData = JSON.parse(localStorage.getItem('heroes'))
	//If the array of heroes is empty, i.e. not in local storage, populate an array and set it there.
	if (heroData===null){
		$.getJSON('https://overwatch-api.net/api/v1/hero', function(json){
			console.log('Hero Data is Empty. Pushing data from API.')

			$.each(json.data.forEach(function(i, data){
				heroData.push(i)
			}))
		})

	}//If the array isn't empty, check for changes then save new array to local storage.
	//Output the array to the UI
	else
	{
		$.getJSON('https://overwatch-api.net/api/v1/hero', function( json){
			$.each(json.data.forEach(function(i, data){
				Object.assign(heroData, data)
				$('heroes').append('<li>'+ data.name +'</li>')
			}))
			localStorage.setItem('heroes', JSON.stringify(heroData))
		})
	}
	//Return array you load elements into hero pages
	return heroData
}
