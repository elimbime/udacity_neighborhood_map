let model;
let map;
let markersInit = [{
    position: {
        lat: 48.862592,
        lng: 2.3512000000000626
    },
    title: "AntiCafe Beaubourg",
    marker: undefined,
    imagePath: undefined,
},
{
    position: {
        lat: 48.8626116,
        lng: 2.3520730000000185
    },
    title: 'Workshop Paris',
    marker: undefined,
    imagePath: undefined,
},
{
    position: {
        lat: 48.862725,
        lng: 2.287592
    },
    title: 'Station f',
    marker: undefined,
    imagePath: undefined,
},
{
    position: {
        lat: 48.8657641,
        lng: 2.336677399999985
    },
    title: 'H.A.N.D.',
    marker: undefined,
    imagePath: undefined,
},
{
    position: {
        lat: 48.859741,
        lng: 2.3464725000000044
    },
    title: 'Chez Gladine',
    marker: undefined,
    imagePath: undefined,
},
{
    position: {
        lat: 48.869235,
        lng: 2.3324397
    },
    title: 'Sapporo',
    marker: undefined,
    imagePath: undefined,
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
            map: map,
        });
        mark.imagePath = buildImagePath(mark);
        mark.marker = marker;

        marker.addListener('click', function () {
            let clientId = 'MDCJT2VQPZC3IVRIZ3ZISTEASIC01BP5RXBCEM2WYX3LTTCV';
            let clientSecret = '5QDNTC5C0LHK10P0HIWP5HX4QF3USDKB2K0M0T4NYAP2XTUC';
            let url = 'https://api.foursquare.com/v2/venues/search?ll=' + mark.position.lat + ',' + mark.position.lng + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + mark.title;
            let fourSquareCall = $.getJSON(url)
                .done(function (data) {
                    let content = builtInitialContentInfo(data, mark);
                    let infowindow = new google.maps.InfoWindow({
                        content: content,
                    });
                    infowindow.open(map, marker);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        marker.setAnimation(null);
                    }, 1400);
                }).fail(function () {
                    showErrorMessage('Foursquare');
                });
        });
    });
}

function initMyNeighborhoodModel(markers) {
    initMap();
    var self = this;
        self.markers = ko.observableArray(markers),
        self.filter = ko.observable(""),
        self.testValue = ko.observable("Ma valeur de test"),
        self.computedfiltered = ko.pureComputed(function () {
            let elts = [];
            if (self.filter().length > 0) {
                elts = this.markers().filter(mk => mk.title.includes(this.filter()));

                this.markers().forEach(element => {
                    let res = elts.find(function (elt) {
                        return elt.title == element.title;
                    });
                    if (res !== undefined) {
                        element.marker.setVisible(true);
                    }
                    else {
                        element.marker.setVisible(false);
                    }
                });
            } else {
                elts = this.markers();
                this.markers().forEach(element => {  element.marker.setVisible(true);});
            }

            return elts;
        }, this),
        self.showMarker = function (currentMarker, currentModel) {
            let mark = currentMarker;
            let clientId = 'MDCJT2VQPZC3IVRIZ3ZISTEASIC01BP5RXBCEM2WYX3LTTCV';
            let clientSecret = '5QDNTC5C0LHK10P0HIWP5HX4QF3USDKB2K0M0T4NYAP2XTUC';
            let url = 'https://api.foursquare.com/v2/venues/search?ll=' + mark.position.lat + ',' + mark.position.lng + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + mark.title;
            let fourSquareCall = $.getJSON(url)
                .done(function (data) {
                    let content = builtInitialContentInfo(data, mark);
                    let infowindow = new google.maps.InfoWindow({
                        content: content,
                    });
                    infowindow.open(map, mark.marker);
                    mark.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        mark.marker.setAnimation(null);
                    }, 1400);
                }).fail(function () {
                    showErrorMessage('Foursquare');
                });
        };
}

function buildImagePath(marker) {
    return 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + marker.position.lat + ',' + marker.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBMI1nd1IF3Taf08B116eG3nHyBMpir2hM';
}

function builtInitialContentInfo(fourSquareCall, currentMarker) {
    let self = this;
    let venue = fourSquareCall.response.venues[0];

    self.name = venue.name;
    self.URL = venue.url || 'No website available'; 
    self.address = venue.location.address;
    self.city = venue.location.city;
    self.phone = venue.contact.formattedPhone || 'No phone number available';
    currentMarker.fourSquareInfo = self;

    let content = '<div id=marker_' + currentMarker.title + '>';
    content = content.concat('<h5>' + currentMarker.title + '</h5>');
    content = content.concat('<img src="' + currentMarker.imagePath + '" class="img-responsive rounded" alt="" style="height:60px;">');
    content = content.concat('<h6>Foursquare Info</h6>');
    content = content.concat(' <p class="font-weight-normal">Adress: ' + currentMarker.fourSquareInfo.address + '</p>');
    content = content.concat(' <p class="font-weight-normal">City: ' + currentMarker.fourSquareInfo.city + '</p>');
    if(currentMarker.fourSquareInfo.URL=='No website available')
    {
        content = content.concat(' <p class="font-weight-normal">Website: ' + currentMarker.fourSquareInfo.URL + '</p>');
    }
    else
    {
        content = content.concat(' <p class="font-weight-normal">Website: <a href="' + currentMarker.fourSquareInfo.URL + '">' + currentMarker.fourSquareInfo.URL + '</a></p>');
    }
    content = content.concat(' <p class="font-weight-normal">Phone: ' + currentMarker.fourSquareInfo.phone + '</p>');
    content = content.concat('</br>');
    content = content.concat('</div>');

    return content;
}

function showErrorMessage(apiName) {
    window.alert('An error occured while getting data from the ' + apiName + ' api.');
}

function mainInit() {
    initMap();
    model = new initMyNeighborhoodModel(markersInit);
    ko.applyBindings(model);
}