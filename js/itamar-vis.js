//zooming taken from https://www.knoyd.com/blog/2017/6/23/create-map-in-d3-part1


//to do:
//  - country labels
//  - color gradient for country based on guest count
//  - legend
//  - map centered around Sumba island

var width = window.innerWidth,
    height = window.innerHeight,
    centered,
    clicked_point;

var projection = d3.geoMercator()
    .translate([width / 2.2, height / 1.5]);

var plane_path = d3.geoPath()
    	.projection(projection);

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

var path = d3.geoPath()
    .projection(projection);


var g = svg.append("g");
//
var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip hidden");

//this is for the legend that is to be impelented in sprint 2
// var legend_cont = d3.select("body")
//   					.append("div")
//   					.attr("class", "legendContainer");
// //
// var legend  = d3.select(".legendContainer")
//   				.append("ul")
//   				.attr("class", "legend");

var tooltip_point = d3.select("body")
  	.append("div")
  	.attr("class", "tooltip_point hidden");



//---------------------------------
// to draw the Lines
var sumba = [119.97, -9.69]
var link =
  {type:
    "LineString",
    coordinates: [
      [14.23, 15.74],
      [23.51, -13.23]
    ]
  }
//dictionary from https://geojson-maps.ash.ms/
var countries = {
  "ad": [
    "42.5000",
    "1.5000"
  ],
  "ae": [
    "24.0000",
    "54.0000"
  ],
  "af": [
    "33.0000",
    "65.0000"
  ],
  "ag": [
    "17.0500",
    "-61.8000"
  ],
  "ai": [
    "18.2500",
    "-63.1667"
  ],
  "al": [
    "41.0000",
    "20.0000"
  ],
  "am": [
    "40.0000",
    "45.0000"
  ],
  "an": [
    "12.2500",
    "-68.7500"
  ],
  "ao": [
    "-12.5000",
    "18.5000"
  ],
  "ap": [
    "35.0000",
    "105.0000"
  ],
  "aq": [
    "-90.0000",
    "0.0000"
  ],
  "ar": [
    "-34.0000",
    "-64.0000"
  ],
  "as": [
    "-14.3333",
    "-170.0000"
  ],
  "at": [
    "47.3333",
    "13.3333"
  ],
  "au": [
    "-27.0000",
    "133.0000"
  ],
  "aw": [
    "12.5000",
    "-69.9667"
  ],
  "az": [
    "40.5000",
    "47.5000"
  ],
  "ba": [
    "44.0000",
    "18.0000"
  ],
  "bb": [
    "13.1667",
    "-59.5333"
  ],
  "bd": [
    "24.0000",
    "90.0000"
  ],
  "be": [
    "50.8333",
    "4.0000"
  ],
  "bf": [
    "13.0000",
    "-2.0000"
  ],
  "bg": [
    "43.0000",
    "25.0000"
  ],
  "bh": [
    "26.0000",
    "50.5500"
  ],
  "bi": [
    "-3.5000",
    "30.0000"
  ],
  "bj": [
    "9.5000",
    "2.2500"
  ],
  "bm": [
    "32.3333",
    "-64.7500"
  ],
  "bn": [
    "4.5000",
    "114.6667"
  ],
  "bo": [
    "-17.0000",
    "-65.0000"
  ],
  "br": [
    "-10.0000",
    "-55.0000"
  ],
  "bs": [
    "24.2500",
    "-76.0000"
  ],
  "bt": [
    "27.5000",
    "90.5000"
  ],
  "bv": [
    "-54.4333",
    "3.4000"
  ],
  "bw": [
    "-22.0000",
    "24.0000"
  ],
  "by": [
    "53.0000",
    "28.0000"
  ],
  "bz": [
    "17.2500",
    "-88.7500"
  ],
  "ca": [
    "60.0000",
    "-95.0000"
  ],
  "cc": [
    "-12.5000",
    "96.8333"
  ],
  "cd": [
    "0.0000",
    "25.0000"
  ],
  "cf": [
    "7.0000",
    "21.0000"
  ],
  "cg": [
    "-1.0000",
    "15.0000"
  ],
  "ch": [
    "47.0000",
    "8.0000"
  ],
  "ci": [
    "8.0000",
    "-5.0000"
  ],
  "ck": [
    "-21.2333",
    "-159.7667"
  ],
  "cl": [
    "-30.0000",
    "-71.0000"
  ],
  "cm": [
    "6.0000",
    "12.0000"
  ],
  "cn": [
    "35.0000",
    "105.0000"
  ],
  "co": [
    "4.0000",
    "-72.0000"
  ],
  "cr": [
    "10.0000",
    "-84.0000"
  ],
  "cu": [
    "21.5000",
    "-80.0000"
  ],
  "cv": [
    "16.0000",
    "-24.0000"
  ],
  "cx": [
    "-10.5000",
    "105.6667"
  ],
  "cy": [
    "35.0000",
    "33.0000"
  ],
  "cz": [
    "49.7500",
    "15.5000"
  ],
  "de": [
    "51.0000",
    "9.0000"
  ],
  "dj": [
    "11.5000",
    "43.0000"
  ],
  "dk": [
    "56.0000",
    "10.0000"
  ],
  "dm": [
    "15.4167",
    "-61.3333"
  ],
  "do": [
    "19.0000",
    "-70.6667"
  ],
  "dz": [
    "28.0000",
    "3.0000"
  ],
  "ec": [
    "-2.0000",
    "-77.5000"
  ],
  "ee": [
    "59.0000",
    "26.0000"
  ],
  "eg": [
    "27.0000",
    "30.0000"
  ],
  "eh": [
    "24.5000",
    "-13.0000"
  ],
  "er": [
    "15.0000",
    "39.0000"
  ],
  "es": [
    "40.0000",
    "-4.0000"
  ],
  "et": [
    "8.0000",
    "38.0000"
  ],
  "eu": [
    "47.0000",
    "8.0000"
  ],
  "fi": [
    "64.0000",
    "26.0000"
  ],
  "fj": [
    "-18.0000",
    "175.0000"
  ],
  "fk": [
    "-51.7500",
    "-59.0000"
  ],
  "fm": [
    "6.9167",
    "158.2500"
  ],
  "fo": [
    "62.0000",
    "-7.0000"
  ],
  "fr": [
    "46.0000",
    "2.0000"
  ],
  "ga": [
    "-1.0000",
    "11.7500"
  ],
  "gb": [
    "54.0000",
    "-2.0000"
  ],
  "gd": [
    "12.1167",
    "-61.6667"
  ],
  "ge": [
    "42.0000",
    "43.5000"
  ],
  "gf": [
    "4.0000",
    "-53.0000"
  ],
  "gh": [
    "8.0000",
    "-2.0000"
  ],
  "gi": [
    "36.1833",
    "-5.3667"
  ],
  "gl": [
    "72.0000",
    "-40.0000"
  ],
  "gm": [
    "13.4667",
    "-16.5667"
  ],
  "gn": [
    "11.0000",
    "-10.0000"
  ],
  "gp": [
    "16.2500",
    "-61.5833"
  ],
  "gq": [
    "2.0000",
    "10.0000"
  ],
  "gr": [
    "39.0000",
    "22.0000"
  ],
  "gs": [
    "-54.5000",
    "-37.0000"
  ],
  "gt": [
    "15.5000",
    "-90.2500"
  ],
  "gu": [
    "13.4667",
    "144.7833"
  ],
  "gw": [
    "12.0000",
    "-15.0000"
  ],
  "gy": [
    "5.0000",
    "-59.0000"
  ],
  "hk": [
    "22.2500",
    "114.1667"
  ],
  "hm": [
    "-53.1000",
    "72.5167"
  ],
  "hn": [
    "15.0000",
    "-86.5000"
  ],
  "hr": [
    "45.1667",
    "15.5000"
  ],
  "ht": [
    "19.0000",
    "-72.4167"
  ],
  "hu": [
    "47.0000",
    "20.0000"
  ],
  "id": [
    "-5.0000",
    "120.0000"
  ],
  "ie": [
    "53.0000",
    "-8.0000"
  ],
  "il": [
    "31.5000",
    "34.7500"
  ],
  "in": [
    "20.0000",
    "77.0000"
  ],
  "io": [
    "-6.0000",
    "71.5000"
  ],
  "iq": [
    "33.0000",
    "44.0000"
  ],
  "ir": [
    "32.0000",
    "53.0000"
  ],
  "is": [
    "65.0000",
    "-18.0000"
  ],
  "it": [
    "42.8333",
    "12.8333"
  ],
  "jm": [
    "18.2500",
    "-77.5000"
  ],
  "jo": [
    "31.0000",
    "36.0000"
  ],
  "jp": [
    "36.0000",
    "138.0000"
  ],
  "ke": [
    "1.0000",
    "38.0000"
  ],
  "kg": [
    "41.0000",
    "75.0000"
  ],
  "kh": [
    "13.0000",
    "105.0000"
  ],
  "ki": [
    "1.4167",
    "173.0000"
  ],
  "km": [
    "-12.1667",
    "44.2500"
  ],
  "kn": [
    "17.3333",
    "-62.7500"
  ],
  "kp": [
    "40.0000",
    "127.0000"
  ],
  "kr": [
    "37.0000",
    "127.5000"
  ],
  "kw": [
    "29.3375",
    "47.6581"
  ],
  "ky": [
    "19.5000",
    "-80.5000"
  ],
  "kz": [
    "48.0000",
    "68.0000"
  ],
  "la": [
    "18.0000",
    "105.0000"
  ],
  "lb": [
    "33.8333",
    "35.8333"
  ],
  "lc": [
    "13.8833",
    "-61.1333"
  ],
  "li": [
    "47.1667",
    "9.5333"
  ],
  "lk": [
    "7.0000",
    "81.0000"
  ],
  "lr": [
    "6.5000",
    "-9.5000"
  ],
  "ls": [
    "-29.5000",
    "28.5000"
  ],
  "lt": [
    "56.0000",
    "24.0000"
  ],
  "lu": [
    "49.7500",
    "6.1667"
  ],
  "lv": [
    "57.0000",
    "25.0000"
  ],
  "ly": [
    "25.0000",
    "17.0000"
  ],
  "ma": [
    "32.0000",
    "-5.0000"
  ],
  "mc": [
    "43.7333",
    "7.4000"
  ],
  "md": [
    "47.0000",
    "29.0000"
  ],
  "me": [
    "42.0000",
    "19.0000"
  ],
  "mg": [
    "-20.0000",
    "47.0000"
  ],
  "mh": [
    "9.0000",
    "168.0000"
  ],
  "mk": [
    "41.8333",
    "22.0000"
  ],
  "ml": [
    "17.0000",
    "-4.0000"
  ],
  "mm": [
    "22.0000",
    "98.0000"
  ],
  "mn": [
    "46.0000",
    "105.0000"
  ],
  "mo": [
    "22.1667",
    "113.5500"
  ],
  "mp": [
    "15.2000",
    "145.7500"
  ],
  "mq": [
    "14.6667",
    "-61.0000"
  ],
  "mr": [
    "20.0000",
    "-12.0000"
  ],
  "ms": [
    "16.7500",
    "-62.2000"
  ],
  "mt": [
    "35.8333",
    "14.5833"
  ],
  "mu": [
    "-20.2833",
    "57.5500"
  ],
  "mv": [
    "3.2500",
    "73.0000"
  ],
  "mw": [
    "-13.5000",
    "34.0000"
  ],
  "mx": [
    "23.0000",
    "-102.0000"
  ],
  "my": [
    "2.5000",
    "112.5000"
  ],
  "mz": [
    "-18.2500",
    "35.0000"
  ],
  "na": [
    "-22.0000",
    "17.0000"
  ],
  "nc": [
    "-21.5000",
    "165.5000"
  ],
  "ne": [
    "16.0000",
    "8.0000"
  ],
  "nf": [
    "-29.0333",
    "167.9500"
  ],
  "ng": [
    "10.0000",
    "8.0000"
  ],
  "ni": [
    "13.0000",
    "-85.0000"
  ],
  "nl": [
    "52.5000",
    "5.7500"
  ],
  "no": [
    "62.0000",
    "10.0000"
  ],
  "np": [
    "28.0000",
    "84.0000"
  ],
  "nr": [
    "-0.5333",
    "166.9167"
  ],
  "nu": [
    "-19.0333",
    "-169.8667"
  ],
  "nz": [
    "-41.0000",
    "174.0000"
  ],
  "om": [
    "21.0000",
    "57.0000"
  ],
  "pa": [
    "9.0000",
    "-80.0000"
  ],
  "pe": [
    "-10.0000",
    "-76.0000"
  ],
  "pf": [
    "-15.0000",
    "-140.0000"
  ],
  "pg": [
    "-6.0000",
    "147.0000"
  ],
  "ph": [
    "13.0000",
    "122.0000"
  ],
  "pk": [
    "30.0000",
    "70.0000"
  ],
  "pl": [
    "52.0000",
    "20.0000"
  ],
  "pm": [
    "46.8333",
    "-56.3333"
  ],
  "pr": [
    "18.2500",
    "-66.5000"
  ],
  "ps": [
    "32.0000",
    "35.2500"
  ],
  "pt": [
    "39.5000",
    "-8.0000"
  ],
  "pw": [
    "7.5000",
    "134.5000"
  ],
  "py": [
    "-23.0000",
    "-58.0000"
  ],
  "qa": [
    "25.5000",
    "51.2500"
  ],
  "re": [
    "-21.1000",
    "55.6000"
  ],
  "ro": [
    "46.0000",
    "25.0000"
  ],
  "rs": [
    "44.0000",
    "21.0000"
  ],
  "ru": [
    "60.0000",
    "100.0000"
  ],
  "rw": [
    "-2.0000",
    "30.0000"
  ],
  "sa": [
    "25.0000",
    "45.0000"
  ],
  "sb": [
    "-8.0000",
    "159.0000"
  ],
  "sc": [
    "-4.5833",
    "55.6667"
  ],
  "sd": [
    "15.0000",
    "30.0000"
  ],
  "se": [
    "62.0000",
    "15.0000"
  ],
  "sg": [
    "1.3667",
    "103.8000"
  ],
  "sh": [
    "-15.9333",
    "-5.7000"
  ],
  "si": [
    "46.0000",
    "15.0000"
  ],
  "sj": [
    "78.0000",
    "20.0000"
  ],
  "sk": [
    "48.6667",
    "19.5000"
  ],
  "sl": [
    "8.5000",
    "-11.5000"
  ],
  "sm": [
    "43.7667",
    "12.4167"
  ],
  "sn": [
    "14.0000",
    "-14.0000"
  ],
  "so": [
    "10.0000",
    "49.0000"
  ],
  "sr": [
    "4.0000",
    "-56.0000"
  ],
  "st": [
    "1.0000",
    "7.0000"
  ],
  "sv": [
    "13.8333",
    "-88.9167"
  ],
  "sy": [
    "35.0000",
    "38.0000"
  ],
  "sz": [
    "-26.5000",
    "31.5000"
  ],
  "tc": [
    "21.7500",
    "-71.5833"
  ],
  "td": [
    "15.0000",
    "19.0000"
  ],
  "tf": [
    "-43.0000",
    "67.0000"
  ],
  "tg": [
    "8.0000",
    "1.1667"
  ],
  "th": [
    "15.0000",
    "100.0000"
  ],
  "tj": [
    "39.0000",
    "71.0000"
  ],
  "tk": [
    "-9.0000",
    "-172.0000"
  ],
  "tm": [
    "40.0000",
    "60.0000"
  ],
  "tn": [
    "34.0000",
    "9.0000"
  ],
  "to": [
    "-20.0000",
    "-175.0000"
  ],
  "tr": [
    "39.0000",
    "35.0000"
  ],
  "tt": [
    "11.0000",
    "-61.0000"
  ],
  "tv": [
    "-8.0000",
    "178.0000"
  ],
  "tw": [
    "23.5000",
    "121.0000"
  ],
  "tz": [
    "-6.0000",
    "35.0000"
  ],
  "ua": [
    "49.0000",
    "32.0000"
  ],
  "ug": [
    "1.0000",
    "32.0000"
  ],
  "um": [
    "19.2833",
    "166.6000"
  ],
  "us": [
    "38.0000",
    "-97.0000"
  ],
  "uy": [
    "-33.0000",
    "-56.0000"
  ],
  "uz": [
    "41.0000",
    "64.0000"
  ],
  "va": [
    "41.9000",
    "12.4500"
  ],
  "vc": [
    "13.2500",
    "-61.2000"
  ],
  "ve": [
    "8.0000",
    "-66.0000"
  ],
  "vg": [
    "18.5000",
    "-64.5000"
  ],
  "vi": [
    "18.3333",
    "-64.8333"
  ],
  "vn": [
    "16.0000",
    "106.0000"
  ],
  "vu": [
    "-16.0000",
    "167.0000"
  ],
  "wf": [
    "-13.3000",
    "-176.2000"
  ],
  "ws": [
    "-13.5833",
    "-172.3333"
  ],
  "ye": [
    "15.0000",
    "48.0000"
  ],
  "yt": [
    "-12.8333",
    "45.1667"
  ],
  "za": [
    "-29.0000",
    "24.0000"
  ],
  "zm": [
    "-15.0000",
    "30.0000"
  ],
  "zw": [
    "-20.0000",
    "30.0000"
  ]
}


function convert_country_to_long_lat(country_name) {
  // console.log([Number(countries[country_name][0]), Number(countries[country_name][1])]);
  return [parseFloat(countries[country_name][1]), parseFloat(countries[country_name][0])]

}

function coordinates_to_sumba(country_name) {
  return {type: "LineString", coordinates: [convert_country_to_long_lat(country_name), sumba]
  }

}

//TO DO:
//load the data directly from the CSV provided.
//was running into loading issue with the data, it wasn't able to get rendered properly
var origin_countries = [
  "id",
  "be",
  "gb",
  "us",
  "de",
  "nl",
  "fr",
  "es",
  "au",
  "my",
  "gb",
  "mm",
  "se",
  "az",
  "cn",
  "in",
  "it",
  "hu",
  "kr",
  "lu",
  "nz",
  "sg",
  "ch",
  "il",
  "ir",
  "br",
  "pl",
];


var all_paths = []

for (i of origin_countries) {
all_paths.push(coordinates_to_sumba(i))
console.log(i);

}


// load and display the World
d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, topology) {
  g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.countries)
            .features)
        .enter()
        .append("path")
        .attr("d", path)
        .on("click", clicked)
  	    .attr('fill', colorCountry)
        //create red lines to Sumba to display guest flow from all over the world
        g.selectAll("myPath")
            .data(all_paths)
            .enter()
            .append("path")
              .attr("d", function(d){return path(d)})
              .style("fill", "none")
              .style("stroke-width", 4)
              .style("stroke", "red")


   });


 // to color the countries of origin
function colorCountry(country) {
    if (visited_countries.includes(country.id)) {
            return '#c8b98d';
    } else {
        return '#e7d8ad';
    }
};

// //this will be used in sprint 2...
// // color countries for particular legend item

// function colorCountriesCategory(d){
//     //filter relevant countries using hasContent function
//     var these_countries = trip_data.filter(function(s){
//                                                 return hasContent(s, d.name);
//                                             });
//     var active_countries =  these_countries.map(function(a) {return a.country;});
//     var unique = active_countries.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
//
//     //color countries
//     g.selectAll('path')
//      .attr('fill', function(t){
//         return colorCountryLegend(t, unique);
//      });
//
// };


	g.selectAll('path')
	 .attr('fill', function(t){
	 	return colorCountryLegend(t, unique);
	 });


// color country according to legend
function colorCountryLegend(country, active_countries) {
    if (active_countries.includes(country.id)) {
        return '#f56260';
    } else if (visited_countries.includes(country.id)) {
        return '#c8b98d';
    } else {
    	return '#e7d8ad';
    }
};

function hasContent(s, kind){

	var post_keys = Object.keys(s.posts);
    // console.log(post_keys.includes(kind));
	return post_keys.includes(kind)
};

// get legend items
function getLegend(d){
    var temp = "<img class='legend_icon' title='ICON_TITLE' \
         src='ICON_LINK' alt='' width='50' height='50'> \
         ICON_KIND";
    temp = temp.replace("ICON_TITLE", d.name);
    temp = temp.replace("ICON_LINK", d.url);
    temp = temp.replace("ICON_KIND", d.name);
    return(temp);
};



/*var zoom = d3.zoom()
    .on("zoom",function() {
        var z = d3.event.transform;
        g.attr("transform", z);
        g.selectAll("path")
            .attr("d", path.projection(projection));

        g.selectAll("circle")
         .attr("r", width / 300 / z.k);
});*/

// // show country id on hover
// function showTooltipCountry(d){
//   var mouse = d3.mouse(svg.node()).map(function(d) {
//                         return parseInt(d);
//                     });
//   tooltip
//   .classed('hidden', false)
//   .html(d.id)
//   .attr('style',
//         'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
// };

// hide tooltip
function hideTooltip(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip
  .classed('hidden', true);
}
//
// hide point tooltip
function hideTooltipPoint(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip_point
  .classed('hidden', true);
}


// get icons to interact with link for more information regarding guests and country data
function getIconsAndLinks(posts){
    keys = Object.keys(posts["posts"]) //get available content
    var st = "";

    keys.forEach(function(key, index){
        //if not story
        if (key == "NoStory"){
            var this_img = "<p>Story coming soon...</p>" ;
            st = this_img
        } else {
          //add image link
            var this_img = "<a href='POST_LINK' target='_blank'><img class = 'icon' \
                       title='ICON_KIND' src='ICON_LINK' \
                       alt='' width='50' height='50' /></a>" ;
            this_img = this_img.replace("POST_LINK", posts["posts"][key]);
            this_img = this_img.replace("ICON_KIND", key);
            this_img = this_img.replace("ICON_LINK", icon_links[key]);
            st += this_img
        }
    });
    return st
}


// show location name on hover (still needs to be fixed)
function showTooltip(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  if (tooltip_point.classed("hidden")){
  		tooltip
	   .classed('hidden', false)
	   .html("<span id='close' onclick='hideTooltipPoint()'>x</span>" +
	   "<div class='inner_tooltip'>" +
	   			"<p>" + d.name + "</p>" +
        	 "</div><div>" +
        		getIconsAndLinks(d) +
    			//
        	"</div>")
	   .attr('style',
			 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
  };

};

// show point tooltip
function showTooltipPoint(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  tooltip_point
  .classed('hidden', false)
  .html("<span id='close' onclick='hideTooltipPoint()'>x</span>" +
	   "<div class='inner_tooltip'>" +
	   			"<p>" + d.name + "</p>" +
        	 "</div><div>" +
        		getIconsAndLinks(d) +
    			//
        	"</div>")
  .attr('style',
        'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
};


//handle all clicking and zooming
function clicked(d) {
  // console.log(d);
  if (tooltip_point.classed("hidden")){
      	  var x, y, k;

      	  if ((d && centered !== d) & (visited_countries.includes(d.id))) {
          	  	g.selectAll('path')
          	 	  .attr('fill', colorCountry);

            		var centroid = path.centroid(d);
            		var bounds = path.bounds(d);
            		var dx = bounds[1][0] - bounds[0][0],
      			            dy = bounds[1][1] - bounds[0][1];

      		      // legend_cont.classed("hidden", true);
            		x = (bounds[0][0] + bounds[1][0]) / 2;
            		y = (bounds[0][1] + bounds[1][1]) / 2;
            		k = Math.min(width / dx, height / dy);
            		centered = d;
      	  } else {
            		x = width / 2;
            		y = height / 2;
            		k = 1;
      		      centered = null;
      		      // legend_cont.classed("hidden", false);
      	  }

      	  g.selectAll("path")
      	   .classed("active", centered && function(d) { return d === centered; })


      	  // make contours thinner before zoom
      	  if (centered !== null){
            		g.selectAll("path")
            		 .style("stroke-width", (0.75 / k) + "px");
          }

      	  // map transition
      	  g.transition()
            		//.style("stroke-width", (0.75 / k) + "px")
            		.duration(750)
            		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            		.on('end', function() {
                  			if (centered === null){
                  			  g.selectAll("path")
                  			   .style("stroke-width", (0.75 / k) + "px");
          }
          		  });

      	  // filter only points in the country
      	  var contained_points = trip_data.filter(function(point) {
          	  	if (point.country == d.id){
          	  		return true;
          	  	} else {
          	  		return false;
          	  	}
      	  });

      	  // remove all old points
      	  g.selectAll("image").remove()

      	  // if zooming in -> draw points
      	  if (centered !== null){
            		g.selectAll("image")
            		 .data(contained_points)
          		   .enter()
            		 .append("svg:image")
            		 .attr("xlink:href", "img/location1.png")
            		 .attr("x", function(d) {
                        				return projection([d.lon, d.lat])[0];
            		  })
            		 .attr("y", function(d) {
            				return projection([d.lon, d.lat])[1];
            		  })
            		 .attr("width", 30 / k + "px")
         .attr("height", 30 / k + "px")
            		 .on("mousemove", showTooltip)
                 .on("mouseout", hideTooltip)
            		 .on("click", showTooltipPoint)
          }
  } else {
            		hideTooltipPoint(d);
  }


}
