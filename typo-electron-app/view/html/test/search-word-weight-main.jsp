<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/header.jsp" %>
<style>
	.layer_dim{
		width: 100vw;
		height: 100vh;
		position: fixed;
		background-color: rgba(0 0 0 / 80%);
		top: 0px;
		right: 0px;
		display: grid;
		justify-content: center;
		align-items: center;
	}

	#search_options_wrapper table.tbl-row{
		width: 100.1%;
	}
	#search_options_wrapper table.tbl-row td{
		padding:0;
	}
	#search_options_wrapper table.tbl-row.table_header td{
		padding:0;
	}
	#search_options_wrapper .table_wrapper {
		height: 69.6vh;
		overflow: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	#search_options_wrapper .table_wrapper::-webkit-scrollbar {
   		display: none;
	}
	#search_options_wrapper .table_wrapper table.tbl-row{
		margin-top: 0;
		border-top: none;
	}
	#search_options_wrapper table.tbl-row thead th{
		border-left: 1px solid #ddd;
		background-color: #f7f7f7;
		font-size: 12px;
		font-weight: 700;
		color: #121212;
		text-align: left;
		vertical-align: middle;
		padding: 5px 10px 5px;
		line-height: 1.4;
		text-align-last: center;
	}
	#search_options_wrapper table.tbl-row tbody tr td {
		border-left: 1px solid #ddd;
		text-align: center;
		text-align: -webkit-center;
		line-height: 80%;
		overflow-wrap: break-word;
		height: 1vh;
	}
	#search_options_wrapper .tbl-row thead>tr>th {
		background-color: #f7f7f7;
		text-align: left;
		padding: 5px 10px 5px;
		line-height: 1.4;
		color: #222;
		vertical-align: middle;
		font-size: 14px;
		font-weight: 700;
		font-family: "Malgun Gothic", 'MalgunGothic', '맑은고딕', 'Gothic','고딕', sans-serif;
		height: 4.9vh;
	}
	.wrap-search-tbl .search-tbl table > tbody > tr > td > ul.ip-box-list{
		text-align: -webkit-left;
		text-align: left;
		padding-left: 1vw;
	}
	table.tbl-row .ui-chk{
		margin: 0 0 2.5vh 0.4vw;
	}
	.search_options td{
		padding: 0;
	}
	.search_options td.static_keyword_td{
		display: flex;
		border: none;
		border-left: 1px solid #ddd;
	}
	.search_options td input, .search_options td select{
		border: none;
		height: 100%;
		width: 100%;
	}
	.search_options td select+label{
		font-size: 10px;
		padding-right: 1vw;
		position: absolute;
		right: 0;
		pointer-events: none;
	}
	.search_options select.ui-sel{
		width: 100%;
		background: none;
		padding-right: 0;
	}
	.search_options select.ui-sel .select_default_text{
		background: none;
		color: #00000059;
		font-size: 12px;
		letter-spacing: -0.3px;
		font-weight: 700;
	}
	select.ui-sel:focus, select.ui-sel:hover {
		border: 1px solid #f2827f;
		box-shadow: 0 0 0 1px #f2827f inset;
		color: #ed7672;
		outline: 0;
	}
	.search_options .near_option_input_wrapper{
		width: 9vw;
		height: 100%;
		border-right: 1px solid #ddd;
	}
	.search_options .near_option_input_wrapper > input{
		height: 100%;
		border-right: 1px solid #ddd;
	}
	.search_options td div{
		display: flex;
		position: relative;
		height: 100%;
		width: 100%;
		align-items: center;
	}
	.search_options .static_keyword_wrapper{
		display: flex;
		width: inherit;
		height: inherit;
	}
	.search_options .static_keyword_wrapper input.static_keyword_range{
		width: 50%;
		margin: 0;
	}
	.search_options .static_keyword_wrapper input.static_keyword_range[data-index="1"]{
		border-right: 1px solid #ddd;
	}
	.sort_th > div{
		display: flex;
		justify-content: center;
		position: relative;
	}
	.layer_title{
		display: inline-block;
    	font-size: 20px;
    	font-weight: 700;
    	color: #111;
    	vertical-align: top;
    	letter-spacing: -1.275px;
	}
	.close_btn_x{
		content: ' ';
	    display: inline-block;
	    overflow: hidden;
	    background: url(${Const.URL_CDN_STATIC}/static/images/common/sprite.png);
	    background-repeat: no-repeat;
	    vertical-align: top;
	    width: 14px;
	    height: 14px;
	    background-position: 0px -25px;
	    cursor: pointer;
	    margin-top: 1.1%;
	    margin-left: 0.1vw;
	    zoom: 135%;
	}
</style>
<!-- S : container -->
<div class="container">
	<div class="content-box ifr-sub">
		<div class="page-header">
			<div class="fl">
				<h2 class="page-title">검색 가중치 관리</h2>
				<!-- DESC : 즐겨찾기 등록시 btn-favorites영역 active 클래스 추가 -->
				<button type="button" class="btn-favorites"><span class="ico ico-star"><span class="offscreen">즐겨찾기 등록</span></span></button>
			</div>
			<div class="fr">
				<div class="navi-wrap">
					<ul class="navi">
						<li class="home"><a href="javascript:void(0)" onclick="top.document.querySelector('div#tabs.tabmenu ul li:nth-child(1) a').click();"><i class="ico ico-home"><span class="offscreen">홈</span></i></a></li>
						<li>전시관리</li>
						<li>검색어 관리</li>
						<li>검색 가중치 관리</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="content-header">
			<div class="fl">
				<h3 class="content-title"></h3>
			</div>
		</div>
		<form id="query_mst"></form>
		<div class="tab-wrap"  id="tabDetail">
			<div>
				<ul class="tabs">
					<li class="tab-item">
						<a href="#content_wrapper_en" class="tab-link" id="tabSearchWord">영문</a>
					</li>
					<li class="tab-item">
						<a href="#content_wrapper_jp" class="tab-link" id="tabFamousWord">일문</a>
					</li>
				</ul>
			</div>
			<div id="content_wrapper_en" class="tab_panel" data-lang_code="en" data-aces_cntry_code="00" data-query_type_code="00">
				<div id="content_wrapper_tab">
					<div class="wrap-search-tbl open">
						<div class="search-tbl">  			
								<table class="tbl-row table_header">
									<caption>검색 가중치 관리</caption>
									<colgroup>
										<col style="width:10%;"/>
										<col/>
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">검색 필드 간 조건</th>
											<td class="input" colspan="5">
												<ul class="ip-box-list">
													<li>
														<span class="ui-rdo">
															<!-- DESC : input id / label for 동일하게 맞춰주세요 -->
															<input id="dispOr" name="parentLogicCode" type="radio" value="10" checked="checked">
															<label for="dispOr">OR(또는)</label>
														</span>
													</li>
													<li>
														<span class="ui-rdo">
															<!-- DESC : input id / label for 동일하게 맞춰주세요 -->
															<input id="dispAnd" name="parentLogicCode" type="radio" value="20">
															<label for="dispAnd">AND(그리고)</label>
														</span>
													</li>
													<li>
														<span class="ui-rdo">
															<!-- DESC : input id / label for 동일하게 맞춰주세요 -->
															<input id="dispNot" name="parentLogicCode" type="radio" value="30">
															<label for="dispNot">NOT(아니면)</label>
														</span>
													</li>
												</ul>
											</td>
										</tr>					
									</tbody>
								</table>
							<div class="content-bottom">
							</div>	
						</div>		
						<!-- <button type="button" class="btn-search-tbl-toggle" aria-expanded="true"><span class="offscreen">닫기</span></button> -->
					</div>
					 				
					<div class="content-header">
						<div class="fl">
							<h3 class="content-title"></h3>
						</div>
					</div>
					<div class="tbl-controller">
						<div class="fl">
							<button type="button" class="btn-sm btn-link" onclick="weightHistoryLayer.open();">변경 이력</button>		
						</div>
						<div class="fr">
							<button type="button" class="btn-sm btn-link" onclick="tempQueryLayer.open();">임시저장 불러오기</button>
							<button type="button" class="btn-sm btn-link" onclick="pageHandler.createParameter().then(param=>indexedDBHandler.tempSaveButtonClickEvent(param));">임시저장</button>
							<button type="button" class="btn-sm btn-link" onclick="pageHandler.addContentItem(); pageHandler.tableWrapper.scrollTo(undefined,9999)">행추가</button>
							<button type="button" class="btn-sm btn-link" onclick="pageHandler.deleteContentItem();">행삭제</button>
						</div>		
					</div>
					<div id="search_options_wrapper">
						<table class="tbl-row header" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td style="width: 100%;">
										<div>
											<table>												
												<colgroup>
													<col style="width: 3.9%;"><!-- 체크박스 -->
													<col style="width: 3.9%;"><!-- No -->
													<col style="width: 14%;"><!-- 필드 -->
													<col style="width: 10%;"><!-- 논리조건 -->
													<col style="width:10%;"><!-- 검색 옵션 -->
													<col style="width: 50%;"><!-- 지정값 -->
													<col style="width:10%;"><!-- 가중치 -->
												</colgroup>
												<thead>
													<tr data-column_id="active"><th>
														<span class="ui-chk">
															<input type="checkbox" id="all_delete" onchange="pageHandler.checkAllChangeEvent(this);">
															<label for="all_delete"></label>
														</span>
													</th>
													<th data-column_id="no">No</th>
													<th data-column_id="fieldName" class="required_value">필드</th>
													<th data-column_id="logicOptionCode" class="sort_th">
														<div>
															<button id="logic_btn" type="button" style="font-weight: bold;" onclick="pageHandler.sortBtnEvent(this);">
																논리조건
															</button>
														</div>
													</th>
													<th data-column_id="compoundOptionCode">검색 옵션</th>
													<th data-column_id="staticKeyword" >지정값</th>
													<th data-column_id="boostOption" >가중치</th>
												</tr></thead>
											</table>
										</div>
									</td>
									<td dir="ltr" rowspan="2" valign="top" style="position: relative;padding: 0;">
										<div style="width: 18px;position: absolute;top: 0;left: -0.01vw;">
											<div id="top_scroll" style="width: 18px;overflow: hidden scroll;height: 76.9vh;" onscroll="pageHandler.scrollHandler(this);" onmouseover="this.setAttribute('is_mouse_enter','')" onmouseout="this.removeAttribute('is_mouse_enter')">
												<div class="max_scroll_value" style="height: 100vh;">&nbsp;</div>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="table_wrapper" onkeyup="pageHandler.activeRow(this, event)" onchange="pageHandler.activeRow(this, event);" onscroll="pageHandler.scrollHandler(this);" onmouseover="this.setAttribute('is_mouse_enter','')" onmouseout="this.removeAttribute('is_mouse_enter')">
							<table class="tbl-row" id="search_table">
								<colgroup>
									<col style="width: 3.9%;"><!-- 체크박스 -->
									<col style="width: 3.9%;"><!-- No -->
									<col style="width: 14%;"><!-- 필드 -->
									<col style="width: 10%;"><!-- 논리조건 -->
									<col style="width:10%;"><!-- 검색 옵션 -->
									<col style="width: 50%;"><!-- 지정값 -->
									<col style="width:10%;"><!-- 가중치 -->
								</colgroup>
								<tbody>
									<tr class="search_options">
										<td data-row_id="active"> <!-- 체크박스 td 동적으로 생성-->

										</td>
										<td data-row_id="no"> <!-- No td -->
											
										</td>
										<td data-row_id="fieldName"> <!-- 필드 이름 선택 td -->
											<input list="fields_data_list" class="ui-input" name="fieldName" placeholder="필드 이름 선택" onblur="pageHandler.checkFieldName(this)">
											<datalist id="fields_data_list">

											</datalist>
										</td>
										<td data-row_id="logicOptionCode"> <!-- 논리 조건 선택 td -->
											<div>
												<select data-info="논리 선택" id="logic_option" class="ui-sel" name="logicOptionCode">
													<option value="" class="select_default_text" selected disabled>논리 조건</option>
													<option value="10">or</option>
													<option value="20">and</option>
													<option value="30">not</option>
												</select>
												<label for="logic_option">▼</label>
											</div>
										</td>
										<td data-row_id="compoundOptionCode"> <!-- 검색 옵션 선택 td -->
											<div>
												<select data-info="검색 옵션 선택" class="ui-sel" name="compoundOptionCode" 
												onchange="pageHandler.compoundOptionOnChange(this);"
												>
													<option value="" class="select_default_text" selected disabled>검색 옵션 선택</option>
													<option value="10" class="near_option">near (문장간 거리 검색)</option>
													<option value="20">phrase (어절 검색)</option>
													<option value="30">prefix (접두사 검색)</option>
													<option value="40" class="range_option">range (숫자 범위 검색)</option>
													<option value="50">term (용어 검색)</option>
												</select>
												<label for="logic_option">▼</label>
											</div>
										</td>
										<td data-row_id="staticKeyword"> <!-- 지정값 입력 td -->
											<div>
												<div class="near_option_input_wrapper" style="display: none;">
													<input data-info="near 옵션일 때 문장간 검색 노출" class="distance_option ui-input" name="distanceOption" type="number" placeholder="문장간 거리">
												</div>
												<div>
													<input type="hidden" name="staticKeyword" class="static_keyword">
													<div class="static_keyword_wrapper">
														<input data-info="고정 키워드 검색" class="static_keyword_text ui-input" type="text" placeholder="고정 검색어 미사용시 테스트에서 입력한 키워드가 이 필드에 자동 입력됩니다." 
															onkeyup="this.parentElement.previousElementSibling.value=this.value"
															onblur="this.parentElement.previousElementSibling.value=this.value; pageHandler.createParameter();"
														/>
														<input data-info="range 범위 검색 첫번째" class="static_keyword_range ui-input" data-index="1" type="number" placeholder="범위 최소" 
															onkeyup="this.parentElement.previousElementSibling.value='[' + this.value + ',' + this.nextElementSibling.value + ']'"
															onblur="this.parentElement.previousElementSibling.value='[' + this.value + ',' + this.nextElementSibling.value + ']'; pageHandler.createParameter();"
														/>
														<input data-info="range 범위 검색 두번째" class="static_keyword_range ui-input" data-index="2" type="number" placeholder="범위 최대" 
															onkeyup="this.parentElement.previousElementSibling.value='[' + this.previousElementSibling.value + ',' + this.value + ']'"
															onblur="this.parentElement.previousElementSibling.value='[' + this.previousElementSibling.value + ',' + this.value + ']'; pageHandler.createParameter();"
														/>
													</div>
												</div>
											</div>
										</td>
										<td data-row_id="boostOption"> <!-- 가중치 입력 td -->
											<div>
												<input data-info="가중치 옵션" class="ui-input" name="boostOption" type="number" min="1" max="100" placeholder="숫자 입력" 
												onblur="pageHandler.checkBoostOption(this);"
												/>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div style="height: 18px;overflow: hidden;width: 100%;">
							<div id="left_scroll" style="height: 18px;overflow: auto;" tabindex="-1" onscroll="pageHandler.scrollHandler(this);" onmouseover="this.setAttribute('is_mouse_enter','')" onmouseout="this.removeAttribute('is_mouse_enter')">
								<div class="max_scroll_value" style="height: 1px; overflow: hidden; width: 100vw;">&nbsp;</div>
							</div>
						</div>
					</div>
					<div class="content-header">
						<div class="fl">
							<h3 class="content-title"></h3>
						</div>
					</div>
					<div class="bottom_button_wrapper" style="display: flex;justify-content: center;gap: 3%;">
						<button class="btn-sm btn-link" onclick="pageHandler.createParameter().then(param=>indexedDBHandler.tempSaveButtonClickEvent(param));">임시저장</button>
						<button class="btn-lg btn-link" style="background-color: #0564d9d1;color: white;" onclick="searchTestLayer.open();">테스트</button>
						<button class="btn-lg btn-link" style="background-color: #0564d9d1;color: white;" onclick="pageHandler.updateQuery(); pageHandler.callPageQuery(getActiveTabPanel());">반영</button>
					</div>
				</div>
			</div>

			<div id="content_wrapper_jp" class="tab_panel" data-lang_code="jp" data-aces_cntry_code="110" data-query_type_code="00">
		
			</div>
		</div>
	</div>
</div>



<script type="text/javascript" src="${Const.URL_CDN_STATIC}/static/common/js/base/shop.temp.save.indexed.db.handler.js"></script>
<script type="text/javascript" src="${Const.URL_CDN_STATIC}/static/common/js/base/shop.temp.save.indexed.db.layer.js"></script>
<script type="text/javascript" src="${Const.URL_CDN_STATIC}/static/common/js/biz/display/search_weight/shop.display.searchword.weight.js"></script>
<script type="text/javascript" src="${Const.URL_CDN_STATIC}/static/common/js/biz/display/search_weight/shop.display.searchword.weight.layer.js"></script>
<script type="text/javascript" src="${Const.URL_CDN_STATIC}/static/common/js/biz/display/search_weight/shop.display.searchword.weight.history.layer.js"></script>
<script type="text/javascript">
	const urlCdnStatic = '${Const.URL_CDN_STATIC}';
	function getActiveTabPanel(){
		let activeTabIndex = $('#tabDetail').tabs('option','active');
		return document.querySelectorAll('.tab_panel')[activeTabIndex];
	}

	document.querySelector('#fields_data_list').replaceChildren(
		...[...document.querySelector('#fields_data_list').options]
			.sort((a,b)=>{
				if(a.textContent =='' || b.textContent == ''){
					return 0
				}else{
					return a.textContent.localeCompare(b.textContent)
				}		
			})
			.map(e=>{
				if(e.textContent == ''){
					e.textContent = e.value
				}
				return e;
			})
	);

	const pageHandler = new PageHandler();
	
	const searchTestLayer = new SearchTestLayer((keyword) => pageHandler.createParameter(keyword), '${Const.URL_CDN_IMAGE}'); 
	searchTestLayer.layerParent = pageHandler.main;
	searchTestLayer.querySelector('#search_field').append(...document.querySelector('#fields_data_list').cloneNode(true).options)

	const indexedDBHandler = new IndexedDBHandler();
	const tempQueryLayer = new TempQueryLayer(indexedDBHandler);
	
	tempQueryLayer.tempDataLoadButtonClickCallBack = (boTempData) => {
		pageHandler.renderingQueryMst(boTempData); 
		tempQueryLayer.close();
	}
	tempQueryLayer.layerParent = pageHandler.main;
	
	const weightHistoryLayer = new WeightHistoryLayer();

	weightHistoryLayer.historyDataLoadButtonClickCallBack = (queryMst) => {
		pageHandler.renderingQueryMst(queryMst); 
		tempQueryLayer.close();	
	}
	

	$("#tabDetail").on('tabsactivate', function(event, ui){
		ui.newPanel[0].append(
			ui.oldPanel[0].querySelector('#content_wrapper_tab')
		)
		pageHandler.callPageQuery(ui.newPanel[0])
	})
	$("#tabDetail").tabs({
		create: (event, ui)=>{
			pageHandler.callPageQuery(ui.panel[0]);
			pageHandler.createParameter();
		}
	})
	//let activeTabIndex = $('#tabDetail').tabs('option','active');
	//let queryMstInfo = this.main.querySelectorAll('.tab_panel')[activeTabIndex];
</script>
<!-- E : container -->

<%@include file="/WEB-INF/views/common/footer.jsp" %>