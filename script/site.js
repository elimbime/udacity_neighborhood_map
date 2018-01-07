var markersInit = [{
    position: {
        lat: 48.862592,
        lng: 2.3512000000000626
    },
    title: 'Anti Cafe Beaubourg'
},
{
    position: {
        lat: 48.8626116,
        lng: 2.3520730000000185
    },
    title: 'Workshop Paris'
},
];


function getWikipediaInformation() {
    var urlWikipdedia = "https://en.wikipedia.org/w/api.php";

    var paramsWikipedia = {
        'action': 'opensearch',
        'search': city,
        'format': 'json',
    };

    $.ajax({
        dataType: "jsonp",
        url: urlWikipdedia,
        data: paramsWikipedia,
        success: function (data) {
            var articles = data[1];
            var artilcesLinks = data[3];
            var length = articles.length;
            for (var index = 0; index < length; index++) {
                $wikiElem.append('<li><a href="' + artilcesLinks[index] + '">' + articles[index] + '</a></li>');
            }
        }
    }).error(function () {
        $greeting.text("An error occured during your Ajax call !!!!");
    });

}

function getTimeInformation() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // YOUR CODE GOES HERE!  
    $greeting.text("You want live in " + city);

    var urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    var params = {
        'api-key': "843ec920599e452fa83ab934c7ebb0f6",
        'q': city
    };

    $.getJSON(urlNyt, params, function (data) {
        $nytHeaderElem.text("New York Times Articles About " + city);
        var docs = data.response.docs;
        var length = docs.length;
        for (var index = 0; index < length; index++) {
            var doc = docs[index];
            $nytElem.append('<li class="article">' +
                '<a href="' + doc.web_url + '">' + doc.headline.main + '</a>' +
                '<p>' + doc.snippet + '</p>' +
                '</li>');
        }
    }).error(function () {
        $greeting.text("An error occured during your Ajax call !!!!");
    });
}

function getBingImageInformation() {

}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function initMap() {
    // TODO: use a constructor to create a new map JS object. You can use the coordinates
    // we used, 40.7413549, -73.99802439999996 or your own!
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.864716,
            lng: 2.349014
        },
        zoom: 13
    });

    for (var index = 0; index < markersInit.length; index++) {
        var curMarker = markersInit[index];
        var latLng = new google.maps.LatLng(curMarker.position.lat, curMarker.position.lng);
        var marker = new google.maps.Marker({
            position: latLng,
            title: curMarker.title,
            map: map
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }
    var infowindow = new google.maps.InfoWindow({
        content: '<h1>Some stylish comment</h1>'
    });
}

function generateInfoWindow() {

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    marker.addListener('mousehover', )
}



function animateMarker(marker) {

}

