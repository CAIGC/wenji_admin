/**
 * Created by CAI_GC on 2017/1/10.
 */
$(function () {
    $(document).on('click', '.backstage-left-side a', function () {
        $('.backstage-left-side a').attr('class','');
        $(this).attr('class',"active");
        if($(this).attr('value')){
            $.get($(this).attr('value'),function (data) {
                $('#content').html(data);
            });
        }
    });
});

function showWarning(message,callback){
    var str = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header no_line"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="closeWarning()"> × </button></div><div class="modal-body dialog_box"><span class="icon question"></span>';
    str += '<p class="ask">'+ message +'</p></div>';
    str += '<div class="modal-footer"><button type="button" class="btn btn-primary" onclick="closeWarning()">取消</button><button type="button" id="warning_confirm" class="btn btn-primary" onclick="closeWarning()">确认</button></div></div></div>';
    if(callback){
        $('#warning_confirm').on('click',function () {
            callback();
        });
    }
    $('#showWarning').html(str);
    $('#showWarning').css('display','block');

}
function closeWarning() {
    $('#showWarning').empty().css('display','none');
}

