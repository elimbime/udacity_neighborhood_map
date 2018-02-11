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
    var self = this;
    self.appName = ko.observable(appName),
        self.markers = ko.observableArray(markers),
        self.filter = ko.observable(""),
        self.testValue = ko.observable("Ma valeur de test"),
        self.computedfiltered = ko.pureComputed(function () {
            let elts = [];
            if (self.filter().length > 0) {
                elts = this.markers().filter(mk => mk.title.includes(this.filter()))
            }
            else {
                elts = this.markers();
            }
            return elts;
        }, this),
        self.loading = ko.observable(false),
        self.yelpInfo = ko.observable([]),
        self.showMarker = function (currentMarker, currentModel) {
            self.loading = true;
            getWikipediaInfo(currentMarker, self.loading); 
            let imagePath = buildImagePath(currentMarker);
            let content = builContentInfo(imagePath, currentMarker);

            let infowindow = new google.maps.InfoWindow({
                content: content
                // content: $("#repeating-form-section-template").html(),
            });
            infowindow.open(map, currentMarker.marker);
        }
};

function buildImagePath(marker) {
    return 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + marker.position.lat + ',' + marker.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBMI1nd1IF3Taf08B116eG3nHyBMpir2hM'
}

async function builContentInfo(imagePath, currentMarker) {
    let content = '<div>';
    content = content.concat('<h5>' + currentMarker.title + '</h5>');
    content = content.concat('<img src="' + imagePath + '" class="img-responsive rounded" alt="" style="height:60px;">');
    content = content.concat('<h6>New-York Times Info</h6>');
    content = content.concat('</br>');
    content = content.concat('<h6>Wikipedia Info</h6>');
    content = content.concat('</br>');
    content = content.concat('</div>');
    return content;
}

async function getFlickrInfo(marker) {
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
    $.ajax({
        type: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?latitude=48.862592&longitude=2.3512000000000626&radius=600',
        success: callback
    }).done(function (response) {
        console.log(response);
    });

    $.ajax(settings)
};

function getYelpInfo(marker, loading) {
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
    $.ajax(settings)
        .done(function (response) { console.log(response); })
        .fail(function () { alert("error"); })
        .always(function () { loading = false });
}

async function getNYTInfo(marker, loading) {
    var urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    var params = {
        'api-key': "843ec920599e452fa83ab934c7ebb0f6",
        'q': marker.title
    };

    var response = await axios.get(urlNyt,{
        params: {
            params
        }
      }); 

    // $.getJSON(urlNyt, params, function (data) {
    //     $nytHeaderElem.text("New York Times Articles About " + city);
    //     var docs = data.response.docs;
    //     var length = docs.length;
    //     for (var index = 0; index < length; index++) {
    //         var doc = docs[index];
    //         $nytElem.append('<li class="article">' +
    //             '<a href="' + doc.web_url + '">' + doc.headline.main + '</a>' +
    //             '<p>' + doc.snippet + '</p>' +
    //             '</li>');
    //     }
    // }).error(function () {
    //     $greeting.text("An error occured during your Ajax call !!!!");
    // });
}

async function getWikipediaInfo(marker, loading) {
    try {
        var urlWikipdedia = "https://en.wikipedia.org/w/api.php";

        var response = await axios.get(urlWikipdedia,)
    
        var paramsWikipedia = {
            'action': 'opensearch',
            'search': 'paris',
            'format': 'json',
        };
    
        // $.ajax({
        //     dataType: "jsonp",
        //     url: urlWikipdedia,
        //     data: paramsWikipedia,
        //     success: function (data) {
        //         var articles = data[1];
        //         var artilcesLinks = data[3];
        //         var length = articles.length;
        //         for (var index = 0; index < length; index++) {
        //             $wikiElem.append('<li><a href="' + artilcesLinks[index] + '">' + articles[index] + '</a></li>');
        //         }
        //     }
        // }).error(function () {
        //     $greeting.text("An error occured during your Ajax call !!!!");
        // });
    } catch (error) {
        window.alert("An error occured while processing your call"); 
    }

}

function initMakerInfoModel() {
    this.loading = ko.observable(true),
        this.testValue = ko.observable('mon test')
    this.yelpInfo = ko.observableArray([])
};


document.addEventListener("DOMContentLoaded", function (event) {
    model = new initMyNeighborhoodModel("My Neighborhood View", markersInit);
    ko.applyBindings(model);
});