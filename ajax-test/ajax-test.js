/**
 * Created by HUQ on 9/2/15.
 */
$(function() {init()});

function init() {
  initializeWeather();

  $('#threeDayForecast').hide();
  $('#forecastTab').on("mouseleave", function() {
    $('#threeDayForecast').hide(400);
  });

  $('#forecastTab').on("mouseenter", function() {
    $('#threeDayForecast').show(400);
  });
  //TODO: Get city from user
  var searchBar = $('#weatherSearchBar');
  $('#findWeather').submit(function(e) {
    var inputZip = searchBar.val();
    getInputCityWeather(inputZip);
    // getInputCityWeather(inputCity.replace(" ", ));


    e.preventDefault();
  });




}

var initializeWeather = function (){
  var promiseHere = $.ajax({
    url: "http://api.wunderground.com/api/3a5cfa6be0748f06/geolookup/q/autoip.json",
    method: 'GET'
  });

 promiseHere.success(function(data) {
   displayWeather(data.location.zip);
  });
};

var getInputCityWeather = function(zipCode) {
  displayWeather(zipCode);
};

function displayWeather(zipCode) {
  console.log("bite me");

  var promiseCondition = $.ajax({
    url: "http://api.wunderground.com/api/3a5cfa6be0748f06/conditions/q/" + zipCode + ".json",
    method: 'GET'
  });


  promiseCondition.success(function(data) {
    displayCondition(data);

    var promiseForecast =  $.ajax({
      url: "http://api.wunderground.com/api/3a5cfa6be0748f06/forecast/q/" + zipCode + ".json",
      method: 'GET'
    });

    promiseForecast.success(function(data) {
      displayForecast(data);

    });

  });


}


var displayCondition = function(data) {
  $("#nowWeatherBox img").attr("src", data.current_observation.icon_url);
  $('#cityState').text(data.current_observation.display_location.full);
  $('.temp').text("Temp: " + data.current_observation.dewpoint_string);
  $('.humid').text("Humidity: " + data.current_observation.relative_humidity);
}


var displayForecast = function(data) {
    console.log('success data: ', data);
  $('.threeDayDay').toArray().forEach(function(e, i) {
    //TODO: Record each element into an array upon initialization.
    $(e).find(".dayOfWeek").text(data.forecast.simpleforecast.forecastday[i].date.weekday)
    $(e).find("img").attr("src", data.forecast.simpleforecast.forecastday[i].icon_url);
    //$(e).find('#cityState').text(city.replace("_", " ") +  ", " + state);
    $(e).find('.temp').text(data.forecast.simpleforecast.forecastday[i].high.celsius
        + " C* - " + data.forecast.simpleforecast.forecastday[i].low.celsius + " C*");
    $(e).find('.humid').text(data.forecast.simpleforecast.forecastday[i].avehumidity + "%");
  });
};







  //
  //
  //
  //
  //

  //
  //
  //
  //
  //});
  //
  //
  //
  //var promise = $.ajax({
  //  url: "http://api.wunderground.com/api/3a5cfa6be0748f06/forecast/q/" + state + "/" + city + ".json",
  //  //dataType: 'jsonp',
  //  //timeout: 50, --> amount of time you are willing to wait for this request to start
  //  method: 'GET'
  //});
  //
  //
  //

  //
  //
  //
  //
  //});
  //




  //promise.fail
//}

