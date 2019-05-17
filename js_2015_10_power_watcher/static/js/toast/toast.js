/*
 * 是否正在Toast通知
 */
var isToasting = false;
/*
 * Toast通知
 */
function Toast(toastText){
	/*如果正在显示通知*/
	if(isToasting){
		/*延时3秒回调方法*/
		setTimeout(function(){
			Toast(toastText)
		},3000);
	}else{
		/*设置正在显示通知*/
		isToasting = true;
		/*创建通知控件*/
		var toast = document.createElement("div");
		/*设置通知文本*/
		toast.innerHTML = toastText;
		/*设置通知样式*/
		toast.className = "Toast";
		/*延时3秒销毁控件*/
		setTimeout(function(){	
			document.body.removeChild(toast);
			isToasting = false;
		},3000);
		/*显示控件*/
		document.body.appendChild(toast);
	}
}
