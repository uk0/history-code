/*
 * 页面初始化脚本
 */
window.onload = function initMain() {
	/*
	 * 初始化UI控件
	 */
	mainUIControl.init(document.getElementById("leftTree"), //左侧树
		document.getElementById("rightMain"), //右侧主窗体
		document.getElementById("leftTreeBackButton"), //左侧树缩回按钮
		document.getElementById("leftTreeShowButton")); //左侧树弹出按钮
	Toast("初始化UI控件完毕");
	/*主功能初始化*/
	mainInit.init();
}
var mainInit = {
	/*主功能组件初始化*/
	init: function() {
		/*
		 * 主页功能初始化
		 */
		mainInit.initFeatureInfo();
		mainPageFeature.init();
	},
	/*功能组件初始化*/
	initFeatureInfo: function() {
		/**
		 * 获取功能信息数据
		 */
		ajaxLoad(
			'../static/js/main/feature.json', //获取请求数据接口
			null, //参数
			"get", //请求方式
			function(result) { //成功执行函数
				mainInit.initFeatureInfoSuccess(result.resultData);
			},
			function() { //失败执行函数
				//console.log("获取ajax获取功能信息接口失败")
			},
			function() { //最终执行函数
				//console.log("获取ajax获取功能信息接口完毕")
			}
		);
	},
	/**
	 * 初始化功能模块成功函数
	 * @param {Object} resultData 功能结果信息集
	 */
	initFeatureInfoSuccess: function(resultData) {
		console.log("*--------------------------------------------*");
		console.log(resultData);
		featureControl.init(resultData, //设置功能信息
			document.getElementById("dataAdminControl"), //加载数据管理模块
			document.getElementById("leftTree")); //加载左侧树模块
		/*初始化数据管理模块*/
		mainInit.initDataAdmin();
		/*
		 * 初始化上下文组件
		 * 默认加载节能统计模块
		 */
		mainInit.initApplication();
		Toast("功能模块初始化完毕");
	},
	/*上下文初始化*/
	initApplication: function() {
		/*上下文初始化*/
		applicationContext.init(document.getElementById("dataAdmin"), //设置当前功能模块
							    document.getElementById("systemMainBar"),//设置当前工具条
							    featureControl.dataAdmin.featureData) //设置当前功能模块信息

	},
	/*初始化数据管理模块*/
	initDataAdmin: function() {
		productionWellDailyDataFeature.init();
	},
}