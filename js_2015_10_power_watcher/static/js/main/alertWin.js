/**
 * @author 作者：张建新
 *弹窗封装类 alertWin(title, msg, w, h)
 * 示例写法：alertWin('提示信息','数据库修改失败',200,200);
 * @param {Object} title 标题
 * @param {Object} msg 错误信息以及提示信息
 * @param {Object} w 宽度
 * @param {Object} h 高度
 */
function alertWin(title, msg, w, h) {
	var titleheight = "22px"; // 提示窗口标题高度 
	var bordercolor = "#364751"; // 提示窗口的边框颜色 
	var titlecolor = "#FFFFFF"; // 提示窗口的标题颜色 
	var titlebgcolor = "#364751"; // 提示窗口的标题背景色 
	var bgcolor = "#FFFFFF"; // 提示内容的背景色 

	var iWidth = document.documentElement.clientWidth;
	var iHeight = document.documentElement.clientHeight;
	var bgObj = document.createElement("div");
	bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:" + iWidth + "px;height:" + Math.max(document.body.clientHeight, iHeight) + "px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";
	document.body.appendChild(bgObj);

	var msgObj = document.createElement("div");
	msgObj.style.cssText = "position:absolute;font:11px '宋体';top:" + (iHeight - h) / 2 + "px;left:" + (iWidth - w) / 2 + "px;width:" + w + "px;height:" + h + "px;text-align:center;border:1px solid " + bordercolor + ";background-color:" + bgcolor + ";line-height:22px;z-index:102;";
	document.body.appendChild(msgObj);

	var table = document.createElement("table"); // 
	msgObj.appendChild(table);
	table.style.cssText = "margin:0px;border:0px;padding:0px;";
	table.cellSpacing = 0;
	var tr = table.insertRow(-1);
	var titleBar = tr.insertCell(-1);
	titleBar.style.cssText = "width:100%;height:" + titleheight + "px;text-align:left;padding:3px;margin:0px;font:bold 13px '宋体';color:" + titlecolor + ";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor;
	titleBar.style.paddingLeft = "10px";
	titleBar.innerHTML = title;
	var moveX = 0;
	var moveY = 0;
	var moveTop = 0;
	var moveLeft = 0;
	var moveable = false;
	var docMouseMoveEvent = document.onmousemove; // 
	var docMouseUpEvent = document.onmouseup;
	titleBar.onmousedown = function() {
		var evt = getEvent();
		moveable = true;
		moveX = evt.clientX;
		moveY = evt.clientY;
		moveTop = parseInt(msgObj.style.top);
		moveLeft = parseInt(msgObj.style.left);

		document.onmousemove = function() {
			if (moveable) {
				var evt = getEvent();
				var x = moveLeft + evt.clientX - moveX; //
				var y = moveTop + evt.clientY - moveY;
				if (x > 0 && (x + w < iWidth) && y > 0 && (y + h < iHeight)) {
					msgObj.style.left = x + "px";
					msgObj.style.top = y + "px";
				}
			}
		};
		document.onmouseup = function() {
			if (moveable) {
				document.onmousemove = docMouseMoveEvent; // 
				document.onmouseup = docMouseUpEvent;
				moveable = false;
				moveX = 0;
				moveY = 0;
				moveTop = 0;
				moveLeft = 0;
			}
		};
	}

	var closeBtn = tr.insertCell(-1);
	closeBtn.style.cssText = "cursor:pointer; padding:2px;background-color:" + titlebgcolor;
	closeBtn.innerHTML = "<span style='font-size:15pt; color:" + titlecolor + ";'>×</span>";
	closeBtn.onclick = function() {
		document.body.removeChild(bgObj);
		document.body.removeChild(msgObj);
	}
	var msgBox = table.insertRow(-1).insertCell(-1);
	msgBox.style.cssText = "font:10pt '宋体';";
	msgBox.colSpan = 2;
	msgBox.innerHTML = msg;
	/**
	获得事件Event对象，用于兼容IE和FireFox 
	* 为了兼容 Ie 进行获取ie 浏览器窗口的操作控制
	*/
	function getEvent() {
		return window.event || arguments.callee.caller.arguments[0];
	}
}