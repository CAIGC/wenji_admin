var fdCount = 0;
var addShop = {
    fdAppBasic: $("#appBasic"),
    fdWeChatShare: $(".js-weChat-share"),
    // 商品类别保存
    shopsType: function() {
        var $this = $(this);
        if ($this.parent().index() == 0) {
            $this.parents(".item").siblings(".pro-box").addClass('hide');
        } else {
            $this.parents(".item").siblings(".pro-box").removeClass('hide');
        }
    },
    // 分销商品保存
    distributionSave: function() {
        var checkedDom = $(this).parents(".modal-content").find(".modal-body").find("input[type='radio']:checked"),
            val = checkedDom.siblings("span").text();
        if ($(".distribution").find("button").siblings("span").length == 0) {
            $(".distribution").find("button").before('<span>' + val + '</span>');
        } else {
            $(".distribution").find("span").html(val);
        }
        $("#distribution").modal('hide');
    },
    // 基本信息
    // 图片拖拽
    imagesTab: function() {
        var fdSlide = $("#appBasic").find(".swiper-slide"),
            fdBasicPic = $("#sortable1").find(".basic-pic"),
            arr = [];

        $.each(fdBasicPic, function(i) {
            var picSrc = fdBasicPic.eq(i).find("img").attr("src");

            fdSlide.eq(i).find("img").attr({ "src": picSrc });
        });

        // 更新大图滚动
        swiper.update();
    },
    // 基本信息-图片-删除
    removeImage: function(obj) {
        var fdParent = obj.parent().parent(),
            parentIndex = fdParent.index(),
            basicPicLength = fdParent.siblings(".basic-pic").length;

        // 当图片为0时显示提醒
        if (basicPicLength === 0) {

            fdParent.parent().siblings(".error").removeClass("hide");
        } else if (basicPicLength === 4) {
            fdCount--;
            var addPic = '<li class="ui-state-disabled"><label for="basicFile' + fdCount + '" class="add-img"></label><input type="file" id="basicFile' + fdCount + '"  name="files" onchange="addImage(this)"></li>';
            fdParent.parent().append(addPic);
        };
        // 右侧图片的删除
        fdParent.remove();
        var sel = "#basicFile" + obj.attr("rel");
        $(sel).parent().remove();

        // app大图滚动图片的删除
        this.fdAppBasic.find(".swiper-slide").eq(parentIndex).remove();

        // 更新大图滚动
        swiper.update();
    },
    // 基本信息-图片-添加
    addImage: function(obj) {
        var fdParent = obj.parent(),
            basicPicLength = fdParent.siblings(".basic-pic").length,
            imageSrc = '',
            picStr = '',
            swiperPicStr = '';

        if (basicPicLength === 0) {

            fdParent.parent().siblings(".error").addClass("hide");
        }

        // 获取File引用:
        var fdBasicFile = document.getElementById("basicFile");
        //var file = fdBasicFile.files[0];
        var fdBasicFile = document.getElementById(obj[0].id);
        var file = obj[0].files[0];

        // 获取File信息:
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            alert('不是有效的图片文件!');
            return;
        }

        // 读取文件:
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;

            picStr = '<li class="basic-pic"><span><img src="' + data + '">' +
                '<a class="js-remove-image" href="javascript:;" rel="' + (fdCount - 1) + '">删除</a></span></li>';

            // 右侧图片的添加
            fdParent.before(picStr);

            if (basicPicLength < 4) {
                var addStr = '<li class="ui-state-disabled"><label for="basicFile' + fdCount + '" class="add-img"></label><input type="file" class="add_change" id="basicFile' + fdCount + '"  name="files"></li>';
                fdParent.after(addStr);
            }

            fdParent.addClass("hide");

            // app大图滚动图片的添加
            swiperPicStr = '<div class="swiper-slide"><img src="' + data + '"></div>';
            addShop.fdAppBasic.find(".swiper-wrapper").append(swiperPicStr);

            // 更新大图滚动
            swiper.update();
        }
        reader.readAsDataURL(file);
        fdCount++;
    },
    // 修改名字
    basicTitle: function(obj) {
        var thisVal = obj.val(),
            fdTitle = this.fdAppBasic.find(".js-app-title");

        if (thisVal.length === 0 || thisVal.length > 100) {

            obj.next().removeClass("hide");

            fdTitle.text("名称");
        } else {
            obj.next().addClass("hide");

            fdTitle.text(thisVal);
        }
    },
    // 简单描述
    basicSimple: function(obj) {
        var thisVal = obj.val(),
            fdSimple = this.fdAppBasic.find(".js-app-simple");

        if (thisVal.length === 0) {

            fdSimple.text("简单描述");
        } else {

            fdSimple.text(thisVal);
        }
    },
    // 分组-删除
    removeGroup: function(obj) {
        var sel = "#" + obj.attr("rel");
        $(sel).prop("checked", false);
        obj.parent().remove();
    },
    // 分组-保存
    saveGroup: function(obj, fdDelGroup, modules) {
        var fdChecked = obj.parent().siblings(".modal-body").find("input:checked"),
            checkedText = "",
            groupStr = "";

        if (fdChecked.length !== 0) {
            for (var i = 0; i < fdChecked.length; i++) {
                checkedText = fdChecked.eq(i).next().text();
                groupStr += '<span>' + checkedText + '<i rel="' + fdChecked.eq(i).attr("id") + '"></i></span>'
            };


            fdDelGroup.find("span").remove();
            fdDelGroup.find("button").before(groupStr);

            modules.modal('hide');
        } else {
            return false;
        }
    },
    // 标签-保存
    saveLable: function (obj, fdDelGroup, modules) {
        var fdChecked = obj.parent().siblings(".modal-select-label").find("input:checked"),
            checkedText = "",
            groupStr = "";

        if (fdChecked.length !== 0) {
            for (var i = 0; i < fdChecked.length; i++) {
                checkedText = fdChecked.eq(i).siblings('span').text();
                groupStr += '<span>' + checkedText + '<i rel="' + fdChecked.eq(i).attr("id") + '"></i></span>'
            };
            fdDelGroup.find("span").remove();
            fdDelGroup.find("button").before(groupStr);

            modules.modal('hide');
        } else {
            return false;
        }
    },
    //  标签选择
    selectLable: function () {
        var Id = $(this).attr("id"),
            val = $(this).siblings("span").text();
        $(".modal-select-label ul").append('<li><label> <input type="checkbox" name="tagId" checked="" id="' + Id + '" value="' + $(this).val() + '"> <span>' + val + '</span> </label></li>');
        $(this).parents("li").remove();
    },
    //  标签搜索
    searchLale: function () {
        var fdChecked = $(this).parents(".modal-header").siblings(".modal-select-label").find("input"),
            idArr = [];
        fdChecked.each(function () {
            idArr.push($(this).attr('id'));
        });
        $(this).siblings("input[type='hidden']").val(idArr);
        var tagName = $("#tagName").val();
        var url = "http://"+window.location.host+"/product/tag/searchByTagName";
        $.ajax({
        	type:"post",
        	url:url,
        	data:{name:tagName,ids:idArr.toString()},
        	dataType:"html",
			success:function(data){
				$("#label .modal-body ul").html(data);
			}	
        });

    },
    // 价格
    basicPrice: function(obj) {
        var thisVal = obj.val(),
            thisIndex = obj.index(),
            fdAppPrice = this.fdAppBasic.find(".js-app-price");

        if (thisVal.length !== 0) {

            obj.siblings(".error").addClass("hide");

            switch (thisIndex) {
                case 0:
                    fdAppPrice.find("span").eq(0).text("￥" + thisVal);
                    break;
                case 1:
                    fdAppPrice.find("span").eq(1).text(thisVal);
                    break;
            }
        } else {

            obj.siblings(".error").removeClass("hide");
        }
    },
    // 规格-添加规格
    addbasicNorms: function(obj) {
        obj.addClass("hide").next().removeClass("hide");
    },
    // 规格-规格名称
    normsName: function(obj) {
        var thisVal = obj.val(),
            fdAppNorms = this.fdAppBasic.find(".js-app-norms");

        if (thisVal.length !== 0) {
            obj.next("ul").show();
            fdAppNorms.find("li > span").text(thisVal);

            //obj.next().addClass("hide");
            fdAppNorms.find("li").children("span").text(thisVal + "：");
            $("#forMyselfRadio").siblings("h3").text(thisVal + "：");
        } else {
            obj.next("ul").hide();
            fdAppNorms.find("li > span").text("规格");
            $("#forMyselfRadio").siblings("h3").text("规格：");
        }
    },
    // 规格名称下拉选择
    normsNameSelect: function(obj) {
        var value = obj.text();
        $(".js-norms-name input").val(value);
        this.fdAppBasic.find(".js-app-norms").find("li>span").text(value + "：");
        $("#forMyselfRadio").siblings("h3").text(value + "：");
        obj.parent("ul").hide();
    },
    // 规格-图片-添加
    normsAddImage: function(obj) {
        var file = obj[0].files[0];

        // 获取File信息:
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            alert('不是有效的图片文件!');
            return;
        }
        // 读取文件:
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;

            obj.parent("label").hide().siblings('span').removeClass('hide').children('img').attr("src", data);
            // fdAppNorms.find("li").children("span").text("规格：");
        }
        reader.readAsDataURL(file);
    },
    // 规格-图片-删除
    normsDelImage: function(obj) {
        obj.siblings('img').attr("src", "").parent("span").addClass('hide').siblings('label').show();
    },
    // 规格-规格值/价格/库存/编码
    normsTable: function(obj) {
        var thisVal = obj.val();

        if (thisVal.length !== 0) {
            obj.parents("table").next().addClass("hide");
        } else {
            obj.parents("table").next().removeClass("hide");
        }
    },
    // 规格-规格值
    normsWorth: function(obj) {
        var thisVal = obj.val(),
            trIndex = obj.parents("tr").index(),
            fdAppNorms = this.fdAppBasic.find(".js-app-norms"),
            $forMyselfRadio = $("#forMyselfRadio"),
            $sendToOtherRadio = $("#sendToOtherRadio");

        if (thisVal.length !== 0) {
            fdAppNorms.find("p").find("span").eq(trIndex).text(thisVal);
            $forMyselfRadio.find("label").eq(trIndex).children('span').text(thisVal);
            $sendToOtherRadio.find("label").eq(trIndex).children('span').text(thisVal);
        } else {
            fdAppNorms.find("p").find("span").eq(trIndex).text("规格值");
            $forMyselfRadio.find("label").eq(trIndex).children('span').text("规格值");
            $sendToOtherRadio.find("label").eq(trIndex).children('span').text("规格值");
        }
    },
    // 规格-增加
    addnormsTable: function(obj) {
        var fdTbody = obj.siblings("table").find("tbody"),
            fdAppNorms = this.fdAppBasic.find(".js-app-norms"),
            normStr =
            '<tr><td class="norms-worth"><input type="hidden" value=""/><input type="text" class="rel"/></td>' +
            '<td><input type="text" class="nickNameClass"/></td>' +
            '<td><input type="text" class="productNumClass"/></td>' +
            '<td><input type="text" onkeyup="value=checkPrice(this)" value="0" class="priceClass"/></td>' +
            '<td><input type="text" onkeyup="value=value.replace(/[^\\d]/g,\'\')" value="0" class="quantityClass"/></td>' +
            '<td><label><span class="add-img">+加图</span><input class="hide" type="file" name=""></label><span class="hide"><img src=""> <a href="javascript:;" class="del-img">删除</a></span></td>' +
            '<td><input type="text" class="w-30" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/></td>' +
            '<td><a href="javascript:;" title="删除" class="del">删除</a></td></tr>';

        fdTbody.append(normStr);
        fdAppNorms.find("p").append("<span>规格值</span>");
        $("#forMyselfRadio").append('<label><input type="radio" name="forMyselfRadio" value="" checked="checked"><span>值</span></label>')
    },
    // 规格-删除
    delnormsTable: function(obj) {
        var $tr = obj.parents("tr"),
            trIndex = $tr.index();
        $tr.remove();
        this.fdAppBasic.find(".js-app-norms p").children('span').eq(trIndex).remove();
        $("#forMyselfRadio").find("label").eq(trIndex).remove();
    },
    // 产地
    basicOrigin: function(obj) {
        var thisVal = obj.val(),
            fdAppOrigin = this.fdAppBasic.find(".js-app-origin");

        if (thisVal.length !== 0) {
            fdAppOrigin.find("span").text(thisVal);
        } else {
            fdAppOrigin.find("span").text("产地");
        }
    },
    // 运费
    basicFreight: function(obj) {
        var thisVal = obj.val(),
            fdAppDescribe = this.fdAppBasic.find(".js-app-describe");

        if (thisVal.length !== 0) {
            fdAppDescribe.find("p").text(thisVal);
        } else {
            fdAppDescribe.find("p").text("运费简单说明");
        }
    },

    // 微信分享设置
    // 图片-删除
    delShare: function(obj) {
        var fdParentsUl = obj.parents("ul");

        obj.parents("li").remove();

        this.fdWeChatShare.find("img").remove();
        $("#weChatFile").parent().removeClass("hide");
        $("#weChatFile").val(null);

    },
    // 图片-添加
    addShare: function(obj) {
        var fdParentsUl = obj.parents("ul"),
            picStr = '',
            imgSrc = '',
            weChatStr = '';

        var fdWeChatFile = document.getElementById("weChatFile"),
            file = fdWeChatFile.files[0];


        // 获取File信息:
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            alert('不是有效的图片文件!');
            return;
        }

        // 读取文件:
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;


            picStr = '<li><span><img src="' + data + '" />' +
                '<a class="js-del-share" href="javascript:;">删除</a></span></li>';

            fdParentsUl.siblings(".error").addClass("hide");

            fdParentsUl.append(picStr);
            //obj.parent().remove();
            obj.parent().addClass("hide");

            weChatStr = '<img src="' + data + '" alt="" title="" />';
            addShop.fdWeChatShare.find(".js-weChat-img").append(weChatStr);
        }
        reader.readAsDataURL(file);
    },
    // 图片-标题
    titleShare: function(obj) {
        var thisVal = obj.val();

        if (thisVal !== "") {

            obj.next().addClass("hide");
            this.fdWeChatShare.find(".js-weChat-title").text(thisVal);
        } else {

            obj.next().removeClass("hide");
            this.fdWeChatShare.find(".js-weChat-title").text("分享标题");
        }
    },
    // 图片-描述
    describeShare: function(obj) {
        var thisVal = obj.val();


        if (thisVal !== "") {

            obj.next().addClass("hide");
            this.fdWeChatShare.find(".js-weChat-describe").text(thisVal);
        } else {

            obj.next().removeClass("hide");
            this.fdWeChatShare.find(".js-weChat-describe").text("分享描述");
        }
    }
};
function getImgJson() {
    var obj = [];
    $(".img .basic-pic").each(function() {
        var $this = $(this),
            index = $this.index(),
            url = '';
        if ($this.children('input[name="editFiles"]').length > 0) {
            url = $this.children('input[name="editFiles"]').val();
            obj.push({
                index: index,
                url: url,
                isNewImg: false
            })
        } else {
            url = $this.find("img").prop("src");
            obj.push({
                index: index,
                url: url,
                isNewImg: true
            })
        };
    })
    return obj;
}

$("#label").on("click", ".list_class input", addShop.selectLable);
$("#label").on("click", ".modal-search .btn", addShop.searchLale);
$("#distribution").on("click", ".modal-footer .btn-save", addShop.distributionSave);
$("#addProduct").on("click", "input[name='shopsType']", addShop.shopsType);
