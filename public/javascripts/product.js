/**
 * Created by CAI_GC on 2017/1/10.
 */
var product_common = {
    product_list:function(success){
        console.info(1);
        $.get('/product/search', product_common.search_data(), function (result) {
            success(result);
        })
    },
    search_data:function(){
        var inputList = $('.search input');
        var result = {};
        $.each(inputList, function (key, value) {
            if (!value.value)
                return true;
            else {
                result[value.name] = value.value;
            }
        });
        var catelog = $('.tab2 .on a');
        result[catelog.attr('name')] = catelog.attr('value');
        result['ORDER_BY_DESC']='createTime';
        return result;
    },
    renderPageBar: function (data) {
        var total_count = data;
        $($('.paging')[1]).createPage({
            totalcount: total_count,
            pageCount: Math.ceil(total_count / 10),
            current: parseInt($('[name="pageNo"]').val()),
            backFn: function (p) {
                $('[name="pageNo"]').val(p);
                product_common.renderList(false);
            }
        });
    },
    renderList: function (repaging) {
        var ext = $('.tab2 ul li.on a').attr('value');
        switch (ext){
            case '1':
                $('.publish-batch').hide();
                $('.off-shelf-batch').show();
                $('.del-batch').hide();
                break;
            case '2':
                $('.publish-batch').show();
                $('.off-shelf-batch').hide();
                $('.del-batch').show();
                break;
            case '3':
                $('.publish-batch').hide();
                $('.off-shelf-batch').show();
                $('.del-batch').hide();
                break;
            case '4':
                $('.publish-batch').hide();
                $('.off-shelf-batch').hide();
                $('.del-batch').show();
                break;
        }
        $('#chk_all').prop("checked",false);
        product_common.product_list(function (data) {
            var dataArea = $('.list');
            dataArea.html('');
            dataArea.append(data);
            if (repaging) {
                product_common.renderPageBar(parseInt($('#totalcount').val()));
            }
        });
    },
    selected_productIds:function(checkedObject,showObject){
        var size = checkedObject.size();
        if (size > 0){
            var ids = '';
            $.each(checkedObject, function (key, value) {
                ids = ids + value.value;
                if (key != size - 1) ids = ids + ',';
            });
            console.info(ids);
            $('#currentProId').val(ids);
            showObject.modal('show');
        }else{
            alert('请选择');
        }
    }
}
$(function () {
    //查询按钮
    $($('.btn.btn-default')[0]).on('click', function () {
        $('[name="pageNo"]').val('1');
        product_common.renderList(true);
    });
    product_common.renderList(true);

    $('.tab2 ul li').on('click', function () {
        $('.tab2 .on').attr('class', '');
        $('[name="pageNo"]').val('1');
        $(this).attr('class', 'on');
        product_common.renderList(true);
    });

    /**添加商品按钮*/
    $('#btnAddProduct').on('click',function(){
        $.get($(this).attr('value')).done(function(data){
            $('#content').html(data);
        })
    });
    // 全选
    $('#chk_all').on('click', function() {
        var $this = $(this);
        $(".list input[type='checkbox']").each(function() {
            $(this).prop("checked", $this.prop("checked"));
        })
        // $this.prop("checked");
    });

    /**批量操作begin*/
    /**批量下架*/
    $('.off-shelf-batch').on('click',function(){
        var checkbox = $('tbody input:checked');
        product_common.selected_productIds(checkbox,$("#shelf"));
    });
    /**批量删除*/
    $('.del-batch').on('click',function(){
        var checkbox = $('tbody input:checked');
        product_common.selected_productIds(checkbox,$("#del"));
    });
    /**批量发布*/
    $('.publish-batch').on('click',function(){
        var checkbox = $('tbody input:checked');
        product_common.selected_productIds(checkbox,$("#publish"));
    });

    /**批量操作end*/

    //发布单商品
    $('.list').on('click','.publish',function(){
        $('#currentProId').val($(this).parent('td').next('input[name="id"]').val())
        $('#publish').modal('show');
    });
    $('#publish').on('click','.btn.btn-primary',function(){
        var productId = $('#currentProId').val();
        $.get('/product/publish',{ids:productId}).done(function(res){
            $('#publish').modal('hide');
            if(res.status=='ok'){
                product_common.renderList(true);
            }else{
                alert('发布失败');
            }
        }).fail(function (res) {
            $('#publish').modal('hide');
            alert('发布失败');
        })
    });

    //下架商品
    $('.list').on('click','.off_shelf',function(){
        $('#currentProId').val($(this).parent('td').next('input[name="id"]').val())
        $('#shelf').modal('show');
    });
    $('#shelf').on('click','.btn.btn-primary',function(){
        var productId = $('#currentProId').val();
        $.get('/product/offShelf',{ids:productId}).done(function(res){
            $('#shelf').modal('hide');
            if(res.status=='ok'){
                product_common.renderList(true);
            }else{
                alert('下架失败');
            }
        }).fail(function (res) {
            $('#shelf').modal('hide');
            alert('下架失败');
        })
    });
    //删除商品
    $('.list').on('click','.del',function(){
        $('#currentProId').val($(this).parent('td').next('input[name="id"]').val())
        $('#del').modal('show');
    });
    $('#del').on('click','.btn.btn-primary',function(){
        var productId = $('#currentProId').val();
        $.get('/product/delete',{ids:productId}).done(function(res){
            $('#del').modal('hide');
            if(res.status=='ok'){
                product_common.renderList(true);
            }else{
                alert('删除失败');
            }
        }).fail(function (res) {
            $('#del').modal('hide');
            alert('删除失败');
        })
    });
})
 