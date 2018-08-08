(function($){
	var activeTags = [];
	sendAPIRequest();
	
	function sendAPIRequest(tags) {
		var params = {
			"maxresult": 20,
		};
		
		if (tags && tags.length) {
			params ["tags.label"] = tags.join(",");
		}
		$.ajax({
			type: "GET",
			url: "/inventory/api/esearch/filter",
			data: params,
			success: function (response) {
				successHandler(response);
			}
		});
	}
	
	function successHandler(response) {
		$(".result").empty();
		if (!response || !response.length) {
			return;
		}
		response.forEach(function (element) {
			$(".result").append("<div class='col-md-3 col-sm-4 col-xs-6 '>" +
					"<div class='res'><h2 class='title'>" + element.title + "</h2></div></div>");
		});
	}
	
	$(".item").on("click", function () {
		var itemTag = $(this).attr("data-type");
		
		if (!itemTag) {
			return;
		}
		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			activeTags.push(itemTag);
		} else {
			activeTags = activeTags.filter(function (tag) {
				return tag !== itemTag;
			});
		}
		sendAPIRequest(activeTags);
	});
})(jQuery);