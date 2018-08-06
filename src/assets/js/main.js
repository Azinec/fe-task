$(function () {
    var beerList = [];
    var params = {
        'tags.label': 'INDOOR'
    };
    
    // "INDOOR",    "BETRIEBSAUSFLUG",    "OUTDOOR",    "TEAMBUILDING",     "TEAMTAG",    "FUN",    "KICK-OFF"
    
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
        // beerList = response;
        // outputBeerList(beerList);
        console.log(response)
    }
    
    function outputBeerList(beerlist) {
        $('.beerBox').remove();
        if (beerList.length) {
            appendBeerList(beerlist);
            showBeerDescription();
        }
    }
    
    function appendBeerList(beerlist) {
        $.each(beerlist, function () {
            $('.result-container').append('<div class="container">\n' +
                '                <div class="row">\n' +
                '                    <div class="col-md-3 col-sm-4 col-xs-6">\n' +
                '                        <div class="paket">' + '</div>\n' +
                '                    </div></div></div>');
        });
    }
    
    $('#search-name').keyup(function () {
        var beerName = $(this).val().toLowerCase();
        var filtered = beerList.filter(function (beer) {
            return beer.name.toLowerCase().indexOf(beerName) !== -1;
        });
        outputBeerList(filtered);
    });
    $('.item').on('click', function () {
        $(this).toggleClass('active');
        var beerName = $(this).val().toLowerCase();
        var filtered = beerList.filter(function (beer) {
            return beer.name.toLowerCase().indexOf(beerName) !== -1;
        });
        outputBeerList(filtered);
    });
    
    $('#sort-name').on('click', function () {
        var beers = beerList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        outputBeerList(beers);
    });
    $('#sort-id').on('click', function () {
        var beers = beerList.sort(function (a, b) {
            return Number(a.id) - Number(b.id);
        });
        outputBeerList(beers);
    });
    $('#sort-tagline').on('click', function () {
        var beers = beerList.sort(function (a, b) {
            return a.tagline.localeCompare(b.tagline);
        });
        outputBeerList(beers);
    });
    $('#sort-abv').on('click', function () {
        var beers = beerList.sort(function (a, b) {
            return a.abv - b.abv;
        });
        outputBeerList(beers);
    });
});