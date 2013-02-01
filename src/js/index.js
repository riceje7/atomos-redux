var gbl_userName = "";
Object.size = function (obj) {
	var size = 0;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
Object.contains = function (obj, prop) {
	if (obj.hasOwnProperty(prop)) {
		return true;
	} else {
		return false;
	}
}
$(document).ready(function () {

	// Load registration form
	$("#registration").click(function () {
		$.get("./html/registration.html", function (html) {
			$("#content").html(html);
		});
	});


/*
Login function
*/
	$("#loginsubmit").click(function () {
		$.ajax({
			type: "POST",
			url: "./php/login.php",
			data: {
				'action': "login",
				'login': $("#login").val(),
				'password': $("#password").val()
			},
			dataType: "json",
			success: function (data) {
				if (data.status === true) {
					gbl_userName = data.user;
					$.confirm({
						'title': data.message,
						'message': 'You have been logged in successfully.',
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
					$.confirm({
						'title': 'There was an error',
						'message': data.message,
						'buttons': {
							'Try Again': {
								'class': 'gray',
								'action': function () {}
							}
						}
					});
				}
			}
		});
		return;
	});

	function checkUserLogin() {
		var response = null;
		$.ajax({
			async: false,
			type: "POST",
			url: "./php/checkuser.php",
			dataType: "json",
			success: function (data) {
				response = data;
			}
		});
		return response;
	}

	function autoLogin(login) {
		$.ajax({
			type: "POST",
			url: "./php/autologin.php",
			dataType: "json",
			data: {
				'login': login
			},
			success: function (response) {
				gbl_userName = response.user;
				$.get("./html/level-construct.html", function (html) {
					$(".containerdiv").html(html);
				});
			}
		});
	}
	var checkUser = checkUserLogin();
	if (checkUser && checkUser.status) {
		autoLogin(checkUser.login);
	}

});