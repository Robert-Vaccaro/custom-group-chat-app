$(document).ready(()=>{
    var position = $(".chatbox").scrollTop(); 

    // should start at 0

    $('.chatbox').scroll(function() {
        var scroll = $('.chatbox').scrollTop();
        if(scroll > position) {
            console.log('scrollDown');
        } else {
            console.log('scrollUp');
        }
        position = scroll;
    });
    $(".user-button").click(()=>{
        if ($("#name").val()==""){
            alert("Must Enter User Name!")
        } else {
        $(".initial").addClass("hidden");
        $(".container").removeClass('hidden');
        }
    });

});
