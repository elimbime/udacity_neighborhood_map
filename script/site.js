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

function getFlickrInformation() {

}



function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function initMap() {
    var anticafe = {
        lat: 48.862592,
        lng: 2.3512000000000626
    };
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
        marker.addListener('click', toggleBounce);
    }
    var infowindow = new google.maps.InfoWindow({
        content: '<h1>Some stylish comment</h1>'
    });
}

var myNeighborhoodView = {
    apppName: ko.observable("My Neighborhood View"),
    markers: ko.observableArray(markersInit),
    filter: ko.observable(""),
};

document.addEventListener("DOMContentLoaded", function (event) {
    ko.applyBindings(myNeighborhoodView);
});

