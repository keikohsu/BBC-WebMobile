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
				special_symbols: true,  // 禁止使用特殊符號！！
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
			group_buy_min_qty: { //最低成團購買量
				required: "input:radio[name='prod_category'][value='5']:checked, input:radio[name='prod_category'][value='6']:checked",
				digits: true,
				min: 1,
			},
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
				if( $("#set_group_buy_sharing_window").is(':visible') ){
					$("[v_error='sharing_qty']").html("").append(error);
				}else{
					$("[v_error='sharing_set']").html("").append(error);
				}
			}else if(element.is("[name^='sharing_amt_']")){
				if( $("#set_group_buy_sharing_window").is(':visible') ){
					$("[v_error='sharing_amt']").html("").append(error);
				}else{
					$("[v_error='sharing_set']").html("").append(error);
				}
				

			}else if(element.is("[name^='spec_name_']")){
				//if( $("#set_prod_spec_window").is(':visible') ){
					//error.insertAfter(element);
				//}else{
					error.text("商品規格資訊尚未填寫完整或有錯誤！");
					$("[v_error='prod_spec_set']").html("").append(error);
				//}
			}else if(element.is("[name^='item_name_0_']")){
				//if( $("#set_prod_spec_window").is(':visible') ){
					//$("[v_error='item_name_0']").html("").append(error);
				//}else{
					error.text("商品規格資訊尚未填寫完整或有錯誤！");
					$("[v_error='prod_spec_set']").html("").append(error);
				//}
			}else if(element.is("[name^='item_name_1_']")){
				//if( $("#set_prod_spec_window").is(':visible') ){
					//$("[v_error='item_name_1']").html("").append(error);
				//}else{
					error.text("商品規格資訊尚未填寫完整或有錯誤！");
					$("[v_error='prod_spec_set']").html("").append(error);
				//}

			}else if(element.is("[name^='prod_selling_price_'], [name^='prod_sticker_price_'], [name^='prod_cost_price_'], [name^='prod_stock_'], [name^='prod_delivery_days_'], [name^='prod_no_old_']")){
				//if( $("#set_prod_spec_list_window").is(':visible') ){
					//$("[v_error='prod_spec_set']").find("label.error").remove();
					//error.insertAfter(element);
				//}else{
					//$("#set_prod_spec_list_window").find("label.error").remove();
					if( formProd.find("input[name^='spec_name_']").length > 0 ){
						error.text("商品規格資訊尚未填寫完整或有錯誤！");
						$("[v_error='prod_spec_set']").html("").append(error);
					}else{
						error.insertAfter(element);
					}	
				//}

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
				
				//formProdPost.show();
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
	setProdCategory();
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
	$('#set_group_buy_min_qty_inp').hide();
	$('li[type="not_group"]').show();

	if( prod_category == "5" ){ //團購商品
		$('#set_group_buy_sharing').show();
		$('#set_group_buy_min_qty').show();
		$('#set_group_buy_min_qty_inp').show();
		$('li[type="not_group"]').hide();

		selPfsMethod(); //選擇分潤方式
		setProdSharingInputValidator(); //設定 分潤 的 表單驗證
	}else if( prod_category == "6" ){ //拼團商品
		$('#set_group_buy_min_qty').show();
		$('#set_group_buy_min_qty_inp').show();
	}
};

/******************** 
　團購分潤設定
********************/
var eProdSharing = $("#set_group_buy_sharing_window");
$(function(){
	formProd.find("select[name='pfs_method']").change(function() {
		selPfsMethod(); //選擇分潤方式
	});
	
	var idx_i = 0;
	
	//*** 已有分潤資料 ******
	if( !$.isEmptyObject(oProdSharing) ){
		$.each(oProdSharing, function(qty, amt){
			//console.log( qty, amt ); //------------------------------------------
			addSharingLevel(idx_i, qty, amt); //新增分潤級距
			idx_i++;
		});
		cfmProdSharing(0); //設定團購分潤[確認]
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
		let length = document.querySelectorAll("#set_group_buy_sharing_window tr[name^='sharing_level_tr_']").length;
		let lastTr = document.querySelectorAll("#set_group_buy_sharing_window tr[name^='sharing_level_tr_']")[length-1];
		let newRow = document.createElement("tr");
		newRow.setAttribute("name", "sharing_level_tr_" + idx_i);
		newRow.className = "admweb-v2-table";
		newRow.innerHTML = `
		<td class="pic-flex-center">
			<span name="sharing_level_no" class="admweb-v2-num-green pic-margin-r15">1</span>
			<input name="sharing_qty_0" type="text" class="pic-text-lnput pic-lnput-error" style="width: 55%;margin-right: 2px;" value="1">
			<span class="">個以上</span>
		</td>
		<td>
			<span class="pic-flex-center">
				<input name="sharing_amt_0" type="text" class="pic-text-lnput pic-margin-r5" style="width: 70%;">
				<span name="sharing_amt_unit">%</span>
			</span>
		</td>
		<td>
			<a name="sharing_level_del" class="admweb-v2-BtnRed-delete pic-BgText-color-red" href="javascript:void(0);" style="display:none;">
				<i class="icons-line icon-line-ashbin"></i>刪除
			</a>
		</td>
		`;
		lastTr.insertAdjacentElement("afterend", newRow);
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
	//console.log( eProdSharing.find("span[name='sharing_level_no']") ); //------------------------------------------
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
	formProd.find("input[name^='sharing_qty_']").each(function(){
		$(this).rules( "add", {
			required: "input:radio[name='prod_category'][value='5']:checked",
			digits: true,
			min: 1,
		});
	});
	formProd.find("input[name^='sharing_amt_']").each(function(){
		$(this).rules( "add", {
			required: "input:radio[name='prod_category'][value='5']:checked",
			number: true,
			min: 1,
		});
	});
	
	formProd.find("input[name='sharing_qty_']").rules( "add", {
		numberASC: "input:radio[name='prod_category'][value='5']:checked",
		messages: {
			numberASC: "累積數量必須是遞增的！",
		}
	});
	formProd.find("input[name='sharing_amt_']").rules( "add", {
		numberASC: "input:radio[name='prod_category'][value='5']:checked",
		messages: {
			numberASC: "分潤金必須是遞增的！",
		}
	});
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

//*** 設定團購分潤[確認] ******
function cfmProdSharing(no_confirm){
	if(no_confirm === undefined ) no_confirm = true;
	if(no_confirm) confirm_closeSetWindow('group_buy_sharing')
	else{
		var v_result_all = true; //所有驗證結果
		formProd.find("input[name^='sharing_qty_'], input[name^='sharing_amt_']").each(function(){
			var v_result = validatorProd.element("input[name='"+$(this).attr("name")+"']"); //驗證某個欄位
			if( !v_result ){ 
				v_result_all = false;
				return false;
			}
		});

		if( v_result_all){
			var set_num = formProd.find("input[name^='sharing_qty_']").length;
			$("#in_sharing_num").text(set_num-1);
			
			if(no_confirm == 0) 
			closeSetWindow('group_buy_sharing');
		}
	}
};

/******************** 
　商品分類
********************/
var level_max = 5; //分類層級數
$(function(){
	if( !$('#in_prod_sort_name').text() ){
		$('#in_prod_sort_name').hide();
	}
	selectProdSort(0)();
	setProdSort();
});

//*** 選擇分類 ******
var seProdSortA = []; 	//選擇的分類
var oProdSortA = []; 	//各層所有的分類資料
oProdSortA[0] = oProdSortAll;
var li_sort_level = 0; //目前列表是第幾層 level
function selectProdSort(level){
	li_sort_level = level; //現在 li 的 level
	return function(e){
		//移除 li
		$('#sort_level li').remove();
		//移除選擇的分類
		seProdSortA.splice(level+1, level_max-level);
		
		var oProdSort = oProdSortA[level];
		for(var sort_uid in oProdSort){
			var _sort_name_ = oProdSort[sort_uid].sort_name;
			//_sort_name_ = oProdSort[sort_uid].sort_uid+" : "+_sort_name_;
			
			const sortLevel = document.getElementById('sort_level');

			//有下一層分類才出現箭頭
			var arrow_html = '';
			if (typeof oProdSort[sort_uid].aChildSort !== 'undefined') {
			  var arrow_html = '<i class="icons-line icon-arrow-right-01"></i>';
			}

			const listItem = document.createElement('li');
			listItem.classList.add('admweb-v2-NewProduct-title');
			listItem.setAttribute('sort_uid', oProdSort[sort_uid].sort_uid);
			listItem.addEventListener('click', function() {
				var in_sort_uid = this.getAttribute('sort_uid');
				seProdSortA[level] = oProdSort[in_sort_uid]; //選擇的分類
				var level_next = level + 1; //下一層
				oProdSortA[level_next] = oProdSort[in_sort_uid].aChildSort; //下層所有的分類資料
				if (typeof oProdSortA[level_next] !== 'undefined') {
					selectProdSort(level_next)();
				}
				setProdSort();
			});
			listItem.innerHTML = '<h2 class="admweb-v2-SettingsTitle">' + _sort_name_ + '</h2>' + arrow_html;
			sortLevel.appendChild(listItem);
		}
	};
};

//*** 設定所選擇的分類 ******
var sort_name_all;
function setProdSort(){
	sort_name_all = "";
	var eSelSortName = document.querySelector('#sel_prod_sort_name');
	while (eSelSortName.firstChild) {
	  eSelSortName.removeChild(eSelSortName.firstChild);
	}
	for(var i=0; i<level_max; i++){
	  if( i == li_sort_level ){
		var _css_ = "swiper-slide pic-nav-a selected";
		var _text_ = "請選擇";
	  }else{
		var _css_ = "swiper-slide pic-nav-a";
		var _text_ = "&nbsp;";
	  }
	  if( typeof(seProdSortA[i]) !== "undefined" ){
		sort_name_all = seProdSortA[i].sort_name;
		var divElem = document.createElement('div');
		divElem.setAttribute("class", _css_);
		divElem.setAttribute("level", i);
		divElem.setAttribute("sort_uid", seProdSortA[i].sort_uid);
		divElem.addEventListener("click", function(){
		  selectProdSort(parseInt(this.getAttribute("level")))();
		  setProdSort();
		});
		divElem.innerHTML = seProdSortA[i].sort_name;
		eSelSortName.appendChild(divElem);
	  }else{
		var divElem = document.createElement('div');
		divElem.setAttribute("class", _css_);
		divElem.innerHTML = _text_;
		eSelSortName.appendChild(divElem);
	  }
	}
};

//*** 確認所選擇的分類 ******
function inProdSort(){	
	var lastProdSort = seProdSortA.at(-1); //取得最後一個
	//console.log( lastProdSort ); //------------------------------------------
	if( typeof(lastProdSort) !== "undefined" ){
		if( typeof(lastProdSort.aChildSort) === "undefined" ){
			$('#sel_prod_sort_name').html("");
			selectProdSort(0)();
			
			$('#in_prod_sort_name').text(sort_name_all).show();
			formProd.find("input[name='prod_sort_uid']").val(lastProdSort.sort_uid);
			
			closeSetWindow('prod_sort');
		}else{
			alert("請選到該分類的最後一層！");
		}
	}else{
		alert("請選擇分類！");
	}
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
};

/********************
　商品規格
********************/
var prod_spec_max = 2;
//var oProdSpecStruct = []; //商品規格結構
var eProdSpecSet = $("#prod_spec_set"); 	//規格設定表單
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
			setSpecListTr(); 			//設定 List 的 tr 列表
			inputSpecNameKeyup(idx_i); 	//規格 Input onKeyup
		});
		openBatchSetSpec(); 	//開啟批次更新規格資訊
	}
	inSpecListInputVal(); 	//填入 List 的 表單資料
	setHPagePriceShow(); 	//主頁價格呈現處理
	//*** 商品規格結構 已有資料 END ******
	
	setSpecListInputValidator(); //設定 List 的 表單驗證
	cfmProdSpecSet(); //設定商品規格[確認]
	
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

	const eProdSpecSet2 = document.querySelector("#prod_spec_set"); //規格設定表單

	const div = document.createElement("div");
	div.classList.add("admweb-v2-specification-frame", "pic-margin-10");
	div.setAttribute("name", "prod_spec_" + idx_i);
	
	const h3 = document.createElement("h3");
	h3.innerHTML = '規格 <span class="admweb-v2-num-green">' + (idx_i + 1) + '</span>';
	div.appendChild(h3);
	
	const p1 = document.createElement("p");
	p1.classList.add("admweb-v2-specification-name", "pic-margin-b5");
	p1.innerHTML = '規格名稱<label for="(不使用)spec_name_' + idx_i + '" class="error" style="display:none;"></label>';
	div.appendChild(p1);
	
	$(div).append(appendSpecNameInput(idx_i, oSpec)); //新增 規格 Input
	// div.appendChild(appendSpecNameInput(idx_i, oSpec)); //新增 規格 Input
	
	const p2 = document.createElement("p");
	p2.classList.add("admweb-v2-specification-name", "pic-margin-b5");
	p2.innerHTML = '規格選項<span v_error="(不使用)item_name_' + idx_i + '"></span>';
	div.appendChild(p2);
	
	const div2 = document.createElement("div");
	div2.classList.add("admweb-v2-Label-box");
	$(div2).append(appendItemNameInput(idx_i, 0, oItem_0)); //新增 規格選項 Input
	// div2.appendChild(appendItemNameInput(idx_i, 0, oItem_0)); //新增 規格選項 Input
	
	const a = document.createElement("a");
	a.classList.add("admweb-v2-sm-btn", "pic-BgText-color-green");
	a.href = "javascript:void(0)";
	a.innerHTML = '<i class="icons-line icon-line-add"></i>新增選項';
	
	a.addEventListener("click", function() {
	  addSpecItem(idx_i, idx_j); //新增 規格選項
	  idx_j++;
	});
	
	div2.appendChild(a);
	div.appendChild(div2);
	
	const a2 = document.createElement("a");
	a2.classList.add("pic-btn-newstore-100", "pic-BgText-color-red", "pic-margin-tm5");
	a2.href = "javascript:void(0);";
	a2.setAttribute("name", "prod_spec_del");
	a2.innerHTML = '<i class="icons-line icon-line-ashbin pic-margin-r5"></i>刪除全部規格';
	a2.setAttribute("onclick", "javascript:removeSpecNameInput(" + idx_i + ");"); //移除 規格 Input
	div.appendChild(a2);
	
	const div3 = document.createElement("div");
	div3.setAttribute("name", "prod_spec_img");
	div3.classList.add("admweb-v2-specification-AddImgBox");
	$(div3).append(appendItemImg(idx_i, 0, oItem_0)); //新增 規格選項 Img
	// div3.appendChild(appendItemImg(idx_i, 0, oItem_0)); //新增 規格選項 Img
	div.appendChild(div3);
	
	eProdSpecSet2.appendChild(div);
	
	var eProdSpec = eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']");
	setSpecAddBtn(); 			//設定 規格 增刪按鈕
	setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕
	setHPagePriceInput(); 		//主頁價格 Input 處理

	//表單驗證
	formProd.find("input[name='spec_name_"+idx_i+"']").rules( "add", {
		required: true,
		special_symbols: true,  // 禁止使用特殊符號！！
	});
	formProd.find("input[name='item_name_"+idx_i+"_0']").rules( "add", {
		required: true,
		special_symbols: true,  // 禁止使用特殊符號！！
	});
	cfmProdSpecSet(); //設定商品規格[確認]

	if( idx_i == 0 ){
		var eItImg = eProdSpec.find("div[name='spec_itimg_upload_0']");
		setSlimImageCropper(eItImg, {
			'size': "125, 125",
			'didSave': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(1);
				setSpecListItemName(); //設定 List 的 規格選項文字
			},
			'didRemove': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(0);
				setSpecListItemName(); //設定 List 的 規格選項文字
			},
		}); //設定 Slim 圖片編輯
	}
};

//*** 新增 規格選項 ******
// 這裡才是規格相關！！！！！！！
function addSpecItem(idx_i, idx_j, oItem={}){
	var eProdSpec = eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']");
	eProdSpec.find("div[name^='spec_item_']:last").after(
														appendItemNameInput(idx_i, idx_j, oItem) //新增 規格選項 Input
													);
	//表單驗證
	formProd.find("input[name='item_name_"+idx_i+"_"+idx_j+"']").rules( "add", {
		required: true,
		special_symbols: true,  // 禁止使用特殊符號！！
	});

	eProdSpec.find("div[name='prod_spec_img']").append(
														appendItemImg(idx_i, idx_j, oItem) //新增 規格選項 Imgt
													);
	if( idx_i == 0 ){
		var eItImg = eProdSpec.find("div[name='spec_itimg_upload_"+idx_j+"']");
		setSlimImageCropper(eItImg, {
			'size': "125, 125",
			'didSave': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(1);
				setSpecListItemName(); //設定 List 的 規格選項文字
			},
			'didRemove': function(){
				$(eItImg).find("input[name^='item_img_up_']").val(0);
				setSpecListItemName(); //設定 List 的 規格選項文字
			},
		}); //設定 Slim 圖片編輯
	}

	setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕
	openBatchSetSpec(); 		//開啟批次更新規格資訊
	cfmProdSpecSet(); 			//設定商品規格[確認]
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
	setSpecListTr(); //設定 List 的 tr 列表
	if( idx_i == 1 ){
		eProdSpecList.find("tr[name='spec_name_"+idx_i+"']").show();
	}

	var aPlaceholder = ["顏色","尺寸"];
	var placeholder = aPlaceholder[idx_i]; //placeholder += "︰"+idx_i;

	var inputElem = document.createElement("input");
	inputElem.setAttribute("type", "text");
	inputElem.setAttribute("class", "pic-text-lnput pic-lnput-enter pic-margin-b15");
	inputElem.setAttribute("placeholder", "例如：" + placeholder);
	inputElem.setAttribute("name", "spec_name_" + idx_i);
	inputElem.setAttribute("idx_i", idx_i);
	inputElem.setAttribute("value", oSpec.spec_name);

	// 監聽keyup事件會造成抓到注音符號 而非輸入的值
	// 監聽input事件會造成英文未輸入完整就觸發
	// inputElem.addEventListener("input", function() {
	// 	inputSpecNameKeyup(idx_i); //規格 Input onKeyup
	// });

	inputElem.addEventListener("focusout", function() {
		inputSpecNameKeyup(idx_i); //規格 Input onKeyup
	});

	return $(inputElem);
};

//*** 規格 Input onKeyup ******
// 規格名稱！！！！！！！！！！！！！！
function inputSpecNameKeyup(idx_i){
	var spec_name = formProd.find("input[name='spec_name_"+idx_i+"']").val();
	if( typeof(spec_name) !== "undefined" ){
		if( spec_name == "" ) spec_name = "規格 "+(idx_i+1);
		oProdSpecStruct[idx_i].spec_name = spec_name;
		//console.log(oProdSpecStruct); //------------------------------------------
		//處理 List 表格
		if( idx_i == 0 ){
			eProdSpecList.find("it[name='spec_name_"+idx_i+"']").text(spec_name);
		}else{
			eProdSpecList.find("table").find("td[name='spec_name_"+idx_i+"']").text(spec_name);
		}

		var spec_name_0 = formProd.find("input[name='spec_name_0']").val();
		var spec_name_1 = formProd.find("input[name='spec_name_1']").val();

		// 驗證規格名稱不可相同
		if(spec_name_0==spec_name_1){
			if(spec_name_0 == spec_name){
				$("input[name='spec_name_1']").val('');
				$("th[name='spec_name_1']").text('規格 2');
				alert('規格名稱不可相同。');
			}
		}else{			
			cfmProdSpecSet(); //設定商品規格[確認]
		}
	}
};

//*** 移除 規格 Input ******
function removeSpecNameInput(idx_i){
	//console.log(idx_i); //------------------------------------------
	confirm("刪除規格系統將無法找回，確定要刪除？").done(function(){
		eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']").remove();
		oProdSpecStruct.splice(-1); //移除商品規格結構
		//console.log(oProdSpecStruct); //------------------------------------------
		//處理 List 表格
		if( idx_i == 0 ){
			eProdSpecList.find("div[name^='tbody_']").remove(); //移除 tbody
		}else{
			eProdSpecList.find("tr[name='spec_name_"+idx_i+"']").hide();
			eProdSpecList.find("div[name^='tbody_']").each(function(){
				$(this).find("div[name^='spec_tr_']:gt(0)").remove(); //移除 tbody 列
			});
		}
		setSpecAddBtn(); 		//設定 規格 增刪按鈕
		openBatchSetSpec(); 	//開啟批次更新規格資訊
		setHPagePriceInput(); 	//主頁價格 Input 處理
		cfmProdSpecSet(); 		//設定商品規格[確認]
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
	eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']").find("a[name='prod_spec_del']").show();
};

//*** 新增 規格選項 Input ******
function appendItemNameInput(idx_i, idx_j, oItem={}){
	//console.log(idx_i+" - "+idx_j); //------------------------------------------
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
		inputSpecNameKeyup(0); 	//規格 Input onKeyup
		inputSpecNameKeyup(1); 	//規格 Input onKeyup
	}

	if( idx_i == 0 ){
		var aPlaceholder = ["紅","橙","黃","綠","藍","靛","紫"];
	}else{
		var aPlaceholder = ["S","M","L","XL","XXL","XS","XXXL"];
	}
	var placeholder = aPlaceholder[(idx_j%aPlaceholder.length)]; //placeholder += "︰"+idx_i+"-"+idx_j;

	var formProd2 = document.querySelector("form[name='formProd']");
	var newDiv = document.createElement("div");
	newDiv.classList.add("admweb-v2-LabelBtn-green");
	newDiv.setAttribute("name", "spec_item_" + idx_j);
	
	var newInput = document.createElement("input");
	newInput.setAttribute("type", "text");
	newInput.setAttribute("placeholder", "例如：" + placeholder);
	newInput.setAttribute("name", "item_name_" + idx_i + "_" + idx_j);
	newInput.setAttribute("idx_i", idx_i);
	newInput.setAttribute("idx_j", idx_j);
	newInput.value = oItem.item_name;

	// 監聽keyup事件會造成抓到注音符號 而非輸入的值
	// 監聽input事件會造成英文未輸入完整就觸發
	// newInput.addEventListener("input", function() {
	// 	var item_name = formProd2.querySelector("input[name='item_name_" + idx_i + "_" + idx_j + "']").value;
	// 	oProdSpecStruct[idx_i].oItems['oItem_' + idx_j].item_name = item_name;
	// 	setSpecListItemName(); //設定 List 的 規格選項文字
	// 	cfmProdSpecSet(); //設定商品規格[確認]
	// });
	
	newInput.addEventListener("focusout", function() {
		var item_name = formProd2.querySelector("input[name='item_name_" + idx_i + "_" + idx_j + "']").value;
		if(idx_j == 0){
			oProdSpecStruct[idx_i].oItems['oItem_' + idx_j].item_name = item_name;
			setSpecListItemName(); //設定 List 的 規格選項文字
			cfmProdSpecSet(); //設定商品規格[確認]	
		}else{
			for (let i = 0; i < idx_j ; i++) {
				const ele = oProdSpecStruct[idx_i].oItems['oItem_'+i];
	
				// 驗證同規格名稱中的規格選項不可重複
				if(ele.item_name == item_name){
					alert('同規格名稱中的規格選項不可重複。');
					$("form[name='formProd'] input[name='item_name_"+idx_i+"_"+idx_j+"']").val('');
					$("span[name=spec_itimg_name_"+idx_i+"_"+idx_j+"]").html('&nbsp;');
					break;
				}else{
					oProdSpecStruct[idx_i].oItems['oItem_' + idx_j].item_name = item_name;
					setSpecListItemName(); //設定 List 的 規格選項文字
					cfmProdSpecSet(); //設定商品規格[確認]			
				}
			}
		}
	});

	newDiv.appendChild(newInput);
	
	var newAnchor = document.createElement("a");
	newAnchor.setAttribute("name", "spec_item_del");
	newAnchor.setAttribute("href", "javascript:void(0);");
	newAnchor.addEventListener("click", function() {
		removeItemNameInput(idx_i, idx_j); //移除 規格選項 Input
	});
	
	var newIcon = document.createElement("i");
	newIcon.classList.add("icons-line");
	newIcon.classList.add("icon-line-X");
	
	newAnchor.appendChild(newIcon);

	newDiv.appendChild(newAnchor);
	
	return $(newDiv);
};

//*** 新增 規格選項 Img ******
function appendItemImg(idx_i, idx_j, oItem={}){
	if( idx_i == 0 ){

		let imgTag, item_img_up;

		if (typeof oItem.item_img !== "undefined" && oProdSpecImg[idx_j] != '') {
			imgTag = `<img src="${oProdSpecImg[idx_j]}" />`;
			item_img_up = 1;
		} else {
			imgTag = '<span></span>';
			item_img_up = 0;
		}
		
		const spec_itimg = document.createElement('div');
		spec_itimg.setAttribute('name', `spec_itimg_${idx_j}`);
		spec_itimg.classList.add('admweb-v2-specification-images');
		
		const spec_itimg_upload = document.createElement('div');
		spec_itimg_upload.classList.add('admweb-v2-specification-AddImg');
		spec_itimg_upload.setAttribute('name', `spec_itimg_upload_${idx_j}`);
		
		spec_itimg_upload.innerHTML = `
			${imgTag}
			<input type="file" accept="image/jpeg, image/png" style="display:none;" name="item_img_slim_${idx_i}_${idx_j}">
			<input type="text" style="display:none;" name="item_img_up_${idx_i}_${idx_j}" value="${item_img_up}">
			<input type="text" style="display:none;" name="item_img_ori_${idx_i}_${idx_j}" value="${oProdSpecImg[idx_j]}">
		`;
		
		const spec_itimg_name = document.createElement('span');
		spec_itimg_name.setAttribute('name', `spec_itimg_name_${idx_i}_${idx_j}`);
		spec_itimg_name.classList.add('admweb-v2-specification-reduce');
		spec_itimg_name.innerHTML = '&nbsp;';
		
		spec_itimg.appendChild(spec_itimg_upload);
		spec_itimg.appendChild(spec_itimg_name);
					

		return $(spec_itimg);
	}else{
		return "";	
	}
};

//*** 移除 規格選項 Input ******
function removeItemNameInput(idx_i, idx_j){
	//console.log(idx_i+" - "+idx_j); //------------------------------------------
	confirm("刪除規格選項系統將無法找回，確定要刪除？").done(function(){
		eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']").find("div[name='spec_item_"+idx_j+"']").remove();
		eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']").find("div[name='spec_itimg_"+idx_j+"']").remove();
		delete oProdSpecStruct[idx_i].oItems['oItem_'+idx_j]; //移除商品規格結構
		//console.log(oProdSpecStruct); //------------------------------------------
		//處理 List 表格
		if( idx_i == 0 ){
			eProdSpecList.find("div[name='tbody_"+idx_j+"']").remove(); //移除 tbody
		}else{
			eProdSpecList.find("div[idx_b='"+idx_j+"']").remove(); //移除 tbody 列
		}
		setSpecItemAddBtn(idx_i); 	//設定 規格選項 增刪按鈕
		openBatchSetSpec(); 		//開啟批次更新規格資訊
		cfmProdSpecSet(); 			//設定商品規格[確認]
	}).fail(function(){
		return false;
	});
};

//*** 設定 規格選項 增刪按鈕 ******
function setSpecItemAddBtn(idx_i){
	var eProdSpec = eProdSpecSet.find("div[name='prod_spec_"+idx_i+"']");
	if( eProdSpec.find("a[name='spec_item_del']").length <= 1 ){
		eProdSpec.find("a[name='spec_item_del']").hide();
	}else{
		eProdSpec.find("a[name='spec_item_del']:gt(0)").show();
	}
};

//*** 設定 List 的 tr 列表 ******
function setSpecListTr(){
	//console.log(oProdSpecStruct); //------------------------------------------
	if( typeof(oProdSpecStruct[0]) !== "undefined" ){
		var oItemsA = oProdSpecStruct[0].oItems;
		var aKeysA = Object.keys(oItemsA);
	}else{
		var aKeysA = [];
	}
	if( typeof(oProdSpecStruct[1]) !== "undefined" ){
		var oItemsB = oProdSpecStruct[1].oItems;
		var aKeysB = Object.keys(oItemsB);
	}else{
		var aKeysB = ["oItem_0"];
	}
	//console.log(aKeysA, aKeysB); //------------------------------------------
	
	var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days", "prod_no_old", "prod_uid"];
	aKeysA.forEach(function(a_key, ai){
		var a = oItemsA[a_key].idx_j;
		//新增 tbody
		var eTBody = eProdSpecList.find("div[name='tbody_"+a+"']");
		if( eTBody.length == 0 ){
			eProdSpecList.append(
								$('<div class="admweb-v2-specification-frame pic-margin-10"></div>')
									.attr("name", "tbody_"+a)
									.append(
										$('<div class="admweb-v2-NewProduct-title"></div>')
											.append(
												$('<h2 class="admweb-v2-SettingsTitle"></h2>')
													.append('<img name="item_img_0_'+a+'" src="../images/skm_nopic.jpg">')
													.append('<it name="spec_name_0">規格一</it>︰<it name="item_name_0_'+a+'">[0_'+a+']</it>')
											)
											.append('<div class="pic-icon-black-arrows-rotate-up pic_margin-r5"></div>')
									)
							);
			var eTBody = eProdSpecList.find("div[name='tbody_"+a+"']");
		}
		//新增 tbody 列
		aKeysB.forEach(function(b_key, bi){
			//console.log(a_key+" - "+b_key); //------------------------------------------
			if( typeof(oItemsB) !== "undefined" ){
				var b = oItemsB[b_key].idx_j;
				var css_display = "";
			}else{
				var b = 0;
				var css_display = "none";
			}
			var _idx_ = a+"_"+b;
			//console.log(_idx_); //------------------------------------------
			if( eTBody.find("div[name='spec_tr_"+_idx_+"']").length == 0 ){
				eTBody.append(
							$('<div class="admweb-v2-specification-content pic-margin-t10"></div>')
								.attr("name", "spec_tr_"+_idx_)
								//.attr("title", "spec_tr_"+_idx_)
								.attr("idx_a", a)
								.attr("idx_b", b)
								.append(
									$('<table class="pic-table admweb-v2-specification-One-table"></table>')
										.append(
											$('<tr name="spec_name_1"></tr>')
												.append('<td name="spec_name_1" class="pic-td-title">規格二</td>')
												.append('<td name="item_name_1_0" class="pic-td-material" colspan="3" style="font-weight: 500;">[M]</td>')
												.css("display", css_display)
										)
										.append(
											$('<tr></tr>')
												.append('<td class="pic-td-title"><span class="pic-text-red">*</span>售價</td>')
												.append('<td class="pic-td-material admweb-v2-input-NT"><input name="prod_selling_price_0_0" type="text" class="pic-text-lnput pic-lnput-enter"></td>')
												.append('<td class="pic-td-title">定價</td>')
												.append('<td class="pic-td-material admweb-v2-input-NT"><input name="prod_sticker_price_0_0" type="text" class="pic-text-lnput pic-lnput-enter"></td>')
										)
										.append(
											$('<tr></tr>')
												.append('<td class="pic-td-title">成本</td>')
												.append('<td class="pic-td-material admweb-v2-input-NT"><input name="prod_cost_price_0_0" type="text" class="pic-text-lnput pic-lnput-enter"></td>')
												.append('<td class="pic-td-title"><span class="pic-text-red">*</span>庫存</td>')
												.append('<td class="pic-td-material"><input name="prod_stock_0_0" type="text" class="pic-text-lnput pic-lnput-enter"></td>')
										)
								)
								.append(
									$('<table class="pic-table admweb-v2-specification-Two-table"></table>')
										.append(
											$('<tr></tr>')
												.append('<td class="pic-td-title">預計出貨天數</td>')
												.append('<td class="pic-td-material"><span class="pic-flex-center"><input name="prod_delivery_days_0_0" type="text" class="pic-text-lnput pic-margin-r5">天</span></td>')
										)
										.append(
											$('<tr></tr>')
												.append('<td class="pic-td-title">商品原始貨號</td>')
												.append('<td class="pic-td-material"><input name="prod_no_old_0_0" type="text" class="pic-text-lnput pic-margin-r5"><input name="prod_uid_0_0" type="text" value="" style="display:none;" /></td>')
										)
								)
						);
				//修改欄位內容
				var eTrIn = eTBody.find("div[name='spec_tr_"+_idx_+"']");
				eTrIn.find("td[name^='item_name_1_']") //規格欄位二
					//.text("1_"+b) //------------------------------------------
					.attr("name", "item_name_1_"+b);
				//Input 欄位修改
				aSpecListInputName.forEach(function(inp_name, i){
					// 這裡是規格之外的全部欄位！！！！！！！！！！！！！
					eTrIn.find("input[name^='"+inp_name+"_']")
						//.attr("placeholder", _idx_)
						.attr("name", inp_name+"_"+_idx_);
				});
			}
		});
	});
	
	setSpecListItemName(); 			//設定 List 的 規格選項文字
	setSpecListInputValidator(); 	//設定 List 的 表單驗證
};

//*** 設定 List 的 規格選項文字 ******
function setSpecListItemName(){
	//console.log( oProdSpecStruct ); //------------------------------------------
	$.each(oProdSpecStruct, function(i, oSpec){
		$.each(oSpec.oItems, function(key, oItem){
			//console.log( oItem ); //------------------------------------------
			if( oItem.item_name !== null ){
				if( oItem.idx_i == 0 ){
					eProdSpecList.find("it[name='item_name_"+oItem.idx_i+"_"+oItem.idx_j+"']").text(oItem.item_name);
					
					//List 規格選項 Img
					var eInpImgUp = formProd.find("input[name='item_img_up_"+oItem.idx_i+"_"+oItem.idx_j+"']");
					var eInpImgSlim = formProd.find("input[name='item_img_slim_"+oItem.idx_i+"_"+oItem.idx_j+"']");
					var eInpImgOri = formProd.find("input[name='item_img_ori_"+oItem.idx_i+"_"+oItem.idx_j+"']");
					var _img_src_ = "../images/skm_nopic.jpg";
					if( eInpImgUp.length == 1 ){
						if( eInpImgUp.val() == "1" ){
							if( eInpImgSlim.val().length > 0 ){
								_img_src_ = JSON.parse(eInpImgSlim.val()).output.image;
							}else if( eInpImgOri.val().length > 0 ){
								_img_src_ = eInpImgOri.val();
							}
						}
					}
					eProdSpecList.find("img[name='item_img_"+oItem.idx_i+"_"+oItem.idx_j+"']")
						.attr("src", _img_src_);
				}else{
					eProdSpecList.find("td[name='item_name_"+oItem.idx_i+"_"+oItem.idx_j+"']").text(oItem.item_name);
				}
				
				//上傳規格選項圖檔文字
				if( oItem.item_name.length == 0 ){
					var item_name = "　";
				}else{
					var item_name = oItem.item_name;
				}
				eProdSpecSet.find("span[name='spec_itimg_name_"+oItem.idx_i+"_"+oItem.idx_j+"']").text(item_name);
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
	if( eProdSpecList.find("div[name^='spec_tr_']").length > 1 ){
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
				//console.log("input[name='"+inp_name+"_"+idx+"']"); //------------------------------------------
				formProd.find("input[name='"+inp_name+"_"+idx+"']").val( oProdSpec[inp_name] );
			});
		});
	}
};

//設定商品規格[驗證]
function validateProdSpecSet(is_have=true){
	var v_result_all = true; //所有驗證結果
	var eVInput = formProd.find("input[name^='spec_name_'], input[name^='item_name_']");
	if( eVInput.length > 0 ){
		eVInput.each(function(){
			var v_result = validatorProd.element("input[name='"+$(this).attr("name")+"']"); //驗證某個欄位
			//console.log( $(this).attr("name"), v_result ); //------------------------------------------
			if( !v_result ){ 
				v_result_all = false;
				//return false;
			}
		});
	}else{
		if( is_have ){ //判斷有沒有設定
			v_result_all = false;
		}
	}
	//console.log( "validateProdSpecSet", v_result_all ); //------------------------------------------
	return v_result_all;
}

//*** 設定商品規格[確認] ******
function cfmProdSpecSet(){		
	var eConfirmBtn = $("#set_prod_spec_window").find('a[name="confirm_btn"]');
	if( validateProdSpecSet() ){
		eConfirmBtn.removeClass("pic-BgText-color-gray")
					.addClass("pic-BgText-color-green")
					.click(function(){
							openSetWindow('prod_spec_list');
						});
	}else{
		eConfirmBtn.removeClass("pic-BgText-color-green")
					.addClass("pic-BgText-color-gray")
					.unbind(); //移除事件
	}
};

//*** 設定商品規格[返回] ******
function goBackProdSpecSet(){
	setHPagePriceShow(); //主頁價格呈現處理
	if( validateProdSpecSet(false) && validateProdSpecList(false) ){
		closeSetWindow('prod_spec');
	}else{
		confirm("您尚有資料未確實填寫，請問是否確認跳出？").done(function(){
			closeSetWindow('prod_spec');
		}).fail(function(){
			return false;
		});
	}
};

//設定規格資訊[驗證]
function validateProdSpecList(is_have=true){
	var v_result_all = true; //所有驗證結果
	var eVInput = formProd.find("input[name^='prod_selling_price_'], input[name^='prod_sticker_price_'], input[name^='prod_cost_price_'], input[name^='prod_stock_'], input[name^='prod_delivery_days_'], input[name^='prod_no_old_']");
	if( eVInput.length > 0 ){
		eVInput.each(function(){
			var v_result = validatorProd.element("input[name='"+$(this).attr("name")+"']"); //驗證某個欄位
			//console.log( $(this).attr("name"), v_result ); //------------------------------------------
			if( !v_result ){ 
				v_result_all = false;
				//return false;
			}
		});
	}else{
		if( is_have ){ //判斷有沒有設定
			v_result_all = false;
		}
	}
	//console.log( "validateProdSpecList", v_result_all ); //------------------------------------------
	return v_result_all;
}

//*** 設定規格資訊[確認] ******
function cfmProdSpecList(){		
	if( validateProdSpecList() && validateProdSpecSet() ){
		setHPagePriceShow(); //主頁價格呈現處理
		closeSetWindow('prod_spec');
		closeSetWindow('prod_spec_list');
	}else{
		alert("商品規格資訊尚未填寫完整或有錯誤！");
	}
};

//*** 主頁價格 Input 處理 ******
function setHPagePriceInput(){
	//console.log( oProdSpecStruct ); //------------------------------------------
	var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days", "prod_no_old", "prod_uid"];
	aSpecListInputName.forEach(function(inp_name, i){
		var eLi = $("li[name='one_"+inp_name+"']");
		var eInp = eLi.find("input[name$='"+inp_name+"_0_0']");
		if( oProdSpecStruct.length > 0 ){
			eInp.attr("name", "nn_"+inp_name+"_0_0")
				.prop("disabled", true);
			eLi.hide();
			if( inp_name == "prod_no_old" ){
				eLi.prev().hide();
			}
			formProd.find("input[name='"+inp_name+"_0_0']").val(eInp.val()); //將資料轉移至規格列表
		}else{
			eInp.attr("name", inp_name+"_0_0")
				.prop("disabled", false);
			eLi.show();
			if( inp_name == "prod_no_old" ){
				eLi.prev().show();
			}
		}
	});
}

//*** 主頁價格呈現處理 ******
function setHPagePriceShow(){
	var aSpecListInputName = ["prod_selling_price", "prod_sticker_price", "prod_cost_price", "prod_stock", "prod_delivery_days"];
	aSpecListInputName.forEach(function(inp_name, i){
		if( oProdSpecStruct.length > 0 ){
			var eInput = formProd.find("input[name^='"+inp_name+"_']");
			var aNum = [];
			eInput.each(function(){
				//console.log( $(this).attr("name"), $(this).val() ); //------------------------------------------
				var num = parseInt($(this).val());
				if( !isNaN(num) ){
					aNum.push(num);
				}
			});
			var min_num = Math.min(...aNum);
			var max_num = Math.max(...aNum);
			//console.log( aNum, min_num, max_num ); //------------------------------------------
			var _text_ = "";
			if( aNum.length !== 0 ){
				if( min_num == max_num ){
					_text_ = min_num;
				}else{
					_text_ = min_num+"~"+max_num;
				}
				if( inp_name == "prod_stock" ){
					_text_ = _text_+" 個";
				}else if( inp_name == "prod_delivery_days" ){
					_text_ = _text_+" 天";
				}else{
					_text_ = "NT$ "+_text_;
				}
			}
			$("li[name='one_"+inp_name+"']").prev().find("span[name='val_text']").text(_text_);
		}else{
			$("li[name='one_"+inp_name+"']").prev().find("span[name='val_text']").text("");
		}
	});
}

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
	//console.log( oParams.size ); //------------------------------------------
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
	var prod_type_name = formProd.find("input[name='prod_type']:checked").parent().find(".admweb-v2-label-CheckName").text();
	$("#sbtn_delivery_type").find("span[name='warning_text']").find("span[name='prod_type_name']").text(prod_type_name);
	$("#sbtn_prod_type").find("span[name='warning_text']").find("span[name='prod_type_name']").text(prod_type_name);
	
	eDeliveryType.find("div").hide();
	formProd.find("input[name='webdvr_uid[]']").prop("checked", false);
	
	if( eDeliveryType.find("div[prod_type='"+prod_type+"']").length > 0 ){
		eDeliveryType.find("div[prod_type='"+prod_type+"']").show();
		$.each(oProdDelivery, function(key, oPDelivery){
			formProd.find("input[name='webdvr_uid[]'][prod_type='"+prod_type+"'][value='"+oPDelivery.webdvr_uid+"']").prop("checked", true);
		});
		$("#sbtn_delivery_type").find("span[name='warning_text']").hide();
		$("#sbtn_delivery_type").unbind().click(function(){
													openSetWindow('webdvr_uid');
												});
		$("#sbtn_prod_type").find("span[name='warning_text']").hide();
	}else{
		$("#sbtn_delivery_type").find("span[name='warning_text']").show();
		$("#sbtn_delivery_type").unbind().click(function(){
													alert("如需使用"+prod_type_name+"溫層，請先至金物流設定開通相關服務！");
												});
		$("#sbtn_prod_type").find("span[name='warning_text']").show();
	}
	cfmDeliveryType(false); //設定運送方式[確認]
};

//*** 設定運送方式[確認] ******
function cfmDeliveryType(is_alert=true){
	var prod_type = formProd.find("input[name='prod_type']:checked").val();
	var webdvr_num = formProd.find("input[name='webdvr_uid[]'][prod_type='"+prod_type+"']:checked").length;
	
	if( webdvr_num > 0 ){
		var webdvr_text = "已限制"+webdvr_num+"種";
	}else{
		var webdvr_text = "預設";
	}
	$("#in_webdvr_num").text(webdvr_text);
	closeSetWindow('webdvr_uid');
};

/******************** 
　設定視窗處理
********************/
$(function(){
	setWindowTitle();
});

//*** 開啟視窗 ******
function openSetWindow(window_id) {
	var eWindow = $("#set_"+window_id+"_window");
	if( eWindow.length > 0 ){
		eWindow.show();
		setWindowTitle();
		//validatorProd.resetForm(); //重置驗證結果
	}
};

//*** 關閉視窗 ******
function closeSetWindow(window_id){
	var eWindow = $("#set_"+window_id+"_window");
	if( eWindow.length > 0 ){
		eWindow.hide();
		setWindowTitle();
		//validatorProd.resetForm(); //重置驗證結果
	}
};

function confirm_closeSetWindow(window_id){
	confirm("您尚有資料未確實填寫，請問是否確認跳出？").done(function(){
		// 先恢復原本的狀態
		selectProdSort(0)();
		setProdSort();

		$('#pic-navbar').html(`
			<div id="sel_prod_sort_name" class="swiper-wrapper pic-nav-list">
				<div class="swiper-slide pic-nav-a selected">請選擇</div>
				<div class="swiper-slide pic-nav-a">&nbsp;</div>
				<div class="swiper-slide pic-nav-a">&nbsp;</div>
				<div class="swiper-slide pic-nav-a">&nbsp;</div>
				<div class="swiper-slide pic-nav-a">&nbsp;</div>
			</div>`);

		// 再關閉視窗
		closeSetWindow(window_id, false);
	}).fail(function(){
		return false;
	});
}

function closeSetWindowFun(window_id){
	return function(e){
		if(window_id == 'prod_sort') confirm_closeSetWindow(window_id);
		else closeSetWindow(window_id);
	};
}

//*** 設定表頭名稱 ******
function setWindowTitle(){
	var oSetWindow = {
		"prod_add":				{"title_name":"新增商品"},
		"prod_edit":			{"title_name":"編輯商品"},
		"prod_sort":			{"title_name":"選擇商品分類"},
		"webdvr_uid":			{"title_name":"限制運送方式"},
		"group_buy_sharing":	{"title_name":"設定團購分潤"},
		"prod_spec":			{"title_name":"設定商品規格"},
		"prod_spec_list":		{"title_name":"設定規格資訊"},
	};
	var eSetWindowTitle = $("#set_window_title");
	if( eSetWindowTitle.find("span").attr("prod_uid_main").length > 0 ){
		var df_window_id = "prod_edit";
	}else{
		var df_window_id = "prod_add";
	}
	eSetWindowTitle.find("span").text(oSetWindow[df_window_id].title_name);
	eSetWindowTitle.find("a").unbind(); //移除事件
	eSetWindowTitle.find("a").click(function(){
									cancelProd();
								});

	$.each(oSetWindow, function(window_id, oWindowInfo){
		var eWindow = $("#set_"+window_id+"_window");
		if( eWindow.is(':visible') ){
			if( window_id == "webdvr_uid" ){
				var goBackFun = cfmDeliveryType;
			}else if( window_id == "group_buy_sharing" ){
				var goBackFun = cfmProdSharing;
			}else if( window_id == "prod_spec" ){
				var goBackFun = goBackProdSpecSet;
			}else{
				var goBackFun = closeSetWindowFun(window_id);
			}
			eSetWindowTitle.find("span").text(oSetWindow[window_id].title_name);
			eSetWindowTitle.find("a").unbind(); //移除事件
			eSetWindowTitle.find("a").click(function(){
												goBackFun();
											});
		}
	});
};

/******************** 
　滑動視窗處理
********************/
var eSetSlideWindow = $("#set_slide_window");
var aSlideWindowName = ["prod_type", "prod_category", "prod_market_date", "prod_cuft", "prod_tax_code"];
$(function(){
	setSlideWindowVal();
	aSlideWindowName.forEach(function(w_name, i){
		if(!(w_name == 'prod_category' && prod_update_for_check)){
			$("#sbtn_"+w_name).click(function(){
				openSlideWindow(w_name);
			});
		}
	});
});

//*** 開啟視窗 ******
function openSlideWindow(w_name){
	aSlideWindowName.forEach(function(w_name, i){
		eSetSlideWindow.find("div[name='set_"+w_name+"']").hide();
	});
	
	var eSetW  = eSetSlideWindow.find("div[name='set_"+w_name+"']");
	eSetW.show();
	eSetSlideWindow.slideDown();
};

//*** 關閉視窗 ******
function closeSlideWindow(){
	setSlideWindowVal();
	eSetSlideWindow.slideUp();
};

//*** 設定選項 ******
function setSlideWindowVal(){
	aSlideWindowName.forEach(function(w_name, i){
		if( w_name == "prod_market_date" ){
			var text = formProd.find("input[name='prod_market_sdate']").val();
			//text += " "+formProd.find("select[name='prod_market_sdate_h']").find(":selected").val();
			//text += ":"+formProd.find("select[name='prod_market_sdate_m']").find(":selected").val();
			text += "~"+formProd.find("input[name='prod_market_edate']").val();
			//text += " "+formProd.find("select[name='prod_market_edate_h']").find(":selected").val();
			//text += ":"+formProd.find("select[name='prod_market_edate_m']").find(":selected").val();
		}else if( w_name == "prod_cuft" ){
			var text = formProd.find("input[name='"+w_name+"']").val();
		}else{
			var text = formProd.find("input[name='"+w_name+"']:checked").next().next().text();
		}
		$("#sbtn_"+w_name).find("span[name='val_text']").text(text);
	});
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
