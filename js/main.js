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
            map: map
        });
        mark.imagePath = buildImagePath(mark); 
        mark.marker = marker;

        marker.addListener('click',async function () {
            let content = await  builtInitialContentInfo(mark);
            let infowindow = new google.maps.InfoWindow({
                content: content ,
            });
            infowindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
           }, 2100);
        });
    });
};

 function initMyNeighborhoodModel(appName, markers) {
    var self = this;
    self.appName = ko.observable(appName),
    self.markers = ko.observableArray(markers),
    self.filter = ko.observable(""),
    self.testValue = ko.observable("Ma valeur de test"),
    self.computedfiltered = ko.pureComputed(function () {
        let elts = [];
        if (self.filter().length > 0) {
            elts = this.markers().filter(mk => mk.title.includes(this.filter()));
        } else {
            elts = this.markers();
        }
        return elts;
    }, this),
    self.showMarker = async function (currentMarker, currentModel) {
        self.loading = true;
        content =  await  builtInitialContentInfo(currentMarker); 
        let infowindow = new google.maps.InfoWindow({
          content:content
        });
        infowindow.open(map, currentMarker.marker);
        currentMarker.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            currentMarker.marker.setAnimation(null);
       }, 2100);
    }
};

function buildImagePath(marker) {
    return 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + marker.position.lat + ',' + marker.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBMI1nd1IF3Taf08B116eG3nHyBMpir2hM';
}

async function builtInitialContentInfo(currentMarker){
    try {
        let clientId = 'MDCJT2VQPZC3IVRIZ3ZISTEASIC01BP5RXBCEM2WYX3LTTCV';
        let clientSecret = '5QDNTC5C0LHK10P0HIWP5HX4QF3USDKB2K0M0T4NYAP2XTUC';
        let url = 'https://api.foursquare.com/v2/venues/search?ll=' + currentMarker.position.lat + ',' + currentMarker.position.lng + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + currentMarker.title;
    
        let fourSquareCall = await axios.get(url); 
    
        let self = this;
        this.name = "";
        this.URL = "";
        this.address = "";
        this.city = "";
        this.phone = "";
    
        let venue = fourSquareCall.data.response.venues[0];
        self.name = venue.name;
        self.URL = venue.url;
        self.address = venue.location.address;
        self.city = venue.location.city;
        self.phone = venue.contact.formattedPhone;
        currentMarker.fourSquareInfo = self;
    
        let content = '<div id=marker_' + currentMarker.title + '>';
        content = content.concat('<h5>' + currentMarker.title + '</h5>');
        content = content.concat('<img src="' + currentMarker.imagePath + '" class="img-responsive rounded" alt="" style="height:60px;">');
        content = content.concat('<h6>Foursquare Info</h6>');
        content = content.concat(' <p class="font-weight-normal">Adress: ' + currentMarker.fourSquareInfo.address + '</p>');
        content = content.concat(' <p class="font-weight-normal">City: ' + currentMarker.fourSquareInfo.city + '</p>');
        content = content.concat(' <p class="font-weight-normal">Website: <a href="'+ currentMarker.fourSquareInfo.URL +'">'+ currentMarker.fourSquareInfo.URL+'</a></p>');
        content = content.concat(' <p class="font-weight-normal">Phone: ' + currentMarker.fourSquareInfo.phone + '</p>');
        content = content.concat('</br>');
        content = content.concat('</div>');
    
        return content;

    } catch (error) {
        showErrorMessage('Foursquare'); 
    }
}

function showErrorMessage(apiName){
    window.alert('An error occured while getting data from the '+apiName+'.'); 
}

function initMakerInfoModel() {
    this.loading = ko.observable(true),
    this.testValue = ko.observable('mon test');
    this.yelpInfo = ko.observableArray([]);
};

document.addEventListener("DOMContentLoaded", function (event) {
    model = new initMyNeighborhoodModel("Neighborhood App", markersInit);
    ko.applyBindings(model);
});