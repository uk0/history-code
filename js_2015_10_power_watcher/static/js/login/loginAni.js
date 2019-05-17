/**
 * 登录模块对象动画
 */
var loginPage = {
	/**
	 * 页面展示类
	 * @param {Object} timeInterval 时间间隔
	 * @param {Object} div1 展示背景图片Div1
	 * @param {Object} div2 展示背景图片Div2
	 * @param {Object} backGroundUrls 图片序列
	 * @param {Object} imgIndex 开始图片索引
	 * @param {Object} className 动画名称
	 */
	init:function(timeInterval, loginShowImgDiv1, loginShowImgDiv2, backGroundUrls,imgIndex, className){
		this.timeInterval = timeInterval;
		this.loginShowImgDiv1 = loginShowImgDiv1;
		this.loginShowImgDiv2 = loginShowImgDiv2;
		this.imgIndex = imgIndex;
		this.backGroundUrls = backGroundUrls;
		this.className = className;
		/*创建临时指针指向类本身*/
		var THIS = this;
		/*创建函数指针解决setInterval不能传递对象参数的问题*/
		var intervalFunction = (function(){
			THIS.imageShow();
		});
		this.interval = setInterval(intervalFunction,
							        this.timeInterval);				
	},
	/*登录展示图片DIV1*/
	loginShowImgDiv1 : {
	},
	/*登录展示图片DIV2*/
	loginShowImgDiv2 : {			
	},
	/*背景图Url*/
	backGroundUrls : {	
	},
	/*时间间隔*/
	timeInterval : {
	},
	/*定时器*/
	interval : {
	},
	/*图片索引*/
	imgIndex : {	
	},
	/*动画名称*/
	className :{
	},
	/*图片展示*/
	imageShow : function() {
		this.loginShowImgDiv1.style.background = 'url(' + this.backGroundUrls[this.imgIndex] +')';
		this.imgIndex ++;
		if(this.backGroundUrls.length == this.imgIndex){
			this.imgIndex = 0;
		}
	}
};