//表單驗證
if( $("script[src*='jquery.validate']").length == 0 ){
	document.write('<script src="../javascripts/jquery-validation/jquery.validate.min.js"></script>');
	document.write('<script src="../javascripts/jquery-validation/messages_zh_TW.min.js"></script>');
	document.write('<link href="../javascripts/jquery-validation/jquery.validate.css" rel="stylesheet" type="text/css">');
}
//DOMPurify
if( $("script[src*='purify']").length == 0 ){
	document.write('<script src="../javascripts/DOMPurify-2.4.4/dist/purify.js"></script>');
}
//HTML 編輯器
if( $("script[src*='summernote']").length == 0 ){
	document.write('<link rel="stylesheet" href="../assets/bootstrap-441/css/bootstrap.min.css">');
	document.write('<script src="../assets/bootstrap-441/js/bootstrap.bundle.min.js"></script>');
	document.write('<script src="../javascripts/summernote-0818/summernote-bs4.js"></script>');
	document.write('<script src="../javascripts/summernote-0818/lang/summernote-zh-TW.min.js"></script>');
	document.write('<link href="../javascripts/summernote-0818/summernote-bs4.min.css" rel="stylesheet">');
}
//圖片上傳
if( $("script[src*='slim']").length == 0 ){
	document.write('<script src="../libs/slim-image-cropper/slim/slim.jquery.min.js"></script>');
	document.write('<link href="../libs/slim-image-cropper/slim/slim.min.css" rel="stylesheet" type="text/css">');
}
//手機點擊
if( $("script[src*='touch-punch']").length == 0 ){
	document.write('<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>');
}
//處理 base64
if( $("script[src*='base64']").length == 0 ){
	document.write('<script src="../javascripts/base64.js"></script>');
}

var formProd;
/******************** 
　表單驗證
********************/
var validatorProd;
$(function(){
	formProd = $("form[name='formProd']");
	validatorProd = formProd.validate({
		rules: {
			prod_name: { //商品名稱
				required: true,
				special_symbols: true,
			},
			prod_sort_uid: { //商品分類
				required: true,
			},
			prod_desc_1: { //商品簡介
				required: true,
				//special_symbols: true,
			},
			prod_desc_2: { //商品描述
				required: true,
				//special_symbols: true,
			},
			prod_desc_32: { //商品影片
				youtube_url: true,
			},
			prod_weight: { //商品重量
				number: true,
				min: 0,
			},
			prod_length: { //長度
				number: true,
				min: 0.1,
			},
			prod_width: { //寬度
				number: true,
				min: 0.1,
			},
			prod_height: { //高度
				number: true,
				min: 0.1,
			},
			prod_cuft: { //材積重
				required: oProdValidator.prod_cuft.required,
				number: true,
				min: oProdValidator.prod_cuft.min,
				max: oProdValidator.prod_cuft.max
			},
			prod_desc_4: { //商品運送及退貨詳情
				//special_symbols: true,
			},
			'prod_file_up[]': { //商品圖
				inp_count: 1,
			},
			// group_buy_min_qty: { //最低成團購買量
			// 	required: "input:radio[name='prod_category'][value='5']:checked, input:radio[name='prod_category'][value='6']:checked",
			// 	digits: true,
			// 	min: 1,
			// },
		},
		messages:{
			prod_sort_uid: {
				required: "請選擇商品分類！",
			},
			prod_cuft: {
				required: "請輸入正確的長、寬、高，或自行輸入材積重！",
			},
			'prod_file_up[]': {
				inp_count: "至少必須上傳 {0} 張商品圖！",
			},
		},
		ignore: "", //忽略某些元素不驗證(default: ":hidden"), 清除就可以驗證 hidden
		//errorElement: "div",
		//errorClass: "validateError",
		errorPlacement: function (error, element) {
			if(element.is(':radio') || element.is(':checkbox')) {
				var eid = element.attr('name');
				$("input[name='" + eid + "']:last").next().after(error);
			
			}else if(element.is("[name^='sharing_qty_']")){
				$("[v_error='sharing_qty']").html("").append(error);
			}else if(element.is("[name^='sharing_amt_']")){
				$("[v_error='sharing_amt']").html("").append(error);
				
			}else if(element.is("[name^='spec_name_']")){
				$("[v_error='spec_name']").html("").append(error);
			}else if(element.is("[name^='item_name_']")){
				$("[v_error='item_name']").html("").append(error);

			}else if(element.is("[name^='prod_selling_price_']")){
				$("[v_error='prod_selling_price']").html("").append(error);
			}else if(element.is("[name^='prod_sticker_price_']")){
				$("[v_error='prod_sticker_price']").html("").append(error);
			}else if(element.is("[name^='prod_cost_price_']")){
				$("[v_error='prod_cost_price']").html("").append(error);
			}else if(element.is("[name^='prod_stock_']")){
				$("[v_error='prod_stock']").html("").append(error);
			}else if(element.is("[name^='prod_delivery_days_']")){
				$("[v_error='prod_delivery_days']").html("").append(error);
			}else if(element.is("[name^='prod_no_old_']")){
				$("[v_error='prod_no_old']").html("").append(error);

			}else{
				if( typeof(element.attr("colname")) !== "undefined" ){
					var errmsg = element.attr("colname")+"︰"+error.text();
					error.text(errmsg);
				}
				error.insertAfter(element);
			}
		},
		submitHandler: function(form){
			var is_display = formProd.find("input[name='prod_display']").val();
			var display_desc = ( is_display == 1 ) ? "上架" : "下架";
			alert("商品已完成【儲存並"+display_desc+"】，點擊【確認】回到列表！<br>*您的商品將於30分鐘後在iOPEN MALL上架/更新").done(function(){
				var formProdPost = $("form[name='formProdPost']");
				var fData = JSON.stringify(formProd.serializeArray());
				var fData = Base64.encode(fData);
				formProdPost.find("textarea[name='jsonPordData']").val( fData );
				
				formProdPost.submit();
			});
		}
	});

	//*** 自訂驗證規則 ******
	jQuery.validator.addMethod("special_symbols", function(value, element) {   
		var regexp = /[&()=\;\'\"<>\\]/;
		return this.optional(element) || !(regexp.test(value));
	}, "請勿使用&()=;\'\"<>\\等特殊符號，避免提交後賣場無法使用！");
	jQuery.validator.addMethod("youtube_url", function(value, element) {   
		var regexp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return this.optional(element) || (regexp.test(value));
	}, "請輸入正確的 Youtube 連結！");
	jQuery.validator.addMethod("account", function(value, element) {   
		var regexp = /^[A-Za-z0-9_\-]+$/;
		return this.optional(element) || (regexp.test(value));
	}, "僅能輸入英數及「-_」！");
	jQuery.validator.addMethod("inp_count", function(value, element, params=0) {   
		var qty = 0;
		formProd.find("input[name='"+$(element).attr("name")+"']").each(function(){
			if( parseInt($(this).val()) > 0 ){
				qty++;
			}
		});
		return this.optional(element) || ( qty >= params );
	}, "至少必須輸入 {0} 個以上！");
	
	//validatorProd.form(); //驗證整個表單
	//validatorProd.element("input[name='prod_cuft']"); //驗證某個欄位
});

/******************** 
　日曆
********************/
$(function(){
	formProd.find("input[type='text-date']").datepicker({
		dateFormat: 'yy/mm/dd',
		changeYear: true,
		changeMonth: true,
		monthNamesShort: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		minDate: null
	}).attr('size', 10);

	formProd.find("input[name='prod_market_sdate']").datepicker("option","onClose",function(dateText,inst){
		formProd.find("input[name='prod_market_edate']").datepicker("option","minDate",dateText);
	});
	formProd.find("input[name='prod_market_edate']").datepicker("option","onClose",function(dateText,inst){
		formProd.find("input[name='prod_market_sdate']").datepicker("option","maxDate",dateText);
	});
});

/******************** 
　設定材積重
********************/
$(function(){
	formProd.find("input[name='prod_length']").keyup(function(){
		setProdCuft();
	});
	formProd.find("input[name='prod_width']").keyup(function(){
		setProdCuft();
	});
	formProd.find("input[name='prod_height']").keyup(function(){
		setProdCuft();
	});
});

//*** 計算材積重 ******
function setProdCuft(){
	var l = parseInt(formProd.find("input[name='prod_length']").val(), 10);
	var w = parseInt(formProd.find("input[name='prod_width']").val(), 10);
	var h = parseInt(formProd.find("input[name='prod_height']").val(), 10);
	if( !isNaN(l) && !isNaN(w) && !isNaN(h) ){
		var cuft = l * w * h / 6000;
		cuft = Math.round(cuft * 1000) / 1000;
		formProd.find("input[name='prod_cuft']").val(cuft);
	}else{
		//formProd.find("input[name='prod_cuft']").val("");
	}
	validatorProd.element("input[name='prod_cuft']"); //驗證欄位
};

/******************** 
　商品類別
********************/
$(function(){
	formProd.find("input[name='prod_category']").click(function(){
		setProdCategory();
	});
});

//*** 設定商品類別相關資料 ******
function setProdCategory(){
	var oCategory = {
						"1":{"name":"一般商品","title_class":"pic-sort-color-orange"},
						"5":{"name":"團購商品","title_class":"pic-sort-color-green"},
						"6":{"name":"拼團商品","title_class":"pic-sort-color-red"}
					};
	var prod_category = formProd.find("input[name='prod_category']:checked").val();
	if( typeof(prod_category) == "undefined" ){
		formProd.find("input[name='prod_category'][value='1']").prop("checked", true);
		prod_category = "1";
	}
	$('#prod_category_title').text(oCategory[prod_category].name).attr("class", oCategory[prod_category].title_class);
	
	$('#set_group_buy_sharing').hide();
	$('#set_group_buy_min_qty').hide();
	$('.admweb-v2-outside-white-box[type="not_group"]').show();

	if( prod_category == "5" ){ //團購商品
		$('#set_group_buy_sharing').show();
		$('#set_group_buy_min_qty').show();

		$('.admweb-v2-outside-white-box[type="not_group"]').hide();
		selPfsMethod(); //選擇分潤方式
		setProdSharingInputValidator(); //設定 分潤 的 表單驗證
	}else if( prod_category == "6" ){ //拼團商品
		$('#set_group_buy_min_qty').show();
	}
};

/******************** 
　團購分潤設定
********************/
var eProdSharing = $("#set_group_buy_sharing");
$(function(){
	formProd.find("select[name='pfs_method']").change(function() {
		selPfsMethod(); //選擇分潤方式
	});
	
	var idx_i = 0;
	
	//*** 已有分潤資料 ******
	if( !$.isEmptyObject(oProdSharing) ){
		$.each(oProdSharing, function(qty, amt){
			addSharingLevel(idx_i, qty, amt); //新增分潤級距
			idx_i++;
		});
	}else{
		idx_i++;
	}
	//*** 已有分潤資料 END ******

	//新增分潤級距按鈕
	eProdSharing.find("a[name='sharing_level_add']").click(function(){
		addSharingLevel(idx_i); //新增分潤級距
		idx_i++;
	});
});

//*** 新增分潤級距 ******
function addSharingLevel(idx_i, qty=1, amt=null){
	if( idx_i > 0 ){
		const length = document.querySelectorAll("#set_group_buy_sharing tr[name^='sharing_level_tr_']").length;
		const lastTr = document.querySelectorAll("#set_group_buy_sharing tr[name^='sharing_level_tr_']")[length-1];
		const newRow = document.createElement("tr");
		newRow.setAttribute("name", "sharing_level_tr_" + idx_i);
		newRow.className = "admweb-v2-table";
		newRow.innerHTML = `
			<td width="60px"><span name="sharing_level_no" class="admweb-v2-num-green">1</span></td>
			<td class="pic-flex-center"><input name="sharing_qty_0" type="text" class="pic-text-lnput pic-lnput-error" style="width: 116px;" value="1"/><span class="pic-margin-l5">個以上</span></td>
			<td><span class="pic-flex-center"><input name="sharing_amt_0" type="text" class="pic-text-lnput pic-margin-r5"><span name="sharing_amt_unit">%</span></span></td>
			<td><a name="sharing_level_del" class="admweb-v2-BtnRed-delete pic-BgText-color-red" href="javascript:void(0);" style="display:none;"><i class="icons-line icon-line-ashbin"></i>刪除</a></td>
		`;
		lastTr.insertAdjacentElement("afterend", newRow);

		if(amt==null){
			// 預設賦值
			qty = Number($(`input[name^='sharing_qty_${(idx_i-1)}']`).val())+1;
			amt = ($(`input[name^='sharing_amt_${(idx_i-1)}']`).val()*10+1)/10;
		}
	}

	//修改欄位內容
	var eTrIn = eProdSharing.find("tr[name='sharing_level_tr_"+idx_i+"']");
	eTrIn.find("span[name='sharing_level_no']")
		.text((idx_i+1));

	eTrIn.find("input[name^='sharing_qty_']")
		.attr("name", "sharing_qty_"+idx_i)
		.val(qty);

	if( idx_i > 0 ){
		eTrIn.find("input[name^='sharing_qty_']")
			.prop('readonly', false);
	}

	eTrIn.find("input[name^='sharing_amt_']")
		//.attr("placeholder", idx_i)
		.attr("name", "sharing_amt_"+idx_i)
		.val(amt);

	eTrIn.find("a[name='sharing_level_del']")
		.click(function(){
			eTrIn.remove();
			resetSharingLevelNo(); //重編 sharing_level_no
		})
		.show();

	if( idx_i == 0 ){
		eTrIn.find("a[name='sharing_level_del']")
			.hide();
	}
	
	resetSharingLevelNo(); //重編 sharing_level_no
	eProdSharing.find("label[class*='error']").remove(); //移除複製到的驗證錯誤訊息
	setProdSharingInputValidator(); //設定 分潤 的 表單驗證
};

//*** 重編 sharing_level_no ******
function resetSharingLevelNo(){
	var _no_ = 1;
	eProdSharing.find("span[name='sharing_level_no']").each(function(){
		$(this).text(_no_);
		_no_++;
	});
}

//*** 選擇分潤方式 ******
function selPfsMethod(){
	var ePfsMethod = formProd.find("select[name='pfs_method']");
	var pfs_method = ePfsMethod.val();
	eProdSharing.find("span[name='pfs_method_name']").text( ePfsMethod.find("option:selected").text() );
	if( pfs_method == 1 ){
		eProdSharing.find("span[name='sharing_amt_unit']").text("%");
	}else if( pfs_method == 2 ){
		eProdSharing.find("span[name='sharing_amt_unit']").text("點");
	}else{
		eProdSharing.find("span[name='sharing_amt_unit']").text("");
	}
};

//*** 設定 分潤 的 表單驗證 ******
function setProdSharingInputValidator(){
	// formProd.find("input[name^='sharing_qty_']").each(function(){
	// 	$(this).rules( "add", {
	// 		required: "input:radio[name='prod_category'][value='5']:checked",
	// 		digits: true,
	// 		min: 1,
	// 	});
	// });
	// formProd.find("input[name^='sharing_amt_']").each(function(){
	// 	$(this).rules( "add", {
	// 		required: "input:radio[name='prod_category'][value='5']:checked",
	// 		number: true,
	// 		min: 1,
	// 		max: 99.9,
	// 	});
	// });
	
	// formProd.find("input[name='sharing_qty_']").rules( "add", {
	// 	numberASC: "input:radio[name='prod_category'][value='5']:checked",
	// 	messages: {
	// 		numberASC: "累積數量必須是遞增的！",
	// 	}
	// });
	// formProd.find("input[name='sharing_amt_']").rules( "add", {
	// 	numberASC: "input:radio[name='prod_category'][value='5']:checked",
	// 	messages: {
	// 		numberASC: "分潤金必須是遞增的！",
	// 	}
	// });

	//*** 自訂驗證規則 ******
	jQuery.validator.addMethod("numberASC", function(value, element, params){
		var is_validate = true; //是否要驗證
		if( typeof(params) == "string" ){
			if( $(params).length == 0 ){
				is_validate = false;
			}
		}
		var _result_ = true;
		if( is_validate ){
			var qty = 0;
			formProd.find("input[name^='"+$(element).attr("name")+"']").each(function(){
				if( $(this).attr("name") != $(element).attr("name") ){
					if( parseInt($(this).val()) > qty ){
						qty = parseInt($(this).val());
					}else{
						_result_ = false;
					}
				}
			});
		}
		return this.optional(element) || ( _result_ );
	}, "數字必須是遞增的！");
};

/******************** 
　商品分類
********************/
var level_max = 5; //分類層級數
$(function(){
	for(var i=0; i<level_max; i++){
		$('#prod_sort_all').append('<ul id="sort_level_'+i+'" class="admweb-window-categories"></ul>');
	}
	if( !$('#in_prod_sort_name').text() ){
		$('#in_prod_sort_name').hide();
	}
});

//*** 選擇分類 ******
var seProdSortA = []; 	//選擇的分類
var oProdSortA = []; 	//各層所有的分類資料
oProdSortA[0] = oProdSortAll;
function selectProdSort(level){
	return function(e){
		//移除 li
		for(var i=level; i<level_max; i++){
			$('#sort_level_'+i+' li').remove();
		}
		//移除選擇的分類
		seProdSortA.splice(level, level_max-level);
		
		var oProdSort = oProdSortA[level];
		for(var sort_uid in oProdSort){
			var _sort_name_ = oProdSort[sort_uid].sort_name;
			//_sort_name_ = oProdSort[sort_uid].sort_uid+" : "+_sort_name_;
			
			//有下一層分類才出現箭頭
			let arrow_html = '';
			if (oProdSort[sort_uid].aChildSort !== undefined) {
				arrow_html = '<i class="icons-line icon-arrow-right-01"></i>';
			}

			let sortLevel = document.querySelector('#sort_level_' + level);

			let liElement = document.createElement('li');
			let aElement = document.createElement('a');
			aElement.href = 'javascript:void(0);';
			aElement.innerHTML = _sort_name_ + arrow_html;

			liElement.appendChild(aElement);
			liElement.setAttribute('sort_uid', oProdSort[sort_uid].sort_uid);
			liElement.addEventListener('click', function () {
				$(this).addClass('active').siblings('.active').removeClass('active');
				let in_sort_uid = this.getAttribute('sort_uid');
				seProdSortA[level] = oProdSort[in_sort_uid];
				let level_next = level + 1;
				oProdSortA[level_next] = oProdSort[in_sort_uid].aChildSort;
				selectProdSort(level_next)();
				setProdSort();
			});

			sortLevel.appendChild(liElement);
		}
	};
};

//*** 設定所選擇的分類 ******
var sort_name_all;
function setProdSort(){
	sort_name_all = "";
	for(var i=0; i<level_max; i++){
		if( typeof(seProdSortA[i]) !== "undefined" ){
			sort_name_all += " > "+seProdSortA[i].sort_name;
		}
	}
	$('#sel_prod_sort_name').text(sort_name_all);
};

//*** 確認所選擇的分類 ******
function inProdSort(){	
	var lastProdSort = seProdSortA.at(-1); //取得最後一個
	if( typeof(lastProdSort) !== "undefined" ){
		if( typeof(lastProdSort.aChildSort) === "undefined" ){
			$('#sel_prod_sort_name').text("尚未選擇分類");
			
			$('#in_prod_sort_name').text(sort_name_all).show();
			formProd.find("input[name='prod_sort_uid']").val(lastProdSort.sort_uid);
			
			prodSortWindowClose();
		}else{
			alert("請選到該分類的最後一層！");
		}
	}else{
		alert("請選擇分類！");
	}
};

//*** 開啟分類表 ******
function prodSortWindowOpen() {
	$('#prod_sort_window').show();
	$('#sel_prod_sort_name').text("尚未選擇分類");
	selectProdSort(0)();
};

//*** 關閉分類表 ******
function prodSortWindowClose() {
	$('#prod_sort_window').hide();
};

/******************** 
　計算 input 內容長度
********************/
var aLengthInputName = ["prod_name"];
$(function(){
	aLengthInputName.forEach(function(inp_name, i){
		var inInput = formProd.find("[name='"+inp_name+"']");
		if( inInput.length > 0 ){
			inInput.keyup(function(){
				inputLength(this);
			});
			inputLength(inInput);
		}
	});
});

//*** 內容長度呈現 ******
function inputLength(ele){
	if( $(ele).prop("tagName") == "TEXTAREA" ){
		var length = $(ele).next().find('.note-editable').text().length;
		var maxlength = $(ele).attr("maxlength-t");
	}else{
		var length = $(ele).val().length;
		var maxlength = $(ele).attr("maxlength");
	}
	var div_id = $(ele).attr("name")+"-length";
	document.getElementById(div_id).innerText = length + "/" + maxlength;
    var desc_id = $(ele).attr("name") + "-warn";
    var descEle = $('#'+desc_id);
    if (length >= maxlength) {
        descEle.show();
    } else {
        descEle.hide();
    }
}

/********************
　商品規格
********************/
var prod_spec_max = 2;
//var oProdSpecStruct = []; //商品規格結構
var eProdSpecSet = $("#prod_spec_set"); 	//規格設定表單
var eProdSpecImg = $("#prod_spec_img"); 	//規格設定圖片
var eProdSpecList = $("#prod_spec_list"); 	//規格列表
$(function(){
	//*** 商品規格結構 已有資料 ******
	if( oProdSpecStruct.length > 0){
		$.each(oProdSpecStruct, function(idx_i, oSpec){
			addSpec(idx_i, oSpec); 		//新增規格
			$.each(oSpec.oItems, function(key, oItem){
				var idx_j = oItem.idx_j;
				if( idx_j > 0 ){
					addSpecItem(idx_i, idx_j, oItem); //新增 規格選項
				}
			});
			inputSpecNameKeyup(idx_i); 	//規格 Input onKeyup
		});
		setSpecListTr(); 		//設定 List 的 tr 列表
		openBatchSetSpec(); 	//開啟批次更新規格資訊
	}
	inSpecListInputVal(); 	//填入 List 的 表單資料
	//*** 商品規格結構 已有資料 END ******
	
	setSpecListInputValidator(); //設定 List 的 表單驗證
	
	//新增 規格 按鈕
	$("#prod_spec_add").click(function(){
		var idx_i = oProdSpecStruct.length;
		addSpec(idx_i); //新增規格
	});
});

//*** 新增規格 ******
function addSpec(idx_i, oSpec={}){
	if( $.isEmptyObject(oSpec) ){
		var oItem_0 = {};
		var idx_j = 1;
	}else{
		var oItem_0 = oSpec.oItems.oItem_0;
		var idx_j = Object.keys(oSpec.oItems).length;
	}
	
	eProdSpecSet.show();
	eProdSpecSet.append(
			$('<tr class="admweb-v2-table"></tr>')
				.attr("name", "prod_spec_"+idx_i)
				.append('<td width="60px" align="center"><span class="admweb-v2-num-green">'+(idx_i+1)+'</span></td>')
				.append(
					$('<td class="pic-flex-center"></td>')
						.append(
							appendSpecNameInput(idx_i, oSpec) //新增 規格 Input
						)
				)
				.append(
					$('<td></td>')
						.append(
							$('<div class="admweb-v2-Label-box"></div>')
								.append(
									appendItemNameInput(idx_i, 0, oItem_0) //新增 規格選項 Input
								)
								.append(
									$('<a class="admweb-v2-sm-btn pic-BgText-color-green" href="javascript:void(0);"><i class="icons-line icon-line-add"></i>新增選項</a>')
								)
						)
				)
				.append(
					$('<td></td>')
						.append(
							$('<a name="prod_spec_del" class="admweb-v2-table-btn pic-BgText-color-red" href="javascript:void(0);"><i class="icons-line icon-line-ashbin"></i>刪除全部規格</a>')
								.attr("onclick", "javascript:removeSpecNameInput("+idx_i+");") //移除 規格 Input
						)
				)
		);
	setSpecAddBtn(); 			//設定 規格 增刪按鈕
	setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕

	let a_new_spec_0 = document.querySelector('#prod_spec_set tr[name=prod_spec_'+idx_i+'] a.admweb-v2-sm-btn.pic-BgText-color-green')
	a_new_spec_0.addEventListener('click', function(e){
		addSpecItem(idx_i, idx_j); //新增 規格選項
		idx_j++;
	})	

	//表單驗證
	formProd.find("input[name='spec_name_"+idx_i+"']").rules( "add", {
		required: true,
		special_symbols: true,
	});
	formProd.find("input[name='item_name_"+idx_i+"_0']").rules( "add", {
		required: true,
		special_symbols: true,
	});

	eProdSpecImg.show();
	eProdSpecImg.find('td').append(
								appendItemImg(idx_i, 0, oItem_0) //新增 規格選項 Img
							);
	if( idx_i == 0 ){
		var eItImg = eProdSpecImg.find("div[name='spec_itimg_upload_0']");
		setSlimImageCropper(eItImg, {
			'size': "125, 125",
			'didSave': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(1);
			},
			'didRemove': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(0);
			},
		}); //設定 Slim 圖片編輯
	}
};

//*** 新增 規格選項 ******
function addSpecItem(idx_i, idx_j, oItem={}){
	var eProdSpec = eProdSpecSet.find("tr[name='prod_spec_"+idx_i+"']");
	eProdSpec.find("div[name^='spec_item_']:last").after(
														appendItemNameInput(idx_i, idx_j, oItem) //新增 規格選項 Input
													);
	//表單驗證
	formProd.find("input[name='item_name_"+idx_i+"_"+idx_j+"']").rules( "add", {
		required: true,
		special_symbols: true, // 禁止使用特殊符號！！
	});
	
	eProdSpecImg.find('td').append(
								appendItemImg(idx_i, idx_j, oItem) //新增 規格選項 Imgt
							);
	if( idx_i == 0 ){
		var eItImg = eProdSpecImg.find("div[name='spec_itimg_upload_"+idx_j+"']");
		setSlimImageCropper(eItImg, {
			'size': "125, 125",
			'didSave': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(1);
			},
			'didRemove': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(0);
			},
		}); //設定 Slim 圖片編輯
	}

	setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕
	openBatchSetSpec(); 		//開啟批次更新規格資訊
};

//*** 新增 規格 Input ******
function appendSpecNameInput(idx_i, oSpec={}){
	if( $.isEmptyObject(oSpec) ){
		//設定商品規格結構
		oSpec = {
			idx_i: idx_i,
			spec_name: "",
			oItems: {},
		};
		oProdSpecStruct.push(oSpec);
	}
	
	//處理 List 表格
	eProdSpecList.find("thead").find("th[name='prod_spec_p']").before(
																		$('<th width="60px">規格 '+(idx_i+1)+'</th>')
																			.attr("name", "spec_name_"+idx_i)
																	); //新增 thead 欄
	eProdSpecList.find("tbody").find("td[name='prod_spec_p']").before(
																		$('<td></td>')
																			.attr("name", "item_name_"+idx_i+"_0")
																			//.text(idx_i+"_0")
																	); //新增 tbody 欄

	var aPlaceholder = ["顏色","尺寸"];
	var placeholder = aPlaceholder[idx_i]; //placeholder += "︰"+idx_i;

	var inputElem = document.createElement("input");
	inputElem.type = "text";
	inputElem.classList.add("pic-text-lnput", "pic-lnput-error");
	inputElem.style.width = "116px";
	inputElem.placeholder = "例如：" + placeholder;
	inputElem.name = "spec_name_" + idx_i;
	inputElem.setAttribute("idx_i", idx_i);
	inputElem.value = oSpec.spec_name;

	// 監聽keyup事件會造成抓到注音符號 而非輸入的值
	// 監聽input事件會造成英文未輸入完整就觸發
	inputElem.addEventListener("focusout", function(){
		inputSpecNameKeyup(idx_i);
	});
	
	return $(inputElem);
};

//*** 規格 Input onKeyup ******
function inputSpecNameKeyup(idx_i){
	var spec_name = formProd.find("input[name='spec_name_"+idx_i+"']").val();
	var spec_name_x;

	if(idx_i==1){
		spec_name_x = formProd.find("input[name='spec_name_0']");
		spec_name_str = '規格 2';
	}else{
		spec_name_x = formProd.find("input[name='spec_name_1']");
		spec_name_str = '規格 1';
	}

	// 驗證規格名稱不可相同
	if(spec_name_x.val() == spec_name){
		formProd.find("input[name='spec_name_"+idx_i+"']").val(spec_name_str);
		eProdSpecList.find("thead").find("th[name='spec_name_"+idx_i+"']").text(spec_name_str);
		alert('規格名稱不可相同。');
	}else{
		if( typeof(spec_name) !== "undefined" ){
			if( spec_name == "" ) spec_name = "規格 "+(idx_i+1);
			oProdSpecStruct[idx_i].spec_name = spec_name;
			//處理 List 表格
			eProdSpecList.find("thead").find("th[name='spec_name_"+idx_i+"']").text(spec_name);
		}
	}

};

//*** 移除 規格 Input ******
function removeSpecNameInput(idx_i){
	confirm("刪除規格系統將無法找回，確定要刪除？").done(function(){
		eProdSpecSet.find("tr[name='prod_spec_"+idx_i+"']").remove();
		if( idx_i == 0 ){
			eProdSpecSet.hide();
			eProdSpecImg.find('td').find("div[name^='spec_itimg_']").remove();
			eProdSpecImg.hide();
		}
		oProdSpecStruct.splice(-1); //移除商品規格結構
		//處理 List 表格
		eProdSpecList.find("thead").find("th[name='spec_name_"+idx_i+"']").remove(); 	//移除 thead 欄位
		eProdSpecList.find("tbody").find("td[name^='item_name_"+idx_i+"_']").remove(); 	//移除 tbody 欄
		if( idx_i == 0 ){
			eProdSpecList.find("tbody:gt(0)").remove(); //移除 tbody
		}else{
			eProdSpecList.find("tbody").each(function(){
				$(this).find("tr:gt(0)").remove(); //移除 tbody 列
			});
		}
		setSpecAddBtn(); 		//設定 規格 增刪按鈕
		openBatchSetSpec(); 	//開啟批次更新規格資訊
	}).fail(function(){
		return false;
	});
};

//*** 設定 規格 增刪按鈕 ******
function setSpecAddBtn(){
	//處理 新增規格 按鈕
	if( oProdSpecStruct.length >= prod_spec_max ){
		$("#prod_spec_add").hide();
	}else{
		$("#prod_spec_add").show();
	}
	//處理 刪除規格 按鈕
	var idx_i = oProdSpecStruct.length-1;
	eProdSpecSet.find("a[name='prod_spec_del']").hide();
	eProdSpecSet.find("tr[name='prod_spec_"+idx_i+"']").find("a[name='prod_spec_del']").show();
};

//*** 新增 規格選項 Input ******
function appendItemNameInput(idx_i, idx_j, oItem={}){
	if( $.isEmptyObject(oItem) ){
		oItem = {
			idx_i: idx_i,
			idx_j: idx_j,
			item_name: "",
			item_img: "",
		};
		//設定商品規格結構
		oProdSpecStruct[idx_i].oItems['oItem_'+idx_j] = oItem;
		setSpecListTr(); //設定 List 的 tr 列表
	}

	if( idx_i == 0 ){
		var aPlaceholder = ["紅","橙","黃","綠","藍","靛","紫"];
	}else{
		var aPlaceholder = ["S","M","L","XL","XXL","XS","XXXL"];
	}
	var placeholder = aPlaceholder[(idx_j%aPlaceholder.length)]; //placeholder += "︰"+idx_i+"-"+idx_j;

	var div = document.createElement('div');
	div.classList.add('admweb-v2-LabelBtn-green');
	div.setAttribute('name', 'spec_item_'+idx_j);
	
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', '例如：' + placeholder);
	input.setAttribute('name', 'item_name_'+idx_i+'_'+idx_j);
	input.setAttribute('idx_i', idx_i);
	input.setAttribute('idx_j', idx_j);
	input.setAttribute('value', oItem.item_name);

	// 監聽keyup事件會造成抓到注音符號 而非輸入的值
	// 監聽input事件會造成英文未輸入完整就觸發
	input.addEventListener('focusout', function() {
		var item_name = document.querySelector("form[name='formProd'] input[name='item_name_"+idx_i+"_"+idx_j+"']").value;
		if(idx_j == 0){
			oProdSpecStruct[idx_i].oItems['oItem_'+idx_j].item_name = item_name;
			setSpecListItemName(); //設定 List 的 規格選項文字
		}else{
			for (let i = 0; i < idx_j ; i++) {
				const ele = oProdSpecStruct[idx_i].oItems['oItem_'+i];
	
				// 驗證同規格名稱中的規格選項不可重複
				if(ele.item_name == item_name){
					alert('同規格名稱中的規格選項不可重複。');
					$("form[name='formProd'] input[name='item_name_"+idx_i+"_"+idx_j+"']").val('');
					$("span[name=spec_itimg_name_"+idx_i+"_"+idx_j+"]").html('&nbsp;');
					$('#prod_spec_list tbody tr td[name="item_name_'+idx_i+'_'+idx_j+'"]').html('&nbsp;');
					break;
				}else{
					oProdSpecStruct[idx_i].oItems['oItem_'+idx_j].item_name = item_name;
					setSpecListItemName(); //設定 List 的 規格選項文字			
				}
			}
		}
	});
	
	var a = document.createElement('a');
	a.setAttribute('name', 'spec_item_del');
	a.setAttribute('href', 'javascript:void(0);');
	a.addEventListener('click', function() {
	  removeItemNameInput(idx_i, idx_j); //移除 規格選項 Input
	});
	
	var i = document.createElement('i');
	i.classList.add('icons-line', 'icon-line-X');
	
	a.appendChild(i);
	div.appendChild(input);
	div.appendChild(a);
	
	return $(div);
};

//*** 新增 規格選項 Img ******
function appendItemImg(idx_i, idx_j, oItem={}){
	if( idx_i == 0 ){

		if(typeof oItem.item_img !== "undefined" && oProdSpecImg[idx_j] != '') {
			imgTag = `<img src="${oProdSpecImg[idx_j]}" />`;
			item_img_up = 1;
		}else{
			imgTag = '<span></span>';
			item_img_up = 0;
		}

		// Create a new div element
		const div = document.createElement("div");
		div.setAttribute("name", "spec_itimg_" + idx_j);
		div.classList.add("admweb-v2-specification-images");

		// Create a new div element for adding an image
		const addImgDiv = document.createElement("div");
		addImgDiv.classList.add("admweb-v2-specification-AddImg");
		addImgDiv.style.width = "80px";
		addImgDiv.setAttribute("name", "spec_itimg_upload_" + idx_j);

		var imgTagEle;
		if( typeof oItem.item_img !== "undefined" && oProdSpecImg[idx_j] != '') {
			// Create a new image element
			imgTagEle = document.createElement("img");
			imgTagEle.setAttribute("src", isValidUrl(oProdSpecImg[idx_j]));
		}else{
			imgTagEle = document.createElement("span");
		}

		// Create a new file input element
		const fileInput = document.createElement("input");
		fileInput.setAttribute("type", "file");
		fileInput.setAttribute("accept", "image/jpeg, image/png");
		fileInput.style.display = "none";
		fileInput.setAttribute("name", "item_img_slim_" + idx_i + "_" + idx_j);

		// Create a new text input element for the uploaded image path
		const imgUpInput = document.createElement("input");
		imgUpInput.setAttribute("type", "text");
		imgUpInput.style.display = "none";
		imgUpInput.setAttribute("name", "item_img_up_" + idx_i + "_" + idx_j);
		imgUpInput.value = parseInt(item_img_up);

		// Create a new text input element for the original image path
		const imgOriInput = document.createElement("input");
		imgOriInput.setAttribute("type", "text");
		imgOriInput.style.display = "none";
		imgOriInput.setAttribute("name", "item_img_ori_" + idx_i + "_" + idx_j);
		imgOriInput.value = isValidUrl(oProdSpecImg[idx_j]);

		// Append the image, file input, and text inputs to the addImgDiv
		addImgDiv.appendChild(imgTagEle);
		addImgDiv.appendChild(fileInput);
		addImgDiv.appendChild(imgUpInput);
		addImgDiv.appendChild(imgOriInput);

		// Append the addImgDiv and a span element to the main div
		div.appendChild(addImgDiv);

		const span = document.createElement("span");
		span.setAttribute("name", "spec_itimg_name_" + idx_i + "_" + idx_j);
		span.classList.add("admweb-v2-specification-reduce");
		span.innerHTML = "&nbsp; ";

		div.appendChild(span);

		return $(div);
	}else{
		return "";	
	}
};

//*** 移除 規格選項 Input ******
function removeItemNameInput(idx_i, idx_j){
	confirm("刪除規格選項系統將無法找回，確定要刪除？").done(function(){
		eProdSpecSet.find("tr[name='prod_spec_"+idx_i+"']").find("div[name='spec_item_"+idx_j+"']").remove();
		if( idx_i == 0 ){
			eProdSpecImg.find('td').find("div[name='spec_itimg_"+idx_j+"']").remove();
		}
		delete oProdSpecStruct[idx_i].oItems['oItem_'+idx_j]; //移除商品規格結構
		//處理 List 表格
		if( idx_i == 0 ){
			eProdSpecList.find("tbody[name='tbody_"+idx_j+"']").remove(); //移除 tbody
		}else{
			eProdSpecList.find("tbody").find("tr[idx_b='"+idx_j+"']").remove(); //移除 tbody 列
		}
		setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕
		openBatchSetSpec(); 		//開啟批次更新規格資訊
	}).fail(function(){
		return false;
	});
};

//*** 設定 規格選項 增刪按鈕 ******
function setSpecItemAddBtn(idx_i){
	var eProdSpec = eProdSpecSet.find("tr[name='prod_spec_"+idx_i+"']");
	if( eProdSpec.find("a[name='spec_item_del']").length <= 1 ){
		eProdSpec.find("a[name='spec_item_del']").hide();
	}else{
		eProdSpec.find("a[name='spec_item_del']:gt(0)").show();
	}
};

//*** 設定 List 的 tr 列表 ******
function setSpecListTr(){
	if( typeof(oProdSpecStruct[0]) !== "undefined" ){
		var oItemsA = oProdSpecStruct[0].oItems;
		var aKeysA = Object.keys(oItemsA);
	}else{
		var aKeysA = ["oItem_0"];
	}
	if( typeof(oProdSpecStruct[1]) !== "undefined" ){
		var oItemsB = oProdSpecStruct[1].oItems;
		var aKeysB = Object.keys(oItemsB);
	}else{
		var aKeysB = ["oItem_0"];
	}
	
	var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days", "prod_no_old", "prod_uid"];
	aKeysA.forEach(function(a_key, ai){
		if( typeof(oItemsA) !== "undefined" ){
			var a = oItemsA[a_key].idx_j;
		}else{
			var a = 0;
		}
		//新增 tbody
		var eTBody = eProdSpecList.find("tbody[name='tbody_"+a+"']");
		if( eTBody.length == 0 ){
			eProdSpecList.append('<tbody name="tbody_'+a+'"></tbody>');
			var eTBody = eProdSpecList.find("tbody[name='tbody_"+a+"']");
		}
		//新增 tbody 列
		aKeysB.forEach(function(b_key, bi){
			if( typeof(oItemsB) !== "undefined" ){
				var b = oItemsB[b_key].idx_j;
			}else{
				var b = 0;
			}
			var _idx_ = a+"_"+b;
			if( eTBody.find("tr[name='spec_tr_"+_idx_+"']").length == 0 ){

				let eProdSpecList2 = document.querySelector("#prod_spec_list");
				let eTrPer = eProdSpecList2.querySelector("tbody").querySelector("tr[name^='spec_tr_']:last-child");
				
				let eTBody2 = eProdSpecList2.querySelector("tbody[name='tbody_" + a + "']");
				
				let _htm = eTrPer.innerHTML;
				
				let newElem = document.createElement("tr");
				newElem.classList.add("admweb-v2-table");
				newElem.setAttribute("name", "spec_tr_" + _idx_);
				newElem.setAttribute("idx_a", a);
				newElem.setAttribute("idx_b", b);
				newElem.innerHTML = filterScriptTags(_htm);
				
				eTBody2.appendChild(newElem);

				//修改欄位內容
				var eTrIn = eTBody.find("tr[name='spec_tr_"+_idx_+"']");
				eTrIn.find("td[name^='item_name_0_']") //規格欄位一
					//.text("0_"+a) //------------------------------------------
					.attr("name", "item_name_0_"+a);
				
				eTrIn.find("td[name^='item_name_1_']") //規格欄位二
					//.text("1_"+b) //------------------------------------------
					.attr("name", "item_name_1_"+b);
				//Input 欄位修改
				aSpecListInputName.forEach(function(inp_name, i){
					eTrIn.find("input[name^='"+inp_name+"_']")
						//.attr("placeholder", _idx_)
						.attr("name", inp_name+"_"+_idx_);
				});
					
				eProdSpecList.find("label[class*='error']").remove(); //移除複製到的驗證錯誤訊息
			}
		});
	});
	
	setSpecListItemName(); 			//設定 List 的 規格選項文字
	setSpecListInputValidator(); 	//設定 List 的 表單驗證
};

//*** 設定 List 的 規格選項文字 ******
function setSpecListItemName(){
	$.each(oProdSpecStruct, function(i, oSpec){
		$.each(oSpec.oItems, function(key, oItem){
			if( oItem.item_name !== null ){
				eProdSpecList.find("td[name='item_name_"+oItem.idx_i+"_"+oItem.idx_j+"']").text(oItem.item_name);
				
				//上傳規格選項圖檔文字
				if( oItem.item_name.length == 0 ){
					var item_name = "　";
				}else{
					var item_name = oItem.item_name;
				}
				eProdSpecImg.find("span[name='spec_itimg_name_"+oItem.idx_i+"_"+oItem.idx_j+"']").text(item_name);
			}
		});
	});
};

//*** 設定 List 的 表單驗證 ******
function setSpecListInputValidator(){
	formProd.find("input[name^='prod_selling_price_']").each(function(){
		if( $(this).attr("name").substr(-5) != "batch" ){
			$(this).rules( "add", {
				required: true,
				number: true,
				min: 1,
			});
		}
	});
	formProd.find("input[name^='prod_stock_']").each(function(){
		if( $(this).attr("name").substr(-5) != "batch" ){
			$(this).rules( "add", {
				required: true,
				number: true,
				min: 0,
			});
		}
	});
	formProd.find("input[name^='prod_sticker_price_'], input[name^='prod_cost_price_']").each(function(){
		if( $(this).attr("name").substr(-5) != "batch" ){
			$(this).rules( "add", {
				number: true,
				min: 0,
			});
		}
	});
	formProd.find("input[name^='prod_delivery_days_']").each(function(){
		if( $(this).attr("name").substr(-5) != "batch" ){
			$(this).rules( "add", {
				digits: true,
				min: 0,
			});
		}
	});
	formProd.find("input[name^='prod_no_old_']").each(function(){
		if( $(this).attr("name").substr(-5) != "batch" ){
			$(this).rules( "add", {
				account: true,
			});
		}
	});
};

//*** 開啟批次更新規格資訊 ******
function openBatchSetSpec(){
	var eBatchSpecSet = $("#batch_spec_set"); //規格設定表單
	if( eProdSpecList.find("tr[name^='spec_tr_']").length > 1 ){
		eBatchSpecSet.show();
		
		eBatchSpecSet.find("a[name='batch_spec_apply_btn']").click(function(){
			var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days"];
			aSpecListInputName.forEach(function(inp_name, i){
				var eValBatch = formProd.find("input[name='"+inp_name+"_batch']");
				if( eValBatch.val().length > 0 ){
					formProd.find("input[name^='"+inp_name+"_']").val(eValBatch.val());
					eValBatch.val("");
				}
			});
		});
	}else{
		eBatchSpecSet.hide();	
	}
};

//*** 填入 List 的 表單資料 ******
function inSpecListInputVal(){
	if( !$.isEmptyObject(oProdSpecData) ){
		$.each(oProdSpecData, function(idx, oProdSpec){
			var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days", "prod_no_old", "prod_uid"];
			aSpecListInputName.forEach(function(inp_name, i){
				formProd.find("input[name='"+inp_name+"_"+idx+"']").val( oProdSpec[inp_name] );
			});
		});
	}
};

/********************
　HTML 編輯器
********************/
$(function(){
	var aHtmlInputName = ["prod_desc_1", "prod_desc_2", "prod_desc_4"];
	aHtmlInputName.forEach(function(inp_name, i){
		var inInput = formProd.find("textarea[name='"+inp_name+"']");
		if( inInput.length > 0 ){
			inInput.summernote({
				height: 120,
				toolbar: [
	                ['style', ['bold', 'italic', 'underline', 'clear']],
					['fontsize', ['fontsize']],
	                ['color', ['color']],
	                ['para', ['ul', 'ol', 'paragraph']],
	                ['insert', ['link']],
					['view', ['codeview']],
					['misc', ['undo','redo']]
				],
				followingToolbar: false,
				callbacks: {
					onKeyup: function(e){
					},
					onFocus: function(e){
						inputLength( formProd.find("[name='"+inp_name+"']") ); //計算 input 內容長度
					},
					onInput: function(e) {
						if(check_summernote_input(inInput))
						inputLength( formProd.find("[name='"+inp_name+"']") ); //計算 input 內容長度
					},
					onChangeCodeview: function(code){
						// 改在套件了
					},
					onBlurCodeview: function(code){
					},
				},
			});
			inputLength( formProd.find("[name='"+inp_name+"']") ); //計算 input 內容長度
		}
	});
});

/******************** 
 圖片編輯
********************/
var eProdImgs = $('#prod_imgs');
$(function(){
	initProdImg(); //設定圖片編輯器
	hideImgAddBtn(); //隱藏新增圖片按鈕
	
	//新增圖片按鈕
	eProdImgs.find("a[name='img_add_btn']").click(function(){
		eProdImgs.find("a[name='img_add_btn']").before(
						$('<div name="prod_img_upload" class="admweb-v2-PdImg-EditDelete pic-AddImag"></div>')
							.append('<input type="file" name="prod_file_slim[]" accept="image/jpeg, image/png" style="display:none;"/>')
							.append('<input name="prod_file_uid[]" type="text" value="0" style="display: none;" />')
							.append('<input name="prod_file_ori[]" type="text" value="" style="display: none;" />')
							.append('<input name="prod_file_up[]" type="text" value="0" style="display: none;" />')
							.append('<a name="prod_img_drag_btn" class="admweb-v2-haulage" href="javascript:void(0);"><i class="icons-line icon-line-hamburger"></i></a>')
					);
		initProdImg(); //設定圖片編輯器
		hideImgAddBtn(); //隱藏新增圖片按鈕
	});
});

//*** 隱藏新增圖片按鈕 ******
function hideImgAddBtn(){
	if( eProdImgs.find("div[name='prod_img_upload']").length >= 11 ){
		eProdImgs.find("a[name='img_add_btn']").hide();
	}else{
		eProdImgs.find("a[name='img_add_btn']").show();
	}
}

//*** 設定圖片編輯器 ******
function initProdImg(){
	eProdImgs.find("div[name='prod_img_upload']").each(function(){
		var ele = this;
		setSlimImageCropper(ele, {
			'didSave': function(){
				$(ele).find("input[name='prod_file_up[]']").val(1);
				formProd.find("input[name='prod_file_all_change']").val(1); //商品圖有被異動
			},
			'didRemove': function(){
				$(ele).find("input[name='prod_file_up[]']").val(0);
				formProd.find("input[name='prod_file_all_change']").val(1); //商品圖有被異動
			},
		}); //設定 Slim 圖片編輯
	});
	setProdImgDragSort();
};

//*** 設定 Slim 圖片編輯 ******
/*
	oParams
		size: 超過才會縮小 Size, "1000, 1000"
		didSave: 存檔時執行的 function
		didRemove: 刪除時執行的 function
*/
function setSlimImageCropper(ele, oParams={}){
	oParams.size = ( typeof(oParams.size) != "undefined" ) ? oParams.size : "1000, 1000";
	oParams.didSave = ( typeof(oParams.didSave) == "function" ) ? oParams.didSave : function(){};
	oParams.didRemove = ( typeof(oParams.didRemove) == "function" ) ? oParams.didRemove : function(){};
	$(ele).slim({
		ratio: '1:1',
		//forceSize: "1000, 1000", //強制輸出 Size
		size: oParams.size, //超過才會縮小 Size
		minSize: {
			width: 125,
			height: 125
		},
		maxFileSize: 5,
		statusFileSize: '圖檔須小於 5 MB',
		statusImageTooSmall: '圖檔須大於 125 × 125 像素',
		download: false,
		label: '上傳圖檔',
		labelLoading: '',
		buttonEditTitle: '編輯',
		buttonRemoveTitle: '刪除',
		buttonConfirmLabel: '確認',
		buttonConfirmTitle: '確認',
		buttonCancelLabel: '取消',
		buttonCancelTitle: '取消',
		didSave: oParams.didSave,
		didRemove: oParams.didRemove,
	});
};

//*** 設定拖曳排序 ******
function setProdImgDragSort(){
	eProdImgs.sortable({
		handle: "a[name='prod_img_drag_btn']", //指定用來拖曳的 ele
		cursor: "move", //拖曳時顯示的游標樣式
		items: "div[name='prod_img_upload']", //可拖曳的 ele
		opacity: 0.6, //拖動時，透明度為0.6
		//revert: true, //釋放時，增加動畫
		update: function(ev, ui){
			formProd.find("input[name='prod_file_all_change']").val(1); //商品圖排序有被異動
		},
	});
};

/******************** 
　運送方式設定
********************/
var eDeliveryType = $("#delivery_type");
$(function(){
	formProd.find("input[name='prod_type']").click(function(){
		setDeliveryType();
	});
	setDeliveryType();
});

function setDeliveryType(){
	var prod_type = formProd.find("input[name='prod_type']:checked").val();
	var prod_type_name = formProd.find("input[name='prod_type']:checked").parent().find("span[name='prod_type_name']").text();
	eDeliveryType.find("p[name='warning_text']").find("span[name='prod_type_name']").text(prod_type_name);
	$("#prod_type").find("p[name='warning_text']").find("span[name='prod_type_name']").text(prod_type_name);
	
	eDeliveryType.find("div").hide();
	formProd.find("input[name='webdvr_uid[]']").prop("checked", false);
	
	if( eDeliveryType.find("div[prod_type='"+prod_type+"']").length > 0 ){
		eDeliveryType.find("div[prod_type='"+prod_type+"']").show();
		$.each(oProdDelivery, function(key, oPDelivery){
			formProd.find("input[name='webdvr_uid[]'][prod_type='"+prod_type+"'][value='"+oPDelivery.webdvr_uid+"']").prop("checked", true);
		});
		eDeliveryType.find("p[name='warning_text']").hide();
		$("#prod_type").find("p[name='warning_text']").hide();
	}else{
		eDeliveryType.find("p[name='warning_text']").show();
		$("#prod_type").find("p[name='warning_text']").show();
	}
};

/******************** 
　儲存
********************/
function saveProd( is_display ){
	formProd.find("input[name='prod_display']").val(is_display);
	formProd.submit();
};

/******************** 
　取消
********************/
function cancelProd(){
	confirm("您尚未儲存目前編輯之內容，請問是否確認取消編輯？").done(function(){
		window.location.href = "admweb.main.php?action=product_pic";
	}).fail(function(){
		return false;
	});
};

$('body').click(function (e) {
	if($('button.note-codeview-keep.active').length > 0){
		let click_ta = $(e.target).parents('div.note-editor.note-frame.codeview')
		let active_codeview_div = $('button.note-codeview-keep.active').parents('div.note-editor.note-frame')
		let summernote = active_codeview_div.prev()
		if(click_ta.length == 0 && active_codeview_div.hasClass('codeview')) summernote.summernote('codeview.toggle');
	}
});

// 分潤表驗證
$(document).ready(function () {
	// 驗證單品累積數量
	$('#set_group_buy_sharing').on('input', "input[name^='sharing_qty_']", function () {
		let v = $(this).val()
		
		// 必須為數字
		if(isNaN(v)){
			$(this).val('1')
			alert('請輸入數字')
		}

		// 最小為1
		else if(v < 1){
			$(this).val('1')
			alert('最小數量為1')
		}

		// 必須為整數
		else{
			let v2 = v.split('.')
			if(v2.length > 1) v = v2[0];
			$(this).val(v);
		}

		// 檢查數字是否為遞增
		for (let i = 1; i < ($("#set_group_buy_sharing input[name^='sharing_qty_']").length-1); i++) {
			const ele_pre = $("#set_group_buy_sharing input[name^='sharing_qty_']").eq(i-1);
			const ele_pre_v = Number(ele_pre.val());
			const ele = $("#set_group_buy_sharing input[name^='sharing_qty_']").eq(i);
			const ele_v = Number(ele.val());
			if(ele_v <= ele_pre_v){
				ele.val(ele_pre_v+ 1)/10;
				alert('分潤級距的單品纍積數量必須為遞增。');
			}
		}
	});

	// 驗證分潤金
	$('#set_group_buy_sharing').on('focusout', "input[name^='sharing_amt_']", function () {
		let v = $(this).val()
		
		// 必須為數字
		if(isNaN(v)){
			$(this).val('1')
			alert('請輸入數字')
		}

		// 最小為1
		else if(v < 1){
			$(this).val('1')
			alert('最小分潤比例為1%')
		}

		// 最大為99.9
		else if(v > 99.9){
			$(this).val(99.9)
			alert('最大分潤比例為99.9%')
		}

		// 取到小數點第一位
		else{
			let v2 = v.split('.')
			if(v2.length > 1) v = v2[0] + '.' + v2[1].substring(0, 1)
			$(this).val(v);

			// 檢查數字是否為遞增
			for (let i = 1; i < ($("#set_group_buy_sharing input[name^='sharing_amt_']").length-1); i++) {
				const ele_pre = $("#set_group_buy_sharing input[name^='sharing_amt_']").eq(i-1);
				const ele_pre_v = Number(ele_pre.val());
				const ele = $("#set_group_buy_sharing input[name^='sharing_amt_']").eq(i);
				const ele_v = Number(ele.val());
				if(ele_v <= ele_pre_v){
					if(ele_pre_v == 99.9){
						ele.parents("tr.admweb-v2-table[name^='sharing_level_tr_']").remove();
						alert('分潤金最大為99.9%，若要增加更多分潤級距，請調整前面的分潤級距内容。');
					}else{
						ele.val((ele_pre_v*10 + 1)/10);
						alert('分潤金必須為遞增');
					}
				}
			}
		}

	});

	// 驗證最低成團購買量
	$('#set_group_buy_min_qty').on('focusout', "input[name=group_buy_min_qty]", function () {
		const group_buy_min_qty = Number($(this).val());
		const sharing_qty_0 = Number($('input[name=sharing_qty_0]').val());
		console.log(group_buy_min_qty, sharing_qty_0);
		if(sharing_qty_0 == ''){
			alert('請先提供第一個分潤級距的數量。');
		}
		else if(isNaN(group_buy_min_qty) || group_buy_min_qty == '' || group_buy_min_qty < 1 || group_buy_min_qty > sharing_qty_0){
			$(this).val(sharing_qty_0);
			alert('最低成團購買量需為數字，不得小於1且不得大於第一個分潤級距的數量。');
		}
	})

	// 下面是原本validation 套件的error span
	// }else if(element.is("[name^='sharing_qty_']")){
	// 	$("[v_error='sharing_qty']").html("").append(error);
	// }else if(element.is("[name^='sharing_amt_']")){
	// 	$("[v_error='sharing_amt']").html("").append(error);
});

function filterScriptTags(input) {
	if (typeof input === 'string') {
		// 如果是字串，過濾 script 標籤及其內容
		return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
	} else if (Array.isArray(input)) {
		// 如果是陣列，遞迴處理每個元素
		return input.map(filterScriptTags);
	} else if (typeof input === 'object') {
		// 如果是物件，遞迴處理每個屬性值
		const sanitizedObject = {};
		for (const key in input) {
			sanitizedObject[key] = filterScriptTags(input[key]);
		}
		return sanitizedObject;
	} else {
		// 其他型態直接回傳
		return input;
	}
}

function isValidUrl(url) {
	// Create a new URL object with the given URL string
	let urlObj;
	try {
	  urlObj = new URL(url);
	} catch (e) {
	  // If the URL is not valid, return false
	  return false;
	}
	
	// Check if the URL has a valid protocol (http, https, ftp)
	const protocol = urlObj.protocol.toLowerCase();
	if (protocol !== "http:" && protocol !== "https:" && protocol !== "ftp:") {
	  return false;
	}
	
	// Check if the URL has a valid hostname (domain name or IP address)
	const hostname = urlObj.hostname;
	if (!/^[a-z0-9.-]+$/i.test(hostname)) {
	  return false;
	}
	
	// Check if the URL has a valid path (optional)
	const path = urlObj.pathname;
	if (path && !/^\/[^\s]*$/.test(path)) {
	  return false;
	}
	
	// If all tests pass, return the original URL
	return url;
}