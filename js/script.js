
$(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});



$(function() {

	var APPID = "6dd5d55e84742b720ad18912a82e4c96";
	
	$('#send').click(function() {
		var cityname = $('#cityname').val();

		$.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + APPID, function(data) {
			$('#selectedcity').html(data.name);
			$('#clouddescr').html(data.weather[0].description);
			$('#cloudimg').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
			$('#temp').html((data.main.temp - 273.15).toFixed(2));
			$('#pressure').html(data.main.pressure);
			$('#humidity').html(data.main.humidity);
			$('#windspeed').html(data.wind.speed);
		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});

		$('#weathervals').remove();

		$.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&APPID=' + APPID, function(data) {

			function weathval(index) {
				return '<p id="clouddescr">' + data.list[index].weather[0].description + '</p><img id="cloudimg" src="http://openweathermap.org/img/w/' + data.list[index].weather[0].icon + '.png"><p id="temp">' + (data.list[index].main.temp - 273.15).toFixed(2) + '</p><p id="pressure">' + data.list[index].main.pressure + '</p><p id="humidity">' + data.list[index].main.humidity + '</p><p id="windspeed">' + data.list[index].wind.speed + '</p>'
			}
			
			$('#tab-2').append('<div id="weathervals" style="width:' + (screen.width-350) + 'px"></div>');

			for (var i = 0; i < data.list.length; i++) {

				if (i == 0) {
					$('#weathervals').append('<div id="date">' + data.list[i].dt_txt.substring(0, 10) + '<br></div>');
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-top: 1px solid #898989">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));
					continue;
				}

				if (data.list[i].dt_txt.substring(0, 10) != data.list[i-1].dt_txt.substring(0, 10)) {
					$('#weathervals').append('<div id="date">' + data.list[i].dt_txt.substring(0, 10) + '<br></div>');
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-top: 1px solid #898989">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));
				}

				if (data.list[i].dt_txt.substring(0, 10) == data.list[i-1].dt_txt.substring(0, 10)) {
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-left: 1px solid #898989; border-top: 1px solid #898989">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));	
				}
			}

		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});
	});
});
