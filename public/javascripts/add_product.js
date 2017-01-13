/**
 * Created by CAI_GC on 2017/1/13.
 */
var swiper;
addShop.loadFun = function() {

    // app图片滚动
    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 0,
        loop: false,
        autoplayDisableOnInteraction: false
    });


    // app隐藏图层-关闭
    $(".transparent_bg").click(function() {

        $(".win").attr("class", "win_none");
    });
    // app购物车
    $(".add_shopping").click(function() {

        $("#win1").addClass("win").removeClass("win_none");
    })

    // 基本信息**************************************************
    var fdAddProduct = $("#addProduct");

    // 图片拖拽
    $("#sortable1").sortable({
        distance: 20,
        items: "li:not(.ui-state-disabled)",
        stop: addShop.imagesTab
    });

    // 基本信息-图片-删除
    fdAddProduct.on("click", ".js-remove-image", function() {
        var obj = $(this);
        addShop.removeImage(obj);
    })

    // 基本信息-图片-添加
    fdAddProduct.on("change", ".add_change", function() {
        var obj = $(this);
        addShop.addImage(obj);
    })

    // 规格-添加图片
    fdAddProduct.on("change", ".js-norms-table input[type=file]", function() {
        var obj = $(this);
        addShop.normsAddImage(obj);
    })

    // 规格-删除图片
    fdAddProduct.on("click", ".js-norms-table .del-img", function() {
        var obj = $(this);
        addShop.normsDelImage(obj);
    })

    // 修改名称
    fdAddProduct.on("blur", ".js-basic-title input", function() {
        var obj = $(this);
        addShop.basicTitle(obj);
    })

    // 简单描述
    fdAddProduct.on("blur", ".js-basic-simple textarea", function() {
        var obj = $(this);
        addShop.basicSimple(obj);
    })

    // 分组-删除
    fdAddProduct.on("click", ".js-del-group i", function() {
        var obj = $(this);
        addShop.removeGroup(obj);
    })
    //	标签-删除
    fdAddProduct.on("click", ".js-label i", function() {
        var obj = $(this);
        addShop.removeGroup(obj);
    })


    // 分组-保存
    $(".modal").on("click", ".js-btn-save", function() {
        var obj = $(this);
        addShop.saveGroup(obj, $(".js-del-group"), $("#class"));
    })
    //标签-保存
    $(".modal").on("click", ".js-lable-save", function() {
        var obj = $(this);
        addShop.saveLable(obj, $(".js-label"), $("#label"));
    })
    // 价格
    fdAddProduct.on("blur", ".js-basic-price input", function() {
        var obj = $(this);
        addShop.basicPrice(obj);
    })

    // 规格-添加规格
    fdAddProduct.on("click", ".js-add-norms", function() {
        var obj = $(this);
        addShop.addbasicNorms(obj);
    })

    // 规格-规格名称输入
    fdAddProduct.on("keyup", ".js-norms-name input", function() {
        var obj = $(this);
        addShop.normsName(obj);
    })

    // 规格-失焦
    fdAddProduct.click(function() {
        $(".js-norms-name ul").hide();
    })

    // 规格-规格名称选择
    fdAddProduct.on("click", ".js-norms-name ul li", function() {
        var obj = $(this);
        addShop.normsNameSelect(obj);
    })

    // 规格-规格值/价格/库存/编码
    fdAddProduct.on("focusout", ".js-norms-table input", function() {
        var obj = $(this);
        addShop.normsTable(obj);
    })

    // 规格-规格值
    fdAddProduct.on("blur", ".norms-worth input", function() {
        var obj = $(this);
        addShop.normsWorth(obj);
    })

    // 规格-增加
    fdAddProduct.on("click", ".js-add-normstabel", function() {
        var obj = $(this);
        addShop.addnormsTable(obj);
    })

    // 规格-删除
    fdAddProduct.on("click", ".js-norms-table .del", function() {
        var obj = $(this);
        addShop.delnormsTable(obj);
    })

    // 产地
    fdAddProduct.on("blur", ".js-basic-origin input", function() {
        var obj = $(this);
        addShop.basicOrigin(obj);
    })

    // 运费
    fdAddProduct.on("blur", ".js-basic-freight textarea", function() {
        var obj = $(this);
        addShop.basicFreight(obj);
    })


    // 微信分享设置************************************************
    var fdWeChatshare = $("#weChatshare");

    // 图片-删除
    fdWeChatshare.on("click", ".js-del-share", function() {
        var obj = $(this);
        addShop.delShare(obj);
    })

    // 图片-添加
    fdWeChatshare.on("change", "#weChatFile", function() {
        var obj = $(this);
        addShop.addShare(obj);
    })

    // 图片-标题
    fdWeChatshare.on("blur", ".js-title-share input", function() {
        var obj = $(this);
        addShop.titleShare(obj);
    })

    // 图片-描述
    fdWeChatshare.on("blur", ".js-describe-share textarea", function() {
        var obj = $(this);
        addShop.describeShare(obj);
    })

    var data = {};
    // 提交
    $("#submitBtn").click(function() {
        data.typeName = $(".js-norms-name input").val();
        data.data = [];
        $(".js-norms-table tbody tr").each(function() {
            var $this = $(this);
            var obj = {};
            obj.productNormName = $this.children('td').eq(0).find("input").val();
            obj.unitPrice = $this.children('td').eq(1).find("input").val();
            obj.quantity = $this.children('td').eq(2).find("input").val();
            obj.productNum = $this.children('td').eq(3).find("input").val();
            obj.normFile = $this.children('td').eq(4).find('img').attr("src");
            obj.sequenceNum = $this.children('td').eq(5).find('input').val();

            data.data.push(obj);

        })
    })
}
$(document).ready(addShop.loadFun);
console.info(2)
