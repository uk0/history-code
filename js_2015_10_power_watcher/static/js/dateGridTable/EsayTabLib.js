/***
 * 	2015-11-5 张建新
 * GridId table id
/** Columns Start**/  
//全局变量
var array =[];
var columns=[];

var Etb ={

	LoadColumns:function(TabCol){
	for(var i=0;i<TabCol.length;i++){
		array.push({field:'',title:'',width:'',align:'',formatter:''});
	}
	columns.push(array);
	for(var i=0;i<TabCol.length;i++){
		columns[0][i]['field']= ""+TabCol[i].fieid+"";
		columns[0][i]['title']= ""+TabCol[i].alias+"";
		columns[0][i]['width']= 100;
		columns[0][i]['align']= "center";
	}
	alert("序列化后的JSON:"+JSON.stringify(columns));
	return columns;
},

/**initDataGrid*/
initDataGrid:function (GridId,D,T){
var obj = { 'total': D.total, 'rows':D.rows};
	$("#"+GridId+"").datagrid({  
		url: null,  
		pagination: true,  
		pageSize: 20,  
		pageNumber: 1,  
		rownumbers: true,  
		fitColumns: false,  
		columns: Etb.LoadColumns(T)

	});  
	$("#"+GridId+"").datagrid('loadData', obj);
}
}


