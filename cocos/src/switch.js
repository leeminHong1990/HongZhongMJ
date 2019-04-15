"use strict";
var switches = function () {
};

if (targetPlatform === cc.PLATFORM_OS_ANDROID) {

}
else if ((targetPlatform === cc.PLATFORM_OS_IPHONE) || (targetPlatform === cc.PLATFORM_OS_IPAD)) {

}
else {

}

switches.kbeServerIP = "gxmj.zjfeixia.com";
switches.kbeServerLoginPort = 20013;

if (typeof switchesnin1 === 'undefined' ) {
    switches.TEST_OPTION = true;

    switches.share_android_url = "http://fir.im/xhgxmj";
    switches.share_ios_url = "http://fir.im/xhgxmj";
    switches.h5entrylink = "http://h5entrylink";

    switches.PHP_SERVER_URL = "http://10.0.0.4:9981/api/user_info";

    switches.package_name = "com/zjfeixia/gxmj";



    switches.gzh_name = "宣和棋牌汇";
    switches.contact_wx = "xhqph888";
    switches.contact_phone = "4001234567";
    switches.default_broadcast = "欢迎加入宣和红中麻将，浙江飞侠科技有限公司提供健康娱乐平台，严禁赌博！";

    switches.gameName = "红中棋牌";
    switches.gameEngName = "gxmj";

    switches.h5appid = "";
    switches.currency_mode = 2;
    switches.appstore_check = false;
    switches.show_version = true;

    switches.customerService_wx = "xhgxqp888";

    switches.kbeServerIP = "192.168.1.11";
}
else {
    switches.TEST_OPTION = switchesnin1.TEST_OPTION;

    switches.share_android_url = switchesnin1.share_android_url;
    switches.share_ios_url = switchesnin1.share_ios_url;
    switches.h5entrylink = switchesnin1.h5entrylink;

    switches.PHP_SERVER_URL = switchesnin1.PHP_SERVER_URL;

    switches.package_name = switchesnin1.package_name;



    switches.gzh_name = switchesnin1.gzh_name;
    switches.contact_wx = switchesnin1.contact_wx;
    switches.contact_phone = switchesnin1.contact_phone;
    switches.default_broadcast = switchesnin1.default_broadcast;

    switches.gameName = switchesnin1.gameName;
    switches.gameEngName = switchesnin1.gameEngName;

    switches.h5appid = switchesnin1.h5appid;
    switches.currency_mode = switchesnin1.currency_mode;
    switches.appstore_check = switchesnin1.appstore_check;
    switches.show_version = switchesnin1.show_version;

    switches.customerService_wx = switchesnin1.customerService_wx;
}