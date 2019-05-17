var mainPageFeature = {
	init : function(){
		/**
		 * 主页点击按钮
		 */
		this.mainPageButton = document.getElementById("featureMainPageButton");
		/**
		 * 页面主体框架
		 */
		this.mainPage = document.getElementById("mainPage");
		/**
		 * 页面主界面主体
		 */
		this.mainPageMain = document.getElementById("mainPageMain"); 
		/**
		 * 主页按钮点击事件
		 */
		this.mainPageButton.onclick = mainPageFeature.clickToMainPage;
		/**
		 * 注册数据变化方法
		 */
		this.mainPage.onDataChange = mainPageFeature.onDataChange;
		/**
		 * 注册功能加载方法
		 */
		this.mainPage.onLoadfeature = mainPageFeature.onLoadfeature;

	},
	/**
	 * 主页按钮
	 */
	mainPageButton : null,
	/**
	 * 主页
	 */
	mainPageMain : null,
	/**
	 * 点击到主页事件
	 */
	clickToMainPage : function(){
		applicationContext.covertCurrentDiv(mainPageFeature.mainPage);
	},
	/**
	 * 数据点击转换事件
	 * @param {Object} currentFeature
	 * @param {Object} currentOrganization
	 */
	onDataChange: function(currentFeature) {
		alert("数据变化");
	},
	/**
	 * 主页加载执行事件
	 * @param {Object} currentFeature
	 * @param {Object} currentOrganization
	 */
	onLoadfeature: function(currentFeature) {
		alert("主页加载");
	}
}
