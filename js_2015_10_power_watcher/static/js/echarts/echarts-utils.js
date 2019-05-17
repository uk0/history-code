/**
 * 参数列表
 * title 雷达图标题 字符串
 * subTitle 雷达图子标题 字符串
 * analyzeItems 分析项目 字符串数组 如分析北京 上海 广州 的农业林业牧业副业渔业 ['北京','上海','广州']
 * kindItems 雷达图对比分类 如事故分类 农业 林业 牧业 副业 渔业    ['农业', '林业', '牧业', '副业', '渔业']
 * datas对应行业的参数的二维数组，注意父数组长度对应对比分类 子数组长度应与分析项目长度相同，对应相应的对比项目下的分类的参数 如[[10,20,50],[30,80,100],[500,600,200],[700,800,900],[100,200,300]]
 */
function initRaderMap(title,
	analyzeItems,
	datas, drawPictureDiv,pictrueType,yTitle) {
	var myChart = echarts.init(document.getElementById(drawPictureDiv));

	option = {
		title: {
			text: title,
			x: 'center'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'horizontal',//默认为 水平布局，垂直布局为 'vertical
			padding: 3,
			data: analyzeItems,
			x: 'center',
			y: 'bottom'
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: false,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true, //启用拖拽重计算特性
		xAxis: [{
			type: 'category',
//			boundaryGap: false,
			data: getXAxisData(datas)
		}],
		yAxis: [{
			type: 'value',
			name:yTitle,
			axisLabel : {
                formatter: '{value}'      
            }
		}],
		series : getSeriesData(analyzeItems, datas, pictrueType)
	};
	myChart.setOption(option);
}
/**
 * 获取分析指标参数
 * @param {Object} kindItems 雷达图对比分类 如事故分类 农业 林业 牧业 副业 渔业    ['农业', '林业', '牧业', '副业', '渔业']
 * @param {Object} datas datas对应行业的参数的二维数组，注意父数组长度对应对比分类 子数组长度应与分析项目长度相同，对应相应的对比项目下的分类的参数 如[[10,20,50],[30,80,100],[500,600,200],[700,800,900],[100,200,300]]
 */
function getXAxisData(datas) {
	var indicatorArray = new Array(datas.length);
	for (var i = 0; i < indicatorArray.length; i++) {
		indicatorArray[i] = datas[i][0];
		datas[i].splice(0, 1);
	}
	return indicatorArray;
}
/**
 * 获取数据封装参数
 * @param {Object} analyzeItems 分析项目 字符串数组 如分析北京 上海 广州 的农业林业牧业副业渔业 ['北京','上海','广州']
 * @param {Object} datas对应行业的参数的二维数组，注意父数组长度对应对比分类 子数组长度应与分析项目长度相同，对应相应的对比项目下的分类的参数 如[[10,20,50],[30,80,100],[500,600,200],[700,800,900],[100,200,300]]
 */
function getSeriesData(analyzeItems, datas, pictrueType) {
	var seriesData = new Array(analyzeItems.length);
	for (var i = 0; i < analyzeItems.length; i++) {
		var dataItem = new Object();
		dataItem.data = getAnalyzeItem(i, datas);
		dataItem.name = analyzeItems[i];
		dataItem.type = pictrueType;
		dataItem.smooth = true;
		//					dataItem.itemStyle = {normal: {areaStyle: {type: 'default'}}};
		seriesData[i] = dataItem;
	}
	/*此函数不支持IE8 暂时注释*/
	//console.log(JSON.stringify(seriesData));
	return seriesData;
}
/**
 * 获取指定索引的所有分类数据
 * @param {Object} index 指定的索引
 * @param {Object} datas对应行业的参数的二维数组，注意父数组长度对应对比分类 子数组长度应与分析项目长度相同，对应相应的对比项目下的分类的参数 如[[10,20,50],[30,80,100],[500,600,200],[700,800,900],[100,200,300]]
 */
function getAnalyzeItem(index, datas) {
	var value = new Array(datas.length);
	for (var i = 0; i < value.length; i++) {
		value[i] = datas[i][index];
	}
	return value;
}
function drawPiePicture(drawPictureDiv, title, analyzeItems, datas) {
	// 基于准备好的dom，初始化echarts图表
	myChart = echarts.init(document.getElementById(drawPictureDiv));
	var option = {
		title: {
			text: title,
			x: 'center',
			textStyle:{
				color: '#333',
				fontStyle: 'normal',
				fontWeight: 'normal',
				fontFamily: 'sans-serief',
				fontSize: 25
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: analyzeItems,
			textStyle:{
				fontStyle: 'normal',
				fontWeight: 'normal',
				fontFamily: 'sans-serief',
				fontSize: 15
			}
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		series: [{
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: datas,
			itemStyle: {
				normal: {
					label: {
						show: true,
						formatter: '{b} : {c}' + '吨标煤' + ' ({d}%)',
						textStyle:{
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: 'sans-serief',
							fontSize: 15
						}
					},
					labelLine: {
						show: true
					}
				}
			}
		}]
	};
	// 为echarts对象加载数据 
	myChart.setOption(option);
}
function drawColummnPicture(echartsTitle, drawPictureDiv, analyzeItems) {
	// 基于准备好的dom，初始化echarts图表
	myChart = echarts.init(document.getElementById(drawPictureDiv));;
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: echartsTitle,
			x: 'center'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'horizontal',
			padding: 3,
			data: analyzeItems,
			x: 'center',
			y: 'bottom'
		},
		xAxis: [{
			type: 'category',
			data: ['系统效率']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '',
			type: 'bar',
			data: []
		}]
	};
	// 为echarts对象加载数据 
	myChart.setOption(option);
}
function drawColummnMap(title,
						analyzeItems,
						datas, 
						drawPictureDiv,
						yTitle) {
	var myChart = echarts.init(document.getElementById(drawPictureDiv));

	option = {
		title: {
			text: title,
			x: 'center'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'horizontal',
			padding: 1,
			data: analyzeItems,
			x: 'center',
			y: 'bottom',
			itemWidth: 10,             // 图例图形宽度
        	itemHeight: 5,  		   // 图例图形高度
        	textStyle: {
            	fontSize:7                // 图例文字大小
        	}
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: false,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true, //启用拖拽重计算特性
		xAxis: [{
			type: 'category',
			data: getXAxisDataOne(datas)
		}],
		yAxis: [{
			type: 'value',
			name:yTitle
		}],
		series: getSeriesDataOne(analyzeItems, datas)
	};
	myChart.setOption(option);
}
			function getXAxisDataOne(pictrueDatas) {
				var indicatorArray = new Array(pictrueDatas.length);
				for (var i = 0; i < indicatorArray.length; i++) {
					indicatorArray[i] = pictrueDatas[i][0];
					pictrueDatas[i].splice(0, 1);
				}
				return indicatorArray;
			}
			function getSeriesDataOne(testAnalyzeItems, pictrueDatas) {
				var seriesData = new Array(testAnalyzeItems.length);
				for (var i = 0; i < testAnalyzeItems.length; i++) {
					var dataItem = new Object();
					dataItem.data = getAnalyzeItem(i, pictrueDatas);
					dataItem.name = testAnalyzeItems[i];
					dataItem.type = 'bar';
					dataItem.smooth = true;
					seriesData[i] = dataItem;
				}
				return seriesData;
			}
			function testAnalyzeItems(index, pictrueDatas) {
				var value = new Array(pictrueDatas.length);
				for (var i = 0; i < value.length; i++) {
					value[i] = datas[i][index];
				}
				return value;
			}