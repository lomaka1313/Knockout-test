/**
 * Created by Ломачук on 15.06.2015.
 */

$(document).ready(function($){
    var Cp;
    var model = [
        {
            val: "bill 1",
            number: "1231345235235"
        },
        {
            val: "bill 2",
            number: "1233124214214"
        },
        {
            val: "bill 3",
            number: "685686577568"
        },
        {
            val: "bill 4",
            number: "434545345345"
        },{
            val: "bill 5",
            number: "867867967967"
        },
        {
            val: "bill 6",
            number: "234534632111"
        }
    ],
    viewModel = {
        bills: ko.observableArray(model),
        showWeather : function(){
            var coord = navigator.geolocation.getCurrentPosition(success);
            function success(pos) {
                var crd = pos.coords;
                var lat = crd.latitude,
                    long = crd.longitude;
                $.ajax({
                    type:"GET",
                    url:"http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&lang=ua&units=metric",
                    success: function(c){

                        weatherMod = {
                            name : c.weather[0].description,
                            temp : parseInt(c.main.temp),
                            windSp : parseInt(c.wind.speed)

                        }

                        var block = $("#weather");
                        if(block.find("h2").length != 0){
                            block.find("h2").text(" На небі "+weatherMod.name)
                            block.find(".temp").text(" Температура "+weatherMod.temp+ " по цельсію")
                            block.find(".sp").text(" Швидкість вітру "+weatherMod.windSp+ " м/с")
                        }else {
                            block.append("<h2> На небі " + weatherMod.name + "</h2>");
                            block.append("<p class='temp'> Температура " + weatherMod.temp + " по цельсію</p>");
                            block.append("<p class='sp'> Швидкість вітру " + weatherMod.windSp + " м/с</p>");
                        }
                        console.log(c);
                        console.log(weatherMod)
                    }
                })
            };
        }
    };
    ko.applyBindings(viewModel);
});