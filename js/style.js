var _ww = $(window).width();
var _wh = $(window).height();
var isAnimate = false,img1H, img1FirstTop, boxStarHeight;
var ss = 0, ss1 = ss2 = ss3 = 0, z, boxStarTop = 0, isHeng = 0;
var isIos = browserRedirect();
$(document).ready(function () {
    //=========横纵屏提示=============//
    $(window).bind('orientationchange', function () {
        orientationFix();
    });
    //==============如果不是手机弹出提示信息==================//
    if (!(/iphone|ipod|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android/i.test(navigator.userAgent.toLowerCase()))) {
        alert('用手机浏览效果会更好！！');
    }
    //初始页面的动态效果
    boxStartAnimate();
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", handleMotion2, true);
    }
    img1H = _ww / 640 * 4293;
    //设置背景图初始距离顶部的margin-top值
    img1FirstTop = ( _wh - _ww / 640 * 4293);
    init();
    if (browserRedirect()) {
        boxStarTop = Math.ceil(_wm * 0.9);
    } else {
        boxStarTop = Math.ceil(_wm * 0.88);
    }
    $('.box-star').css('margin-top', '-' + boxStarTop + "px");
});
window.onresize = function () {
    _ww = $(window).width();
    _wh = $(window).height();
    init();
};

//---------------------手机倾斜，感受到重力，触发的事件-----------------//
function handleMotion2(event) {
    //没有播放视频 继续执行

    z = event.accelerationIncludingGravity.z;
    z = Math.ceil(((z * 1000) + 5) / 10);
    //z=(z);
    if (ss == 0) {
        ss1 = z;
        ss = 1;
    }
    if (ss2 == 0 && Math.abs(ss1 - z) > 300) {
        ss2 = 1;
    }
    if (ss2 == 0) {
        return '';
    }
    //设置z最小-700，最大700
    z < - 700? z = -700 : z = z;
    z > 700 ? z = 700: z = z;
    img1FirstTop = 0 - img1FirstTop;
    if (isAndroid) {
        img1FirstTop -= img1FirstTop - ((700 + z) - (img1H - _wh));
    }
    else {
        img1FirstTop -= img1FirstTop - ((700 - z) - (img1H - _wh));
    }
    img1FirstTop = 0 - img1FirstTop;
    //获取此时滚动的距离距离背景图顶部的距离
    var marginImgTop = parseInt(img1FirstTop) - (parseInt(img1H) - parseInt(_wh));
    //$("#debug").html("marginImgTop："+parseInt(marginImgTop)+"z："+z+"img1H"+img1H);
    if (parseInt(img1FirstTop)>=boxStarTop) {
        if(!isAnimate){
            isAnimate=true;
            setTimeout(function(){
                $('.box-star').find(".plane").animate({"marginLeft": "35%"}, 2000, function () {
                    $('.box-star').find(".ticket").animate({"marginTop": "-8%", "opacity": "1"}, 1500, function () {
                        $('.box-star').find(".moreButton").animate({"opacity": "1"},0,function(){
                            $('.box-star').find(".moreButton").animate({"opacity": "0"},500,function(){
                                $('.box-star').find(".moreButton").animate({"opacity": "1"},500,function(){
                                });
                            })
                        })
                    });
                });

            },500);

        }

    }
    if (isAndroid) {
        if(z==700&&img1FirstTop>0){
            img1FirstTop=0;
        }
    }
    else {
        if(z==-700&&img1FirstTop>0){
            img1FirstTop=0;
        }
    }


    TweenMax.to($("#play_box_image"), 3.5, {top: img1FirstTop});
}
//===============================横纵屏提示=================================//
function orientationFix() {
    if (window.orientation == 0 || window.orientation == 180) {
        $('.heng').fadeOut();
    } else {
        if (isHeng == 0) {
            $('.heng').fadeIn();
        }
    }
}
//=============判断浏览器是android还是ios===========//
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    bIsAndroid ? window.isAndroid = true : isAndroid = false;
    return window.isAndroid;

}

function init() {
    boxStarHeight = parseInt($(".box-star").height());
    $("#play_box_image").find('.boxImg').each(function () {
        $(this).width(_ww);
    });
    $("#main_box").css('width', _ww + "px").css("height", _wh + "px");
    $(".heng").css({'height': _wh+ "px",'width':_ww + "px",'lineHeight':_wh+ "px"});
    _wm = _ww / 640 * 4293 - _wh;
//        整张背景图设置margin-top值_wm，固定值
    $('.img2_box').css('margin-top', '-' + _wm + "px");
}
//    页面底部的动态效果
function boxStartAnimate(){
    $('.box-start').find(".rest").animate({"bottom": "13.5%", "opacity": "1"}, 2000, function () {
        $('.box-start').find(".arrow").animate({"opacity": "1","bottom":"5%"}, 300, function () {
            $('.box-start').find(".arrow").animate({"opacity": "0","bottom":"5.5%"}, 300, function () {
                $('.box-start').find(".arrow").animate({"opacity": "1","bottom":"5%"}, 300, function () {
                    $('.box-start').find(".arrow").animate({"opacity": "0","bottom":"5.5%"}, 300, function () {
                        $('.box-start').find(".arrow").animate({"opacity": "1","bottom":"5%"}, 300, function () {
                            $(".box-start .rest,.box-start .arrow").stop();
                        });
                    });
                });
            });
        });
    });
}
//=======禁止页面触屏滑动========//
document.ontouchmove = function (event) {
    event.preventDefault();
};
//------------------resize窗口时，重新初始化数据------------------------------------
