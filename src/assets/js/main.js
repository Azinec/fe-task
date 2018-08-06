$(function () {
    
    var activeTags = [];
    var latestCallId = 0;
    sendAPIRequest(++latestCallId);
    
    function sendAPIRequest(callId, tags) {
        var params = {
            'maxresult': 20
        };
        
        if (tags && tags.length) {
            params ['tags.label'] = tags.join(',');
        }
        
        $.ajax({
            type: 'GET',
            url: '/inventory/api/esearch/filter',
            data: params,
            success: function (response) {
                successHandler(callId, response)
            }
            
        });
    }
    
    function successHandler(callId, response) {
        if (latestCallId !== callId) {
            return;
        }
        
        $('.result-container').empty();
        if (!response || !response.length) {
            return;
        }
        response.forEach(function (element) {
            $('.result').append('<div class="col-md-3 col-sm-4 col-xs-6 "><div class="res"><h2 class="title">' + element.title +'</h2></div></div>')
        })
    }
    
    $('.item').on('click', function () {
        var itemTag = $(this).attr("data-type");
        
        if (!itemTag) {
            return;
        }
        
        var isActive = activeTags.find(function (tag) {
            return tag === itemTag;
        });
        
        if (isActive) {
            $(this).removeClass("active");
            activeTags = activeTags.filter(function (tag) {
                return tag !== itemTag;
            });
        } else {
            $(this).addClass("active");
            activeTags.push(itemTag);
        }
        
        latestCallId = latestCallId + 1;
        
        sendAPIRequest(latestCallId, activeTags);
    })
});