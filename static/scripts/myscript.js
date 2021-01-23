$(document).ready(function(){

    $("#myform").submit(function(){

        var search = $("#books").val();

        if(search == '')
        {
            alert("Please enter something in the field first");
        }

        else{
            var url = '';
            var img = '';
            var title = '';
            var author = '';
        }

    });


    return false;

});