$(document).ready(()=>{
    $(".user-button").click(()=>{
        if ($("#name").val()==""){
            alert("Must Enter User Name!")
        } else {
        $(".initial").addClass("hidden");
        $(".container").removeClass('hidden');
        $('#messages').animate({
            scrollTop: $('#messages')[0].scrollHeight
        }, 800);
        }
    });
});
