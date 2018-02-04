define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var markersInit = [
        {
            position: {
                lat: 48.862592,
                lng: 2.3512000000000626
            },
            title: "Anti Cafe Beaubourg"
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
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 48.864716,
                lng: 2.349014
            },
            zoom: 13
        });
        markersInit.forEach(function (mark) {
            var latLng = new google.maps.LatLng(mark.position.lat, mark.position.lng);
            var marker = new google.maps.Marker({
                position: latLng,
                title: mark.title,
                map: map
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<h1>Some stylish comment</h1>'
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        });
    }
    var MyNeighborhoodMapModel = /** @class */ (function () {
        function MyNeighborhoodMapModel(appName, markers) {
            this.appName = ko.observable(appName);
            this.markers = ko.observableArray(markers);
            this.filter = ko.observable("");
            this.computedfiltered = ko.computed(this.computedfiltered);
        }
        MyNeighborhoodMapModel.prototype.computedfiltered = function () {
            var elts = [];
            // if(this.filter.length>0)
            // {
            //     // elts=  this.markers().filter(mk => mk.title.includes(this.filter()))
            // }
            return elts;
        };
        return MyNeighborhoodMapModel;
    }());
    var model = new MyNeighborhoodMapModel("My Neighborhood View", markersInit);
    ko.applyBindings(model);
    document.addEventListener("DOMContentLoaded", function (event) {
        initMap();
    });
});
//# sourceMappingURL=main.js.map