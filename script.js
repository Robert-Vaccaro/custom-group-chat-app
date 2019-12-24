$(document).ready(()=>{
    $(".user-button").click(()=>{
        if ($("#name").val()==""){
            $.toast({
                heading: 'Error',
                text: 'Cannot be blank!',
                showHideTransition: 'fade',
                icon: 'error'
            })
        } else {
            $.toast({
                heading: 'Success',
                text: 'Login in Successful!',
                showHideTransition: 'slide',
                icon: 'success'
            })
        $(".initial").addClass("hidden");
        $(".container").removeClass('hidden');
        $('#messages').animate({
            scrollTop: $('#messages')[0].scrollHeight
        }, 800);
        }
    });
});
