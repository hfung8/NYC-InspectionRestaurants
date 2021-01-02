console.log("here!");
const queryURL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

// New York City Map
var mymap = L.map('mapid').setView([40.73, -73.93], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid3V5YWhlbmciLCJhIjoiY2tmMDlzeHAyMHd4ODJ3cDNuNzFwOXh4aiJ9.ozH3YSh2QXPXjQ26CdKRog'
}).addTo(mymap);

var svg = d3.select("svg"),
margin = 200,
width = svg.attr("width") - margin,
height = svg.attr("height") - margin;


var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
yScale = d3.scaleLinear().range ([height, 0]);

var g = svg.append("g")
       .attr("transform", "translate(" + 100 + "," + 100 + ")");




function createMarkers(response){

    console.log(response);

    var restaurantsArray = [];

    for ( var i = 0; i < response.length; i++){
        restaurantsArray.push([response[i].latitude, response[i].longitude]);
    }

    console.log(restaurantsArray);

    for ( var i = 0; i < restaurantsArray.length; i++){

        var latitude = restaurantsArray[i].splice(0,1);
        var longitude = restaurantsArray[i].splice(0,1);

        var [lat] = latitude;
        var [long] = longitude;

        var marker = L.marker([parseFloat(lat), parseFloat(long)]).addTo(mymap).bindTooltip(response[i].dba)
        
    }

    
}





// d3 json method to get the data from the query URL
d3.json(queryURL, createMarkers);



