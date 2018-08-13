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

      var thumbnail = 'assets/images/no-image.png';


      if (element.thumbnails.length > 0) {
        thumbnail = element.thumbnails[0].mediaUrl;
      }

      $('.result').append('<a class="col-md-3 col-sm-4 col-xs-6 " target="_blank" href="https://www.merolt.de/events-inventory/?squid=' + element.squid + '">' +
        '<h2 class="title">' + element.title + '</h2>' +
        '<div class="result-item" style="background-image: url(' + thumbnail + '); "></div></a>');
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