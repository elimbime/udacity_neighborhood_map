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
        // //add event listener to the map
        // marker.addListener('click', function () {
        //     infowindow.open(map, marker);
        // });
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