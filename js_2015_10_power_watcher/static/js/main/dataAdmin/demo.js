
var productionWellDailyDataFeature = {
	/*
	 * 采出井生产日数据表初始化
	 */
	init: function() {
		/**获取载体Div*/
		this.productionWellDailyDataDiv = document.getElementById("productionWellDailyData");
		/**获取载体Div ->> Div**/
		this.productionWellDailyDataMainControl = document.getElementById("productionWellDailyDataMain");
		/**获取表格载体Div*/
		this.productionWellDailyDataTableContainer = document.getElementById("productionWellDailyDataTable");
		/**注册功能加载回调方法**/
		this.productionWellDailyDataDiv.onLoadfeature = this.onLoadfeature;
		/**注册数据变化回调方法 **/
		this.productionWellDailyDataDiv.onDataChange = this.onDataChange;
		/**修改时间跨度**/
		this.productionWellDailyDataDiv.onDateChange = this.onDateChange;
		/**保存加载过来的数据到sys数据库**/
		this.productionWellDailyDataDiv.onDataSave = this.onDataSave;
		/**垃圾回收*/
		this.productionWellDailyDataDiv.gc = this.gc;
		/**从能耗数据库加载本地筛选数据注册这个事件,给TatileBar提供会掉函数**/
		this.productionWellDailyDataDiv.getFecsDataToForm = this.getFecsDataToForm;
					/**isNeedDate**/
		this.productionWellDailyDataDiv.isNeedDate = this.isNeedDate;
	},
	/*
	 * 模块载体Div
	 */
	productionWellDailyDataDiv: null,
	/**
	 *模块主体Div
	 */
	productionWellDailyDataMainControl: null,
	/**
	 * 表格载体Div
	 */
	productionWellDailyDataTableContainer: null,
	/**
	 * 数据改变回调方法
	 * @param {Object} currentFeature 当前选择的功能
	 * @param {Object} currentOrganization 当前选择的组织
	 */
	 /**无用的双击时间*/
	onDataChange: function(currentFeature) {
	
	},
	/*
	 * 采出井生产日数据表脚本功能加载初始化模块
	 */
	onLoadfeature: function(currentFeature) {
		//基础加载采出井生产日数据表[本地数据]
		Toast("支付模块,[本地数据]");
	},

	onDateChange: function(currentFeature, currentEntity, currentDateInfo) {

	},
	/**
	 * 点击保存数据按钮回调函数
	 * @param {Object} currentFeature 当前的功能信息
	 * @param {Object} currentEntity 当前选择的数据采集实体信息
	 * @param {Object} currentDateInfo 当前的时间信息
	 */
	 /** 采出井生产日数据表 查询完成并且显示的数据,就行保存[保存冲数据]**/
	onDataSave: function(currentFeature, currentEntity, currentDateInfo) {
			/*将数据装入要提交的容器 */
		HandtableTools.objData();
		alert("准备提交的数据:"+JSON.stringify(HandtableTools.insertData));
		alert("提交地址："+applicationContext.currentFeature.featureURL);
		console.log(JSON.stringify(HandtableTools.insertData));
		ajaxLoad(serverPath + applicationContext.currentFeature.featureURL, {
				'data': JSON.stringify(HandtableTools.insertData)
			},
			"post",
			function(result) {
				alert(result.resultMsg);
				//alert(applicationContext.currentFeature.featureURL);
			},
			function(error) {
				//alert(JSON.stringify(error));
				alert("当前网络不稳定,请重试");
			}
		);
	},
	/**初始化[ 采出井生产日数据表] 格数据**/
	initTable: function(currentFeature, currentEntity, currentDateInfo) {
		ajaxLoad(serverPath + "dm/getInterface", 
			{'featureId': currentFeature.featureId },
			"post",
			function(columnDataResult) {
				/** 采出井生产日数据表 ,基础列信息,以及列对应关系.**/
				productionWellDailyDataFeature.colType = columnDataResult.colType;
				/** 采出井生产日数据表 初始化,列基本信息。**/
				HandtableTools.initColumnsType(productionWellDailyDataFeature.productionWellDailyDataTableContainer,productionWellDailyDataFeature.colType,false,false);
				/**从本地数据库获取表格数据[采出井生产日数据表]**/
				productionWellDailyDataFeature.initTableData(currentFeature, currentEntity, currentDateInfo, 1);
			},
			function(error) {
				alert("当前网络不稳定,请重试");
			}
		);
	},
	/**通过HandtableTools.initColumnsType初始化列类型,以及数据**/
	initTableData:function(currentFeature, currentEntity, currentDateInfo,dataBaseFlag) {
	},
	/**
	 * 表格列信息
	 */
	colType : null,
	
	/**清空当前div*/
		gc:function(){
			productionWellDailyDataFeature.productionWellDailyDataTableContainer.innerHTML = '';
		},
	/**
	 * 筛选类型[组织机构筛选]
	 */
	/**isNeedDate **/
	isNeedDate:true,
}
