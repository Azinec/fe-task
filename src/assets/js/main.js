$(function () {
    var params = {
        'maxresult': 50,
        'tags.label': 'INDOOR' // "INDOOR",    "BETRIEBSAUSFLUG",    "OUTDOOR",    "TEAMBUILDING",     "TEAMTAG",    "FUN",    "KICK-OFF"
    };

    sendAPIRequest();

    function sendAPIRequest() {
        $.ajax({
            type: 'GET',
            url: '/merolt',
            data: params,
            success: successHandler
        });
    }

    function successHandler(response) {
        console.log('response::', response);
    }
});