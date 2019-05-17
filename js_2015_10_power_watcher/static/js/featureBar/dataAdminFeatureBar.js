/***
 *	dataAdminTitleBarFeature 数据管理工具条初始化
 */
var dataAdminTitleBarFeature = {
	/**
	 * 工具管理条初始化
	 */
	init: function() {
		/**
		 * 获取数据管理工具条所有组件
		 */
		this.getBarControls();
	},
	/**
	 * 数据管理选项工具条
	 */
	dataAdminSelectBar: null,
	

	/**
	 * 保存数据按钮
	 */
	dataAdminSaveCurrentDataButton: null,
	/**
	 * 显示表名控件
	 */
	dataAdminTableTitle: null,
	/**
	 * 回调数据管理功能切换方法
	 * @param {Object} covertFeature 当前的功能
	 */
	covertDataAdminFeature: function(covertFeature) {
		/**
		 * 调用组织机构OnloadFeature方法
		 */
		console.log("--------------------------------------");
		console.log(covertFeature.featureName);
		if (covertFeature) { //如果传入当前功能参数有效
			//设置表头
			this.dataAdminTableTitle.innerHTML = covertFeature.featureName;
		}
	},
	/**
	 * 获取工具条组件
	 */
	getBarControls: function() {
		/**
		 * 数据管理工具条
		 */
		this.dataAdminSelectBar = document.getElementById("dataAdminSelectBar");
		/**
		 * 表名控件
		 */
		this.dataAdminTableTitle = document.getElementById("dataAdminTableTitie");

		/**
		 * 获取保存数据按钮
		 */
		this.dataAdminSaveCurrentDataButton = document.getElementById("dataAdminSaveCurrentDataButton");
		/**
		 * 初始化按钮点击事件
		 */
		this.initButtonOnClick();
	},
	/**
	 * 初始化按钮点击事件
	 */
	initButtonOnClick: function() {
		/**
		 * 初始化保存数据点击按钮事件
		 */
		this.dataAdminSaveCurrentDataButton.onclick = function() {
            Toast("dataAdminSaveCurrentDataButton")
        }
    }
}