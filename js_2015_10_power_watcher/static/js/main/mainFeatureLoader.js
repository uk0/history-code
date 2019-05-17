/*
 * 右上角动态功能初始化
 * 左侧树功能切换初始化
 * 作者：张建新 	2015年12月16日
 */
var featureControl = {
	init : function(featureDatas,dataAdmin,leftTree){
		/*获取功能信息*/
		this.featureDatas = featureDatas;
		/*引用数据管理系统模块UI控件*/
		this.dataAdmin = dataAdmin;
		/*左侧树控件*/
		this.leftTree = leftTree;
		/*加载功能*/
		this.loadFeature();
		/*初始状态左侧树不加载功能*/
		this.isFeaturesInLeftTree = false;
	},
	/*功能列表*/
	featureDatas : null,
	/*数据管理控件*/
	dataAdmin : null,
	/*左侧树*/
	leftTree : null,
	/*是否左侧树加载功能*/
	isFeaturesInLeftTree : null,
	/*当前功能类别*/
	currentFeatureClassification : null,
	/*加载功能*/
	loadFeature : function(){
		/*初始化数据管理*/
		this.initDataAdmin();
	},
	/*初始化数据管理控件*/
	initDataAdmin : function() {
		/*添加标识位，标识为左侧树功能节点控件*/
		this.dataAdmin.isLeftTreeFeatureControl = true;
		/*初始化功能信息到相应控件*/
		this.dataAdmin.featureData = this.getTopFeature("dataAdmin");
		/**
		 * 设置功能分类
		 */
		this.dataAdmin.featureData.featureClassification = "dataAdmin";
		/*这是模块别名THIS引用*/
		var THIS = this;
		/*
		 * 由于数据管理项目过多因此，当点击数据管理时，功能显示在左侧树中 
		 */
		this.dataAdmin.onclick = function(){
			/*
			 * 初始化功能到左侧树
			 */
			THIS.initFeatureToLeftTree(THIS.getTopFeature("dataAdmin"),
								   	   THIS.leftTree,
									   "dataAdmin");
			/**
			 * 通过程序上下文 切换当前功能
			 */
			applicationContext.convertCurrentfeature(THIS.dataAdmin.featureData);
		}
		
	},
	/**
	 * 初始化功能到右上侧功能列表
	 * @param {Object} featureData 子功能数据
	 * @param {Object} childrenFeatureList 子功能列表控件
	 * @param {Object} featureClassification 功能类别
	 *
	 *
	 * 												 "dataAdmin"				数据管理
	 *
	 */
	initFeatureToFeatureList : function(featureData, featureControl, featureClassification) {
		/*初始化功能到控件*/
		this.initFeatureToControl(featureData,featureControl, featureClassification)
		/*获取子功能列表控件*/
		var childrenFeatureList = $(".systemChildrenFeatureList",featureControl)[0];
		/*清空列表*/
		childrenFeatureList.innerHTML = "";
		/*遍历子功能列表添加下拉菜单*/
		for(var i = 0; i < featureData.featureList.length; i ++) {	
			/*创建下拉列表子项*/
			var childrenFeatureControl = document.createElement("div");
			/*加载相应功能信息到控件*/
			this.initFeatureToControl(featureData.featureList[i],childrenFeatureControl, featureClassification);
			/*控件内文本*/
			childrenFeatureControl.innerHTML = childrenFeatureControl.featureData.featureName;
			/*设置控件样式*/
			childrenFeatureControl.className = "systemChildrenFeature";
			/*添加子菜单*/
			childrenFeatureList.appendChild(childrenFeatureControl);
		}
	},
	/**
	 * 初始化功能到左侧树
	 * @param {Object} featureData 子功能权限数据
	 * @param {Object} leftTreeList 左侧树列表
	 * @param {Object} featureClassification 功能类别 "energyDataStatistical"	节能统计
	 * 												 "dataAnalysis"          	对标分析
	 * 												 "energySpecial"  		  	节能专项
	 * 												 "dataAdmin"				数据管理
	 * 												 "systemAdmin"				系统管理
	 */
	initFeatureToLeftTree : function(featureData,
									 leftTreeList,
									 featureClassification) {
		
		/**
		 * 如果功能列表不再左侧树（则为单位列表）
		 * 则清空左侧树
		 * 加载相应功能列表
		 */
		if(!this.isFeaturesInLeftTree){
			/*获取根节点文本控件*/
			var rootNodeText = $(".RootNodeText",this.leftTree)[0];
			/*设置相应的根节点文本为相应功能*/
			rootNodeText.innerHTML = featureData.featureName;
			/*获取根节点回退按钮*/
			var rootNodeBackButton = document.getElementById("RootNodeBackButton");
			/*隐藏回退按钮*/
			rootNodeBackButton.style.display = "none";
			/*清空左侧树列表*/
			this.clearLeftTreeNodes();
			/*循环遍历功能子项，加载功能信息*/
			for(var i = 0; i < featureData.featureList.length; i ++) {	
				/*创建树节点子项*/
				var childrenFeatureControl = document.createElement("div");				
				/*添加标识位，标识为左侧树功能节点控件*/
				childrenFeatureControl.isLeftTreeFeatureControl = true;
				/*加载相应功能信息到控件*/
				this.initFeatureToControl(featureData.featureList[i],childrenFeatureControl,featureClassification);
				/*控件内文本*/
				childrenFeatureControl.innerHTML = childrenFeatureControl.featureData.featureName;
				/*设置控件样式*/
				childrenFeatureControl.className = "treeNode";
				/*添加树节点子项*/
				this.leftTree.appendChild(childrenFeatureControl);
			}
			/*设置功能是否在左侧树上 设置为在左侧树*/
			this.isFeaturesInLeftTree = true;
		}
	},
	/*清空左侧树列表*/
	clearLeftTreeNodes : function(){
		//获取组织机构树
		var leftTreeList = document.getElementById("leftTreeList");
		//组织机构树设为不可见
		leftTreeList.innerHTML = "";
	},
	/*获取顶层功能*/
	getTopFeature : function(featureKey){
		for(var i = 0; i < this.featureDatas.length; i ++) {
			if(this.featureDatas[i].featureKey == featureKey){
				return this.featureDatas[i];
			}
		}
	},
	/*初始化功能信息到相应的控件*/
	initFeatureToControl : function(featureData,control,featureClassification){
		/*设置功能信息*/
		control.featureData = featureData;
		/*设置功能对应下级子功能信息*/
		control.featureList = featureData.featureList;
		/*设置功能所属功能分类*/
		control.featureData.featureClassification = featureClassification;
		/*注册点击事件测试功能*/
		control.onclick = function(event){
			/**
			 * 通过程序上下文 切换当前功能
			 */
			applicationContext.convertCurrentfeature(control.featureData);
			/**
			 * 阻止事件冒泡
			 */
			var e=event || window.event;
	        if (e && e.stopPropagation){
	            e.stopPropagation();    
	        }
	        else{
	            e.cancelBubble=true;
	        }
		}
	}
}
