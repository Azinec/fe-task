(function($) {
	var activeTags = [];

	sendAPIRequest();

	function sendAPIRequest(tags) {
		var params = {
			'maxresult': 20
		};

		if (tags && tags.length) {
			params['tags.label'] = tags.join(',');
		}
		$.ajax({
			type: 'GET',
			url: '/inventory/api/esearch/filter',
			data: params,
			success: function(response) {
				successHandler(response);
			}
		});
	}

	function successHandler(response) {
		if (!response || !response.length) {
			return;
		}
		$('.result').empty();
		response.forEach(function(element) {
			var thumbnails = element.thumbnails,
					   a = thumbnails.length;

	      	a > 0 ? $('.result').append('<div class="col-md-3 col-sm-4 col-xs-6 ">' +
						'<div class="res" style="background-image: url(' + thumbnails[0].mediaUrl + '); "><h2 class="title">' + element.title + '</h2></div></div>') : $('.result').append('<div class="col-md-3 col-sm-4 col-xs-6 ">' +
						'<div class="res" style="background-image: url(assets/images/no-image.png );"><h2 class="title">' + element.title + '</h2></div></div>');
		});
	}

	$('.item').on('click', function() {
		var itemTag = $(this).attr('data-type');
		var isActive = $(this).hasClass('active');

		if (!itemTag) {
			return;
		}
		if (!isActive) {
			activeTags.push(itemTag);
		} else {
			activeTags = activeTags.filter(function(tag) {
				return tag !== itemTag;
			});
		}
		$(this).toggleClass('active', !isActive);
		sendAPIRequest(activeTags);
	});
})(jQuery);