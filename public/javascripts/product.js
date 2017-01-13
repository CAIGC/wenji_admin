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
        product_common.product_list(function (data) {
            var dataArea = $('.list');
            dataArea.html('');
            dataArea.append(data);
            if (repaging) {
                product_common.renderPageBar(parseInt($('#totalcount').val()));
            }
        });
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
    })
})
 