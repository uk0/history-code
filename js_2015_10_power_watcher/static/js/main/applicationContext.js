/**
 * 程序上下文对象
 * 包含：当前所选组织机构数组
 * 	        当前操作div
 * 	        当前功能实体
 * 	        切换当前状态
 */
var applicationContext = {
	/*程序上下文对象*/
	init:function(currentDiv,
				  currentFeatureBar,
				  currentFeature){
		/*设置当前Div*/
		this.currentDiv = currentDiv;
		/*设置左边距为0*/
		this.currentDiv.style.marginLeft = "0";
		/*设置当前的功能条*/
		this.currentFeatureBar = currentFeatureBar;
		/*初始化时为系统功能条,以此系统功能条*/
		this.systemFeatureBar = currentFeatureBar;
		/*设置系统当前功能*/
		this.currentFeature = currentFeature;
		/**
		 * 判断是否实现功能加载回调函数
		 * 如果实现 则执行回调函数
		 * 如果未实现 则提示未实现该回调函数
		 */
		if(this.currentDiv.onLoadfeature){
			this.currentDiv.onLoadfeature(this.currentFeature);
		}else{
			Toast("当前模块没有实现onLoadfeature功能加载监听功能！");
		}
	},
	/*当前的组织机构信息列表*/
	currentOrganization : null,
	/*当前对比组织机构信息列表*/
	currentSecondOrganization : null,
	/*当前的显示Div*/
	currentDiv : null,
	/**当前显示的功能条*/
	currentFeatureBar : null,
	/**系统功能条*/
	systemFeatureBar : null,
	/**当前的功能*/
	currentFeature : null,
	/**
	 * 切换当前的功能
	 * @param {Object} covertFeature 当前切换功能的功能信息
	 */
	convertCurrentfeature : function(covertFeature) {
		/**
		 * 调用垃圾回收方法
		 *  使用点一：
		 * 	在数据管理功能中，某些功能可能会在HandStoneTable中加载过量的数据，
		 *  因此此时及时的清空Div可以避免网页卡顿
		 */
		if(applicationContext.currentDiv.gc){
			applicationContext.currentDiv.gc();
		}
		
		/*如果切换功能不为当前功能*/
		if(this.currentFeature != covertFeature){
			//设置当前功能为切换功能
			this.currentFeature = covertFeature;
			//如果为开发状态，则切换至开发状态 终止执行方法
			if(this.checkIsDeveloping(covertFeature))return;
				
			//切换当前功能Div
			this.covertCurrentDiv(document.getElementById(covertFeature.featureKey));
			
			/**
			 * 调用功能条转换器
			 */
			this.covertCurrentFeatureBarController(covertFeature);
			/**
			 * 判断是否实现功能加载回调函数
			 * 	如果实现 则执行回调函数
			 * 	如果未实现 则提示未实现该回调函数
			 */

			if(this.currentDiv.onLoadfeature){

				this.currentDiv.onLoadfeature(this.currentFeature);
			}else{
				Toast("当前模块没有实现onLoadfeature功能加载监听功能！");
			}
			
			
		}
	},
	/*
	 * 检查是否为开发状态如果为开发状态，如果为开发状态则切换到开发状态
	 */
	checkIsDeveloping : function(feature) {
		/**
		 * 如果找到相应的Div则返回false
		 * 证明为非开发状态
		 * 如果找不到相应的Div则切换到开发页面
		 */
		if(document.getElementById(feature.featureKey))return false;
		this.covertToDeveloping(feature);
		return true;
	},
	/*
	 * 切换至开发状态
	 */
	covertToDeveloping : function(feature){	
		var developingDiv = document.getElementById("developing");
		applicationContext.setDevelopFeatrueInfo(feature);
		this.currentDiv.style.marginLeft = "-100%";
		this.currentDiv.style.opacity = 0;
		this.currentDiv = developingDiv;
		this.currentDiv.style.marginLeft = "0";
		this.currentDiv.style.opacity = 1;
	},
	/*
	 * 切换当前显示的Div
	 */
	covertCurrentDiv : function(convertDiv){
		this.currentDiv.style.marginLeft = "-100%";
		this.currentDiv.style.opacity = 0;
		this.currentDiv = convertDiv;
		this.currentDiv.className = "featureDiv";
		this.currentDiv.style.marginLeft = "0";
		this.currentDiv.style.opacity = 1;
	},
	/*
	 * 工具条切换器 
	 */
	covertCurrentFeatureBarController : function(covertFeature){
		switch (covertFeature.featureClassification){
			case "dataAdmin": 
				this.covertCurrentFeatureBar(dataAdminTitleBarFeature.dataAdminSelectBar); 
				dataAdminTitleBarFeature.covertDataAdminFeature(covertFeature);
				break;
			default: 
				this.covertCurrentFeatureBar(applicationContext.systemFeatureBar);  
				break;
		}
	},
	/**
	 * 切换当前的功能条
	 * @param {Object} convertDiv
	 */
	covertCurrentFeatureBar : function(convertFeatrueBar){
		if(convertFeatrueBar == this.currentFeatureBar) return;
		this.currentFeatureBar.style.left = "-100%";
		this.currentFeatureBar.style.opacity = 0;
		this.currentFeatureBar = convertFeatrueBar;
		this.currentFeatureBar.style.left = "0";
		this.currentFeatureBar.style.opacity = 1;
	},
	/*设置开发步骤信息*/
	setDevelopFeatrueInfo : function(feature){
		var developTitle = document.getElementById("developingTitle");
		developTitle.innerHTML = feature.featureName + "正在完善中...";
		/*var developingFeatureRule = document.getElementById("developingFeatureRule");
		developingFeatureRule.innerHTML = feature.featureName + "正在开发中...<br />";
		developingFeatureRule.style.fontSize = "20px";
		if(feature.featureList.length != 0){
			developingFeatureRule.innerHTML += "其子功能有：<br />"
			for(var i = 0; i < feature.featureList.length; i ++){
				developingFeatureRule.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.featureList[i].featureName + "<br />";
			}
		}
		document.getElementById("developingStep1").innerHTML = 'Step1：此功能对应的Div的ID为：' + feature.featureKey;
		document.getElementById("developingStep2").innerHTML = 'Step2：此功能对应的CSS样式的文件名为：' + feature.featureKey + '.css';
		document.getElementById("developingStep3").innerHTML = 'Step3：此功能对应的JS脚本文件名为：' + feature.featureKey + '.js';
		document.getElementById("developingStep4").innerHTML = 'Step4：注意将CSS样式与JS脚本放置到main.html相应的位置';
		document.getElementById("developingStep5").innerHTML = 'Step5：在' + feature.featureKey + '.css文件中编写相应的样式';
		document.getElementById("developingStep6").innerHTML = 'Step6：在' + feature.featureKey + '.js文件中编写相应的脚本,组件名称为：' + feature.featureKey + 'Feature <br>';
		document.getElementById("developingStep6").innerHTML += '注意在init方法中获取添加的ID为' + feature.featureKey + '的Div,同时给其注册onLoadfeature方法以及onDataChange方法（见下图示例）';
		document.getElementById("developingStep7").innerHTML = 'Step7：在mainBase.js中调用相应组件的init方法，此模块对应的调用方法为' + feature.featureKey + 'Feature.init()';*/
	}
}
