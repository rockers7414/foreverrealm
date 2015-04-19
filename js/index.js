$(function(){
	$(document).ready(function(){
		levelsort();
	});
	
	$('#levelsort').live('click', function(){
		levelsort();
	});
	
	$('#ro').live('click', function(){
		levelsortbyclass(0);
	});
	
	$('#kn').live('click', function(){
		levelsortbyclass(1);
	});
	
	$('#ef').live('click', function(){
		levelsortbyclass(2);
	});
	
	$('#ma').live('click', function(){
		levelsortbyclass(3);
	});
	
	$('#de').live('click', function(){
		levelsortbyclass(4);
	});
	
	$('#dk').live('click', function(){
		levelsortbyclass(5);
	});
	
	$('#il').live('click', function(){
		levelsortbyclass(6);
	});
	
	$('#jobratio').live('click', function(){
		var div = $('<div>').attr({id: 'chart'});
		$('#center').html(div);
		
		$.ajax({
			url: 'data',
		 	async: false,
		 	type: 'POST',
		 	dataType: 'json',
		 	data: {
		 		a: 'LIST'
		 	},
		 	success: function(response) {
		 		var ro = 0;
		 		var kn = 0;
		 		var ef = 0;
		 		var ma = 0;
		 		var de = 0;
		 		var dk = 0;
		 		var il = 0;
		 		var sum = 0;
		 		$.each(response[0], function(){
		 			switch (this.job)
					{
						case 0: ro++; break;
						case 1: kn++; break;
						case 2: ef++; break;
						case 3: ma++; break;
						case 4: de++; break;
						case 5: dk++; break;
						case 6: il++; break;
					}
					sum++;
		 		});
		 		
		 		var data = [
		 			['王族(' + (ro / sum * 100).toFixed(2) + '%)', ro],
		 			['騎士(' + (kn / sum * 100).toFixed(2) + '%)', kn], 
		 			['妖精(' + (ef / sum * 100).toFixed(2) + '%)', ef], 
		 			['法師(' + (ma / sum * 100).toFixed(2) + '%)', ma], 
		 			['黑暗妖精(' + (de / sum * 100).toFixed(2) + '%)', de], 
		 			['龍騎士(' + (dk / sum * 100).toFixed(2) + '%)', dk], 
		 			['幻術師(' + (il / sum * 100).toFixed(2) + '%)', il]
		 		];
		 		
		 		var plot1 = jQuery.jqplot('chart', [data], {
		 			seriesColors: [ "#579575", "#d8b83f", "#ff5800", "#0085cc","#4bb2c5", "#9900FF", "#FFFF00"],
		 			seriesDefaults: {
		 				renderer: jQuery.jqplot.PieRenderer,
		 				rendererOption: {
		 					showDataLables: true
		 				}
		 			},
		 			legend: { show: true, location: 'e' }
		 		});
		 	}
		});
	});
	
	$('#claninfo').live('click', function(){
		var div = $('<div>').attr({id: 'info'});
		var ul = $('<ul>');
		ul.append($('<li>').html('永恆境界血盟盟徽目前為一盾牌，盾牌上有一隻馬。<br/><p>若您的盟徽與上述不同，表示您有盟徽錯亂的問題，欲解決這些問題，請至本網站檔案下載處，下載盟徽修正程式。<br />使用方法：關閉天堂後，並安裝至天堂資料夾中再上線，即可看到正常盟徽</p>'))
		  .append($('<li>').html('本盟RC：25584571<br /><p>申請加入時，請記得留下您的ID。</p>'))
	      .append($('<li>').html('本盟臉書社團：http://www.facebook.com/groups/ForeverRealm<br /><p>申請加入時，請記得在線上通知守護騎士，麻煩守護騎士幫忙審核。</p>'));
	    $('#center').html(div.html(ul));
	});
	
	$('#file').live('click', function(){
		var div = $('<div>').attr({id: 'info'});
		var ul = $('<ul>');
		ul.append($('<li>').html($('<a>').attr({href: 'http://dl.dropbox.com/u/57199150/EmbRecover_20120716.exe'}).html('盟徽修正程式'))
						   .append('<p class="file">MD5:f4b4d7516bc0019ceca41e2b29cf9136'))
		  .append($('<li>').html($('<a>').attr({href: 'http://dl.dropbox.com/u/57199150/TeamViewer.rar'}).html('遠端程式TeamViewer'))
						   .append('<p class="file">MD5:47cf09c2a091ec9dda063f07df46251a'))
		  .append($('<li>').html($('<a>').attr({href: 'http://dl.dropbox.com/u/57199150/zeemmd5.exe'}).html('MD5檔案驗證程式'))
						   .append('<p class="file">MD5:1d2e58f3dbe32d7ed6cc23f38c4a014c'))
		  .append($('<li>').html($('<a>').attr({href: 'http://dl.dropbox.com/u/57199150/gamania_login.exe'}).html('最新登錄器 2012/8/24'))
						   .append('<p class="file">MD5:fd7546ed6327b06ffb1a9d1fe03e710e'));
		$('#center').html(div.html(ul));
	});
	
	$('#logout').live('click', function(){
		$.ajax({
			url: 'logout',
		 	async: false,
		 	type: 'POST',
		 	success: function(response) {
		 		location.reload();
			}
		});
	});
});

function levelsort()
{
	var div = $('<div>').attr({id:'joblist'});
	var ul = $('<ul>').append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'ro'}).html('王族')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'kn'}).html('騎士')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'ef'}).html('妖精')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'ma'}).html('法師')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'de'}).html('黑暗妖精')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'dk'}).html('龍騎士')))
	   		 		  .append($('<li>').append($('<a>').attr({href:'javascript:void(0);', id:'il'}).html('幻術師')));
	div.html(ul);
	$('#center').html(div)
	
	$.ajax({
		url: 'data',
	 	async: false,
	 	type: 'POST',
	 	dataType: 'json',
	 	data: {
	 		a: 'LIST'
	 	},
	 	success: function(response) {
			var table = $('<table>').attr({id:'levellist'});
			var tr = $('<tr>');
			tr.append($('<th>').html('名次').attr({width: '50px'}))
			  .append($('<th>').html('名稱'))
			  .append($('<th>').html('職業').attr({width: '100px'}))
			  .append($('<th>').html('更新日期').attr({width: '200px'}));
			table.append(tr);
			
			$.each(response[0], function(index){
				var tr = $('<tr>');
				if (this.lv == 1) {
					tr.append($('<td>').html(index + 1));
					tr.append($('<td>').html(this.id));
					switch (this.job)
					{
						case 0: tr.append($('<td>').html('王族')); break;
						case 1: tr.append($('<td>').html('騎士')); break;
						case 2: tr.append($('<td>').html('妖精')); break;
						case 3: tr.append($('<td>').html('法師')); break;
						case 4: tr.append($('<td>').html('黑暗妖精')); break;
						case 5: tr.append($('<td>').html('龍騎士')); break;
						case 6: tr.append($('<td>').html('幻術師')); break;
					}
					tr.append($('<td>').html(this.date));
				} else {
					tr.append($('<td>').html(index + 1).addClass('nqualified'));
					tr.append($('<td>').html(this.id).addClass('nqualified'));
					switch (this.job)
					{
						case 0: tr.append($('<td>').html('王族').addClass('nqualified')); break;
						case 1: tr.append($('<td>').html('騎士').addClass('nqualified')); break;
						case 2: tr.append($('<td>').html('妖精').addClass('nqualified')); break;
						case 3: tr.append($('<td>').html('法師').addClass('nqualified')); break;
						case 4: tr.append($('<td>').html('黑暗妖精').addClass('nqualified')); break;
						case 5: tr.append($('<td>').html('龍騎士').addClass('nqualified')); break;
						case 6: tr.append($('<td>').html('幻術師').addClass('nqualified')); break;
					}
					tr.append($('<td>').html(this.date).addClass('nqualified'));
				}
				table.append(tr);
			});
			
			$('#center').append($('<div>').attr({id: 'averdiv'}).html('平均等級：' + response[1].aver)).append(table);
		}
	});
}

function levelsortbyclass(cls)
{
	var table = $('#levellist');
	table.find("tr:gt(0)").remove();
	$.ajax({
		url: 'data',
	 	async: false,
	 	type: 'POST',
	 	dataType: 'json',
	 	data: {
	 		a: 'LIST',
	 		cls: cls
	 	},
	 	success: function(response) {	
	 		var i = 1;
			$.each(response[0], function(){
				var tr = $('<tr>');
				if (this.lv == 1) {
					tr.append($('<td>').html(i++));
					tr.append($('<td>').html(this.id));
					switch (this.job)
					{
						case 0: tr.append($('<td>').html('王族')); break;
						case 1: tr.append($('<td>').html('騎士')); break;
						case 2: tr.append($('<td>').html('妖精')); break;
						case 3: tr.append($('<td>').html('法師')); break;
						case 4: tr.append($('<td>').html('黑暗妖精')); break;
						case 5: tr.append($('<td>').html('龍騎士')); break;
						case 6: tr.append($('<td>').html('幻術師')); break;
					}
					tr.append($('<td>').html(this.date));
				} else {
					tr.append($('<td>').html(i++).addClass('nqualified'));
					tr.append($('<td>').html(this.id).addClass('nqualified'));
					switch (this.job)
					{
						case 0: tr.append($('<td>').html('王族').addClass('nqualified')); break;
						case 1: tr.append($('<td>').html('騎士').addClass('nqualified')); break;
						case 2: tr.append($('<td>').html('妖精').addClass('nqualified')); break;
						case 3: tr.append($('<td>').html('法師').addClass('nqualified')); break;
						case 4: tr.append($('<td>').html('黑暗妖精').addClass('nqualified')); break;
						case 5: tr.append($('<td>').html('龍騎士').addClass('nqualified')); break;
						case 6: tr.append($('<td>').html('幻術師').addClass('nqualified')); break;
					}
					tr.append($('<td>').html(this.date).addClass('nqualified'));
				}
				table.append(tr);
			});
			
			$('#center').append(table);
			if (response != '')
				$('#averdiv').html('平均等級：' + response[1].aver);
			else
				$('#averdiv').html('平均等級：' + 0);
		}
	});
}
