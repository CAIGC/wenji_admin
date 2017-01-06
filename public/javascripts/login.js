/**
 * Created by CAI_GC on 2017/1/6.
 */
$(function(){
    $("#unlock-slider").slider({
            handle: "#unlock-handle",
            animate: true,
            max : 80,
            slide: function (e, ui) {
                $("#slide-to-unlock").css("opacity", 1 - (parseInt($("#unlock-handle").css("left")) / 120));
            },
            stop: function (e, ui) {
                var sliderWidth = $('div#unlock-slider.ui-slider.ui-slider-horizontal.ui-widget.ui-widget-content.ui-corner-all').width();
                var sliderPosition = Math.floor($(".ui-slider-handle").position().left);
                if (sliderPosition > sliderWidth-1 ||  sliderPosition<sliderWidth+1) {
                    login_common_fns.login($('[name=seed]').val());
                }
                else {
                    $(".ui-slider-handle").animate({left: 0}, 200);
                    $(".ui-slider-handle").animate({opacity: 1}, 200);
                }
            }
        }
    );
})

var login_common_fns={
    login:function(seed){
        document.location.href = '/welcome';
        /*var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        $.post('/user/login',{username:username,password:password},function(res){
            if (result.status == 'success') {
                document.location.href = '/welcome';
            } else {
                $('#username_message').text(result.message).attr('style', 'display:block;');
            }
        })*/
    }
}