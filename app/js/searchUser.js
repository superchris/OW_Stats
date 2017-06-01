
function searchUser(){
	form_data = formData('searchUser')
	var theUrl = ("http://ow-api.herokuapp.com/profile/" +form_data.platform+"/" + form_data.region+ "/"+ form_data.user+"-"+form_data.tag);
	$.ajax({
        url: theUrl,
        type: "GET",
        dataType: "JSON",
        async: false,
        success: function (data)
        {
					$('#searchResults').html(data.username)
					  //If URL resolves, player exists. Safe to move away from search screen.
        	if ($('#content').hasClass('center')){
				$('#content').toggleClass('center')
			}
        },
        error: function (jqXHR, exception)
        {
            if (jqXHR.status === 0)
            {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404)
            {
                alert('Player not found. [404]');
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
    }).done(function(data)
    {

        console.log(data)

        //Return the data and handle the transition once the ajax call is done.
        var ipcRenderer =require('electron').ipcRenderer
        ipcRenderer.send('toDash','')
        return data

    });

}
