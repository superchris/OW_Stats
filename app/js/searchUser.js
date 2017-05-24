function searchUser(){
	form_data = formData('searchUser')
	console.dir( form_data)
	var theUrl = ("http://ow-api.herokuapp.com/profile/" +form_data.platform+"/" + form_data.region+ "/"+ form_data.user+"-"+form_data.tag);
	$.ajax({
        url: theUrl,
        cache: false,
        type: "GET",
        dataType: "JSON",
        success: function (data)
        {
            return data
            console.log(data)
        	if ($('#content').hasClass('center')){
				$('#content').toggleClass('center')
			}
			
        	
			//$('#header-avatar').attr("src", data.portrait);
			//$('#header-avatar').append("<img src='" +data.portrait+"'>");

			$('#header-info').append("<h1>"+ data.username + "#" 
				+ form_data.tag + "</h1>");

			//A function to determine which console was selected and output to the UI an appropriate image
			//switch(form_data.platform){
				//case "xbox":
					//$('#header-info').append("<div id='regPlat'><img src='./img/xbox.png' height='64' width='64'></div>")
					//break;
				//case "ps":
					//$('#header-info').append("<div id='regPlat'><img src='./img/ps.png' height='64' width='64'></div>")
					//break;
				//default :
					//$('#header-info').append("<div id='regPlat'><img src='./img/pc.png' height='64' width='64'></div>")
			//}
			//console.log(data);

        	})
           
        }, 
        error: function (jqXHR, exception)
        {
            if (jqXHR.status === 0)
            {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404)
            {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500)
            {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror')
            {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout')
            {
                alert('Time out error.');
            } else if (exception === 'abort')
            {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }//END IF JQXHR.STATUS === 0
        }//END FUNCTION ERROR
    });
}