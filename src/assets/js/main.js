$(function () {
    var params = {
        'tags.label': 'INDOOR' // "INDOOR",    "BETRIEBSAUSFLUG",    "OUTDOOR",    "TEAMBUILDING",     "TEAMTAG",    "FUN",    "KICK-OFF"
    };

    sendAPIRequest();

    function sendAPIRequest() {
        $.ajax({
            type: 'GET',
            url: 'https://www.merolt.de/inventory/api/esearch/filter',
            params: params,
            success: successHandler()
        });
    }

    function successHandler(response) {
        console.log(response)
    }
});