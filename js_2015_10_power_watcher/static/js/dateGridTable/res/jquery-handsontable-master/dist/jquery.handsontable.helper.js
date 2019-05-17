function sheetafterChange(container, changes, source) {
    if (source == 'edit') {
        var settings = container.handsontable("getSettings");
        var minCreateRows = settings.minCreateRows; //每次最少添加行数
        var columns = settings.columns; //字段配置
        var countRows = container.handsontable("countRows"); //总行数
        var currrownum = changes == null ? countRows - 1 : changes[0][0]; //当前行号
        if ((currrownum + 1) == countRows) {
            //添加指定行，并赋初始值
            for (var i = 0; i < minCreateRows; i++) {
                var defaultvalues = []; //存放初始值
                for (var m = 0; m < columns.length; m++) {
                    var value = [];
                    if (typeof columns[m].value != 'undefined' && columns[m].value != '') {
                        value = columns[m].value.split('|');
                    }
                    if (value.length > 0) {
                        defaultvalues.push([countRows + i, columns[m].data, value[i] != undefined ? value[i] : value[0]]);
                    }
                }
                container.handsontable("alter", 'insert_row');
                container.handsontable("setDataAtRowProp", defaultvalues, 'empty');
                //container.handsontable("setDataAtCell", countRows + i, 4, '检测', 'empty');
            }
            //是否合并
            if (minCreateRows > 1) {
                for (var m = 0; m < columns.length; m++) {
                    if (columns[m].ismerger === true) {
                        cellMerge(container, [countRows, m, countRows + minCreateRows - 1, m]);
                    }
                }
            }
        }
    }
}
var leafHeaders = []; //树叶集合
var leafWidths = []; //树叶宽度集合
var allWidths = 100; //树叶宽度
function treeToColumns(treedata) {
    leafHeaders = [];
    leafWidths = [];
    allWidths = 100;
    var columns = []; 
    GetleafHeaders(treedata);
    for (var i = 0; i < leafHeaders.length; i++) {
        leafWidths.push(leafHeaders[i].width);
        allWidths += parseInt(leafHeaders[i].width);
        if (typeof leafHeaders[i].hidden == 'undefined' || leafHeaders[i].hidden == true) {
            columns.push({
                data: leafHeaders[i].id,
                value: (typeof leafHeaders[i].value == 'undefined' ? '' : leafHeaders[i].value),
                ismerger: ((typeof leafHeaders[i].ismerger == 'undefined' || leafHeaders[i].ismerger == '0') ? false : true)
            });
        }
    }
    return columns;
}
function GetleafHeaders(data) {
    var nextth = [];
    var colsnum = 0;
    for (var i = 0; i < data.length; i++) {
        var children = data[i].children != undefined ? data[i].children : [];
        if (children.length == 0) {
            var index = leafHeaders.length;
            for (var t = 0; t < leafHeaders.length; t++) {
                if (parseFloat(data[i].leafnum) < parseFloat(leafHeaders[t].leafnum)) {
                    index = t;
                    break;
                }
            }
            leafHeaders.splice(index, 0, data[i]);
        }
        for (var m = 0; m < children.length; m++) {
            if (children[m] != undefined) {
                nextth.push(children[m]);
            }
        }
    }
    if (nextth.length > 0) { GetleafHeaders(nextth); }
}
//合并单元格
function cellMerge(container, corners) {
    if (corners == undefined) { throw new Error("未选择单元格"); }
    if (corners[1] != corners[3]) { throw new Error("只能上下合并"); }
    var firstcell = container.handsontable("getCell", corners[0], corners[1]);
    var endcell = container.handsontable("getCell", corners[2], corners[3]);
    $(firstcell).attr('rowspan', corners[2] - corners[0] + 1);
    for (var i = 0; i < corners[2] - corners[0]; i++) {
        var hidecell = container.handsontable("getCell", corners[0] + i + 1, corners[1]);
        $(hidecell).hide().addClass("merge_Hide");
    }
}
function sheetafterMerge(container) {
    var settings = container.handsontable("getSettings");
    var minCreateRows = settings.minCreateRows; //每次最少添加行数
    var columns = settings.columns; //字段配置
    var countRows = container.handsontable("countRows"); //总行数
    var mergeRows = 0; //合并后的行数
    if (minCreateRows > 1) {
        for (var m = 0; m < columns.length; m++) {
            if (columns[m].ismerger === true) {
                for (var n = 0, mergeRows = countRows / minCreateRows; n < mergeRows; n++) {
                    cellMerge(container, [n * minCreateRows, m, (n + 1) * minCreateRows - 1, m]);
                }
            }
        }
    }
}
function afterSpaceClick(event, treeId, treeNode, clickFlag) {
    $("input[name='SPACEID']").val(treeNode.id);
    $("input[name='SPACENAME']").val(treeNode.name);
    $("input[name='SPACDEPTH']").val(treeNode.depth);
    $('#space_content').hide(); //隐藏线路层
}
//线路
function selectspace(o, isrefresh, toggle) {
}
//绘制表单头
//data:代表绘制数据
//isLine：绘制表格线
//cells：每行显示列数
//addjg:是否默认添加机构条件(true则默认添加)
function CreatTable(divid, data, isLine, cells, addjg) {
    if (data == null || data == undefined || data.length == 0) { return; }
    var rowCount = 0;
    var dataIndex = 0;
    cells = cells == NaN ? 4 : cells;
    var table = $("<table cellpadding=\"0\" class=\"formtable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: auto\"></table>");
    if (isLine != undefined) {
        if (isLine) {
            table.attr("cellspacing", "1");
        }
    }
    $("#" + divid).append(table);
    if (addjg) { rowCount = Math.ceil((data.length + 1) / cells); } else { rowCount = Math.ceil(data.length / cells); }
    for (var i = 0; i < rowCount; i++) {
        var tr = $("<tr></tr>");
        for (var j = 0; j < cells; j++) {
            var td = $("<td class='right'>&nbsp;</td>");
            var tdName = $("<td  class='left1'>&nbsp;</td>");
            var inputControl;
            //默认添加机构条件
            if (addjg) {
                var str = '<input id="JGNAME" style="width: 130px;" class="input_jg" onclick="selectorg(this)" readonly="readonly" value="" /> <input type="hidden" id="JGID" value="<%= this.of_GetUser().ORGANIZATIONGID1 %>" /><input type="hidden" id="JGDEPTH" value="<%= this.of_GetUser().ORGANIZATIONGDEPTH %>" />';
                td.append($(str));
                $(tdName).text("机构/单位");
                addjg = false;
                tr.append(tdName);
                tr.append(td);
                continue;
            }
            if (dataIndex < data.length) {
                td.text("");
                var value = typeof data[dataIndex].VLAUE == 'undefined' || $.trim(data[dataIndex].VLAUE) == '' ? '' : data[dataIndex].VLAUE; //初始值
                var text = typeof data[dataIndex].TEXT == 'undefined' || $.trim(data[dataIndex].TEXT) == '' ? '' : data[dataIndex].TEXT; //初始名称
                switch (data[dataIndex].KEYID) {
                    case "0001":
                        var str = '<input name="SPACENAME" id="input1_' + data[dataIndex].ID + '" value="' + text + '" onblur="changeme()" style="width: 130px;" class="input_jg" style="+width:' + data[dataIndex].WIDTH + 'px" onclick="selectspace(this)" />';
                        str += '<input name="SPACEID" class=\"inputtext\"  id="input_' + data[dataIndex].ID + '"  keyid="' + data[dataIndex].KEYID + '" type="hidden" value="' + value + '" />';
                        str += '<input name="SPACEDEPTH" type="hidden" />';
                        td.append($(str));
                        break;
                    case "0002":
                        //$.getScript(getcurrurl() + '/js/My97DatePicker/WdatePicker.js'); //加载工具依赖的js
                        var mydate = new Date();
                        var mymonth = mydate.getMonth('MM') + 1;
                        if (mymonth < 10) { mymonth = '0' + mymonth; }
                        var d = mydate.getFullYear() + '-' + mymonth + '-' + mydate.getDate();
                        value = value == '' ? d : value;
                        inputControl = $("<input class=\"inputtext\" onblur=\"changeme()\" id=\"input_" + data[dataIndex].ID + "\" keyid=\"" + data[dataIndex].KEYID + "\"  type=\"text\" style=\"width:  " + data[dataIndex].WIDTH + "px\" value=\"" + value + "\" onclick=\"WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})\" />");
                        td.append(inputControl);
                        break;
                    default:
                        inputControl = $("<input class=\"inputtext\" onblur=\"changeme()\" id=\"input_" + data[dataIndex].ID + "\"  keyid='" + data[dataIndex].KEYID + "'  type=\"text\" style=\"width:  " + data[dataIndex].WIDTH + "px\" value='" + value + "' />");
                        td.append(inputControl);
                        break;
                }
                $(tdName).text(data[dataIndex].NAME + (data[dataIndex].UNITTYPE == undefined || $.trim(data[dataIndex].UNITTYPE) == "" ? "" : "(" + data[dataIndex].UNITTYPE + ")"));
            }
            //每次添加两列 一列名称 一列控件
            tr.append(tdName);
            tr.append(td);
            dataIndex++;
        }
        table.append(tr);
        $("#" + divid).append(table);
    }
}
//绘制表单尾
function CreatFootTable(divid, type) {
    var str = '';
    switch (type) {
        case '1': break;
        default:
            str = '<label style="width:60px">审核人&nbsp;&nbsp;</label><input class="noboderinput" type="text" id="input_gz" value="ss"/>';
            break;
    }
    $("#" + divid).append(str);
}
//[{id:'',value:'',text:''}]
function headTable(tableid, act, data) {
    switch (act) {
        case 'loaddata':
            $('.inputtext').each(function () { $(this).val(''); });
            for (var i = 0; i < data.length; i++) {
                var value = typeof data[i].VALUE == 'undefined' || data[i].VALUE == '' ? '' : data[i].VALUE; //初始值
                var text = typeof data[i].TEXT == 'undefined' || data[i].TEXT == '' ? '' : data[i].TEXT; //初始名称
                if (value != '') { $('#input_' + data[i].HEADID).val(value); }
                if (text != '') { $('#input1_' + data[i].HEADID).val(text); }
            }
            break;
        default: break;
    }
}
function changeme() {
    for (var i = 0; i < SheetData.length; i++) {
        SheetData[i].VALUE = $('#input_' + SheetData[i].ID).val();
    }
}
function getcurrurl() {
    var currurl;
    currurl = $("script").eq(0).attr("src");
    currurl = currurl.substring(0, currurl.indexOf('/js'));
    return currurl;
}