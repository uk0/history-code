/**
 * @author 第一作者：张建新,第二作者：张建新
 * Ajax封装类,所有的Ajax都需要通过此方法进行发送 以便进行相应的Ajax方式管理
 * 注意 $.support.cors = true; 用来解决Ajax跨域问题，此方法需要和后台数据接口相配合
 * successFun,errorFun,beforeSendFun,completeFun
 * 示例写法
 * var successFun = function functionName(data)
 * {
 * 		对Ajax解析过来的数据进行渲染
 * }
 * 将successFun作为参数传入方法中
 * @param {Object} actionUrl 数据请求地址
 * @param {Object} parems Ajax参数列表
 * @param {Object} sendMethod 发送方式
 * @param {Object} successFun 请求成功后回调函数
 * @param {Object} errorFun 请求错误时回调函数
 * @param {Object} beforeSendFun 在发送请求之前回调函数
 * @param {Object} completeFun 请求完成后回调函数 (请求成功或失败之后均调用)
 */
function ajaxLoad(actionUrl,parems,sendMethod,successFun,errorFun,beforeSendFun,completeFun){
	//解决ajax跨域问题
	$.support.cors = true;
	$.ajax( {
		url :actionUrl, //请求的url地址
		dataType : "json", //返回格式为json
		async : true,//请求是否异步，默认为异步，这也是ajax重要特性 
		data : parems, //参数值
		type :sendMethod, //请求方式
		// 状态
		beforeSend :beforeSendFun,
		success : successFun,
		complete : completeFun,
		error :errorFun
	});
}