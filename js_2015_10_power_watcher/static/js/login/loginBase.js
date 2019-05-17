/*页面加载*/
window.onload = function(){
	loginPage.init(12000,
				   document.getElementById("loginShowImg1"),
				   document.getElementById("loginShowImg2"),
				   ["static/img/login/showImg1.png",
				    "static/img/login/showImg2.png",
				    "static/img/login/showImg3.png"],
				   0,
				   "imgShowAni");
}