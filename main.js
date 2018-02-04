let model;
let map;
let markersInit = [
    {
        position: {
            lat: 48.862592,
            lng: 2.3512000000000626
        },
        title: "Anti Cafe Beaubourg",
        marker: undefined
    },
    {
        position: {
            lat: 48.8626116,
            lng: 2.3520730000000185
        },
        title: 'Workshop Paris',
        marker: undefined
    },
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.864716,
            lng: 2.349014
        },
        zoom: 13
    });

    markersInit.forEach(mark => {
        let latLng = new google.maps.LatLng(mark.position.lat, mark.position.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            title: mark.title,
            map: map
        });
        let infowindow = new google.maps.InfoWindow({
            content: $("#repeating-form-section-template").html(),
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        mark.marker = marker
    });
};

function initMyNeighborhoodModel(appName, markers) {
    this.appName = ko.observable(appName),
        this.markers = ko.observableArray(markers),
        this.filter = ko.observable(""),
        this.computedfiltered = ko.pureComputed(function () {
            let elts = [];
            if (this.filter().length > 0) {
                elts = this.markers().filter(mk => mk.title.includes(this.filter()))
            }
            else {
                elts = this.markers();
            }
            return elts;
        }, this),
        this.loading = ko.observable(false),
        this.yelpInfo = ko.observable([]),
        this.showMarker = function (currentMarker) {
            let infowindow = new google.maps.InfoWindow({
                content: $("#repeating-form-section-template").html(),
                animation: google.maps.Animation.BOUNCE,
            });
            infowindow.open(map, currentMarker.marker);
        },
        this.loadYelpInfo = function (currentMarker) {

        }
};

function initMakerInfoModel() {
    this.loading = ko.observable(true),
        this.testValue = ko.observable('mon test')
    this.yelpInfo = ko.observableArray([])
};

function getFlickrInfo(marker) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.yelp.com/v3/businesses/search?latitude=48.862592&longitude=2.3512000000000626&radius=600",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer EDBf-PB_HdblwymUx4GTyRcEmXzBGnQ_GB6DEV11XN3letSA57bdqO__rJs_YnUuk7JbRuFs2kYQM1BaItvJl1vATAACjsPrqn4EqzM-wCksKP9twqWbcqY--T5aWnYx",
            "Cache-Control": "no-cache",
            "Postman-Token": "25236b9b-0952-15d4-c51d-77e003546b82"
        }
    }; 
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};


function getYelpInfo(marker) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.yelp.com/v3/businesses/search?latitude=" + marker.position.lat + "&longitude=" + marker.position.lng + "&radius=600",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer EDBf-PB_HdblwymUx4GTyRcEmXzBGnQ_GB6DEV11XN3letSA57bdqO__rJs_YnUuk7JbRuFs2kYQM1BaItvJl1vATAACjsPrqn4EqzM-wCksKP9twqWbcqY--T5aWnYx",
            "Cache-Control": "no-cache",
            "Postman-Token": "175212d8-5274-208c-5872-d8bc6fbfb668"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    }).fail(function () {
        alert("error");
    }
        );
}
document.addEventListener("DOMContentLoaded", function (event) {
    model = new initMyNeighborhoodModel("My Neighborhood View", markersInit);
    ko.applyBindings(model);
});