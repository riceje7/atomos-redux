$(document).ready(function () {
	$("#registersubmit").click(function () {
		$.ajax({
			type: "POST",
			url: "./php/register.php",
			data: {
				'login': $("#login").val(),
				'password': $("#password").val(),
				'password2': $("#password2").val(),
				'sex': $("#registerform input[type='radio']:checked").val()
			},
			dataType: "json",
			success: function (data) {
				if (data.status === true) {
					gbl_userName = data.user;
					$.confirm({
						'title': data.message,
						'message': 'You have been logged in successfully.<br/><br/>Your USERNAME is:<br/>'+data.user,
						'buttons': {
							'Okay': {
								'class': 'blue',
								'action': function () {
									$.get("./html/level-construct.html", function (html) {
										$(".containerdiv").html(html);
									});
								}
							}
						}
					});
				} else if (data.status === false) {
					alert(data.message);
				}
			},
			error: function (jqxhr) {
				console.log(jqxhr.responseText);
			}
		});
		return false;
	});
	
	/*
	 * back button
	 */
	$("#backbutton").click(function() {
		$.get("./login.html", function(html) {
			$("#content").html(html);
		});
	});
});