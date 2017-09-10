$("body").append($("<div>").attr({id: "image"}).css({width: "550px", height: "330px"}));
$("#image").append($("<p>").attr({id: "temp"}).css( {'color':'#300035', 'font-size': '40px'}));
$("#image").append($("<p>").attr({id: "weather"}).css( {'color':'#300035', 'font-size': '25px'}));
$("#image").append($("<p>").attr({id: "date"}).css({'color' : "#fff", 'margin-top':'178px'}));

var city = "";
var req = "";

$.get( "https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json", function( data ) {
    data = JSON.parse(data)
    var countries = Object.keys(data);

    for (var i = 0; i < countries.length; i++){
      var opt = document.createElement("option");
      opt.value = countries[i];
      opt.innerText = countries[i];

      document.getElementById("country").appendChild(opt);
    }
$("#country").change(function() {
     $("#city").empty();
     var value = $(this).val();
     for (var j=0; j < data[value].length; j++) {
     var opt = document.createElement("option");
     opt.value = data[value][j];
     opt.innerText = data[value][j];
     document.getElementById("city").appendChild(opt);
    }
    
    $("#city").change(function() {
      
    city = $(this).val();
    //alert(city);
    req = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"" + city + "\") and u=\'c\'";
    weather()
    }) 
  })
    
});


function weather() {
			$.get("https://query.yahooapis.com/v1/public/yql", {q: req, format: "json"}, function(data){
			  
				var temp =  data["query"]["results"]["channel"]["item"]["condition"]["temp"];
				var weather = data["query"]["results"]["channel"]["item"]["condition"]["text"];
				var date = data["query"]["results"]["channel"]["item"]["condition"]["date"];
			
			  $("#image").css({backgroundImage: "url(https://img3.goodfon.ru/original/1366x768/2/da/girl-mountains-clouds.jpg?d=1)", backgroundSize: "cover", opacity: "0.5"});
		  
				$("#temp").text("Temperature: " + temp + " C");
      	$("#weather").text("Weather: " + weather);
				$("#date").text("Date: " + date);
			}
);}
  


