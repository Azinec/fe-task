$(function () {
    var beerList = [];
    $.ajax({
        url: 'https://www.merolt.de/inventory/api/esearch/filter?',
        success: successHandler
    });
    
    function successHandler(response) {
        beerList = response;
        outputBeerList(beerList);
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
            $('.beer-list').append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 beerBox"><div class="allBeer" data-toggle="modal" data-target="#myModal" ><div class="image"  style="background-image: url(' +
                this.image_url + ');"></div><div class="name">' + this.name + '</div><div class="id">' +
                this.id + '</div><div class="abv">' + this.abv + '% abv</div><div class="tag">' + this.tagline + '</div><button class="show-more"  id="' +
                this.id + '">Show more</button></div></div>');
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