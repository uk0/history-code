var dateUtil = {
	/**
	 *  获取指定格式月份
	 */
	convertMonthToFullMonth : function(){
		var month = 0;
		currentTime = new Date();
		var currentMonth = currentTime.getMonth()+1;//获取当前月份
		var convertMonth = "";
		if(currentMonth >= 10){//如果当前月份大于等于10月convertMonth等于currentMonth
			convertMonth += currentMonth;
		}
		else{//如果当前月份小于10月则补零
			convertMonth += "0" + currentMonth;
		}
		return convertMonth;
	},
	/**
	 * 获取指定格式天数
	 */
	convertMonthToFullDay : function(){
		var day = 0;
		currentTime = new Date();
		var currentDay =  currentTime.getDay();
		var convertDay = "";
		if(convertDay>=10){//如果当前天数大于等于10号convertDay等于currentDay
			convertDay += currentDay;
		}
		else{//如果当天数份小于10月则补零
			convertDay +="0" + currentDay;
		}
		return convertDay;
	}
}
