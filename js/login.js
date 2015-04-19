$(function(){
	$('#login').live('click', function(){
		var account = $("#account").val();
		var password = $("#password").val();
		
		$.ajax({
		 	url: 'login',
		 	async: false,
		 	type: 'POST',
		 	data: {
		 		a: account,
		 		p: password
		 	},
		 	success: function(response) {
		 		if (response == "200")
		 			window.location = "/index"
		 		else if (response == "401")
		 			alert("登入失敗：帳號或密碼錯誤！");
			}
		});
	});
});
