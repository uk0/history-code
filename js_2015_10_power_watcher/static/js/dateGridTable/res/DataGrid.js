/***
 * 	2015-11-5 张建新
* GridId table id
*
*  aUrl ：数据提交地址 ,返回参数[ResponseResult]里面封装了ROWS ,Tatol [满足条件的数据,总数据条数]
* 
* 
*  cUrl ：列名提交地址 ,返回参数是[List<map1> <map2>,分别带有参数 name ,text] 注意大小写！
**/
 /** Columns Start**/  
//全局变量
var array =[];
var columns=[];

//英文列明
var tatile = [];
//中文列明
var ch_title=[];

		function LoadColumns(cUrl){
		$.ajax({
			url:cUrl,
			async: false,
			success : function(dataC){//JSON
			tatile = dataC[0].name;
			ch_title = dataC[0].text;
	//alert(data[0].name.length+"data:"+data[0].name[1]);
 		 for(var i=0;i<dataC[0].name.length;i++){
		 array.push({field:'',title:'',width:'',align:'',formatter:''});
		 }
 		 
      	 columns.push(array);
      	  for(var i=0;i<dataC[0].name.length;i++){
      		  	if(dataC[0].name[i].toLocaleUpperCase()== "OILTYPE"){
      		 		 columns[0][i]['field']= ""+dataC[0].name[i]+"";
      		  		 columns[0][i]['title']= ""+dataC[0].text[i]+"";
     				 columns[0][i]['width']= 100;
     				 columns[0][i]['align']= "center";
     				 columns[0][i]['formatter']= rowformater;
     				 
      		  	}else{
      		  		
      		  		 columns[0][i]['field']= ""+dataC[0].name[i]+"";
      		  		 columns[0][i]['title']= ""+dataC[0].text[i]+"";
     				 columns[0][i]['width']= 100;
     				 columns[0][i]['align']= "center";
      		  		 columns[0][i]['formatter']= '';
      		  	}
			}
		}
	});
		
		
	return columns;
} 
/**initDataGrid*/
	function initDataGrid(GridId,aUrl,cUrl){
	
		 
        $("#"+GridId+"").datagrid({  
            title : '数据表格',  
            iconCls : 'icon-data',  
            fit: false, 
            width : '1200px',  
            pageSize : 20,//页面大小  
            pageList : [ 10, 20, 25, 30 ],//page下拉 
            nowrap : false,//设置为true，当数据长度超出列宽时将会自动截取    
            striped : true,//设置为true将交替显示行背景。    
            collapsible : false,//显示可折叠按钮    
            idField:'UNITCODE',	//主键列
            toolbar:"#buttonAreas",//在添加 增添、删除、修改操作的按钮要用到这个    
       		url:aUrl,//url调用Action方法  
            loadMsg : '数据装载中......',  
            singleSelect:true,//为true时只能选择单行
            //fitColumns:false,//允许表格自动缩放，以适应父容器    
            //sortName : 'xh',//当数据表格初始化时以哪一列来排序    
            //sortOrder : 'desc',//定义排序顺序，可以是'asc'或者'desc'（正序或者倒序）。    
            remoteSort : false,  
             frozenColumns : [ [ {  
                field : 'ck',  
                checkbox : true  
            } ] ],   
            
            // Load Columns 
            columns:LoadColumns(cUrl),
            pagination : true,//分页  
            rownumbers : true,//行数  
          
            onDblClickRow:function(rowIndex, rowData){
				//双击某一行 打开编辑页面
            	editRowDate();
        	//$('#DataMDialog').dialog('open');
        	
        	
        	//alert("行号"+rowIndex+"数据:"+rowData.eval(","));
        	
        	//$('#DataMDialog').dialog().panel("setTitle","数据编辑")
			//$(this).datagrid("getPanel").panel("setTitle","new title")
        	
        		//editRowDate();
			
			 }
        });   
}
	
	//稠油 稀油
	function rowformater(val){
			
			if(val =="1"){
				val = "<span style=\"color:black\" >稠油</span>";
			}
			if(val =="0"){
				val = "<span style=\"color:blue\" >稀油</span>";
				
			}
			if(val == "2"){
				val="<span style=\"color:red\" >--</span>";
			}
		return val;
	}
  	