/*
 * 主界面UI控制初始化
 * 作者：张建新    2015年12月15日
 */
var mainUIControl = {
	/**
	 * 对左侧功能框伸缩进行初始化
	 * @param {Object} leftTree 左侧树引用
	 * @param {Object} rightMain 右侧主体
	 * @param {Object} leftTreeBackButton 左侧回退功能框
	 * @param {Object} leftTreeShowButton 左侧显示功能框
	 */
	init : function(leftTree,rightMain,leftTreeBackButton,leftTreeShowButton){
		//获得左侧树引用
		this.leftTree = leftTree;
		//获得右侧主体引用
		this.rightMain = rightMain;
		//获得左侧树回退按钮
		this.leftTreeBackButton = leftTreeBackButton;
		//获得左侧树显示按钮
		this.leftTreeShowButton = leftTreeShowButton;
		//左侧回退按钮注册事件
		this.initLeftTreeBackButton();
		//右侧显示按钮注册事件
		this.initLeftTreeShowButton();
		//初始化数据管理工具条
		dataAdminTitleBarFeature.init();
		
		
	},
	/*左侧树*/
	leftTree : null,
	/*右侧主体*/
	rightMain : null,
	/*左侧树回退按钮*/
	leftTreeBackButton : null,
	/*左侧树显示按钮*/
	leftTreeShowButton : null,
	/*初始化左侧树点击按钮*/
	initLeftTreeBackButton : function(){
		//获取左侧树引用
		var templeftTree = this.leftTree;
		//获取右侧主体引用
		var tempRightMain = this.rightMain;
		//注册点击事件
		this.leftTreeBackButton.onclick = function(){
			/*左侧树缩回*/
			templeftTree.style.left = "-20%";
			/*右侧主体扩展全屏*/
			tempRightMain.style.width = "100%";		
		}
	},
	/*初始化左侧树显示按钮*/
	initLeftTreeShowButton : function(){
		//获取左侧树引用
		var templeftTree = this.leftTree;
		//获取右侧主体引用
		var tempRightMain = this.rightMain;
		//注册点击事件
		this.leftTreeShowButton.onclick = function(){
			/*左侧树显示*/
			templeftTree.style.left = 0;
			/*右侧主体恢复*/
			tempRightMain.style.width = "79.7%";		
		}
	}
}
