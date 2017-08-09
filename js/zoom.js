/**
 * Created by Administrator on 2017/6/21.
 */
$.fn.zoomImg = function (bigDiv) {
    var midView = $(this);
    var midImg = $(this).find("img");
    var winSelector = $(this).find("#winSelector");
    var bigView = $("#" + bigDiv);
    var bigImg = $("#" + bigDiv + " img");

    //大视窗看图
    function mouseover(e) {
        if (winSelector.css("display") == "none") {
            winSelector.show();
            bigView.show();
        }

        winSelector.css(fixedPosition(e));
        e.stopPropagation();
    }


    function mouseOut(e) {
        if (winSelector.css("display") != "none") {
            winSelector.hide();
            bigView.hide();
        }
        e.stopPropagation();
    }


    midView.mouseover(mouseover); //中图事件
    midImg.mousemove(mouseover).mouseout(mouseOut);
    winSelector.mousemove(mouseover).mouseout(mouseOut);

    var $divWidth = winSelector.width(); //选择器宽度
    var $divHeight = winSelector.height(); //选择器高度
    var $imgWidth = midView.width(); //中图宽度
    var $imgHeight = midView.height(); //中图高度
    var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

    // bigImg.attr("src", midImg.attr("src").replace("mid", "big"));
    bigImg.attr("src", midImg.attr("src"));

    bigView.scrollLeft(0).scrollTop(0);

    /**
     * 计算图片偏移量
     * @param e
     * @returns {{left: (*|number), top: (*|number)}}
     */
    function fixedPosition(e) {
        if (e == null) {
            return;
        }
        var $imgLeft = midView.offset().left; //中图左边距
        var $imgTop = midView.offset().top; //中图上边距
        X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
        Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
        X = X < 0 ? 0 : X;
        Y = Y < 0 ? 0 : Y;
        X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
        Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

        if ($viewImgWidth == null) {
            $viewImgWidth = bigImg.outerWidth();
            $viewImgHeight = bigImg.height();
            if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                $viewImgWidth = $viewImgHeight = 800;
            }
            $height = $divHeight * $viewImgHeight / $imgHeight;
            bigView.width($divWidth * $viewImgWidth / $imgWidth);
            bigView.height($height);
        }

        var scrollX = X * $viewImgWidth / $imgWidth;
        var scrollY = Y * $viewImgHeight / $imgHeight;
        bigImg.css({"left": scrollX * -1, "top": scrollY * -1});
        // bigView.css({"top": 75, "left": bigView.parent().offset().left + bigView.parent().width() + 15});
        bigView.css({"top": 5, "left": bigView.parent().offset().left + 50});

        return {left: X, top: Y};
    }

}

