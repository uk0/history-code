/**
 * @author zhangjianxin 
 * @callback nano
 * @desc 初始化监测浏览器类别。
 * @date 2016年3月7日
 **/
var broFlag = {
	flagIe:function(){
		var bro = true;
		var user_agent = navigator.userAgent.toLowerCase();
		if (user_agent.indexOf("trident/7.0") > -1 && user_agent.indexOf("trident/7.0") > -1) {
			bro  =  true;
		} else if (user_agent.indexOf("msie 9.0") > -1 && user_agent.indexOf("trident/6.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 8.0") > -1 && user_agent.indexOf("trident/6.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 7.0") > -1 && user_agent.indexOf("trident/6.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 9.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 7.0") > -1 && user_agent.indexOf("trident/5.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 8.0") > -1 && user_agent.indexOf("trident/5.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 8.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 7.0") > -1 && user_agent.indexOf("trident/4.0") > -1) {
			bro  =  false;
		} else if (user_agent.indexOf("msie 7.0") > -1) {
			bro  =  false; 
		} else if (user_agent.indexOf("msie 6.0") > -1) {
			bro  =  false;
		}
		return   bro;
	}
};