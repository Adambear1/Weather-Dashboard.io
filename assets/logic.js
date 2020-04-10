var today = moment().format('dddd');
var todaynum = moment().format('LL');

$('#card-0-day-of-week').text(today)
$('#card-0-temperature').text(todaynum)

let tomorrow  = moment().add(1,'day').format('dddd')
var tomorrownum = moment().add(1,'day').format('LL');

$('#card-8-day-of-week').text(tomorrow)
$('#card-8-temperature').text(tomorrownum)

let dayafter  = moment().add(2,'day').format('dddd')
var dayafternum = moment().add(2,'day').format('LL');

$('#card-16-day-of-week').text(dayafter)
$('#card-16-temperature').text(dayafternum)

let dayafterx2  = moment().add(3,'day').format('dddd')
var dayafterx2num = moment().add(3,'day').format('LL');

$('#card-24-day-of-week').text(dayafterx2)
$('#card-24-temperature').text(dayafterx2num)

let dayafterx3  = moment().add(4,'day').format('dddd')
var dayafterx3num = moment().add(4,'day').format('LL');

$('#card-32-day-of-week').text(dayafterx3)
$('#card-32-temperature').text(dayafterx3num)






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// POPUP MODAL ICON /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('.display-4').on('click', function(){
    $('.bg-modal').removeClass('hide');
    $('.bg-modal').addClass('show');
})

$('.fa-window-close').on('click', function(){
    $('.bg-modal').removeClass('show');
    $('.bg-modal').addClass('hide');
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// WEATHER API /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var arr = JSON.parse(localStorage.getItem('weather'));
var parr = JSON.parse(localStorage.getItem('photo'));

let weather = []


function loadHistory() {
    if(arr !== null){
        for (var j = 0; j < arr.length; j++){
            if (arr[j] !== null){
            var lOne = $("<button class='card-body buttonHistory' value=" + arr[j].Savedcity + " id=" + j + ">").text(arr[j].Savedcity);
            $("#city-add-history").prepend(lOne);
            } 
        }
    }
  };

$('#btn-submit').on('click', function() {
    event.preventDefault()
    $('p').addClass('revert');
    // console.log(card)
    var apiKey = '79bb7dc0e8f07f6ebe01166410e6e392'
    var cityName = document.querySelector('#myInput').value
    cityName = cityName.replace(/\s+/g,"-");
    console.log(cityName)
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&APPID=' + apiKey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        //Weather Dashboard
        var list = response.list
        // let location_facts = {};
        for (var i = 0; i < list.length; i += 8) {
            var forecast = list[i].weather[0].main
            var kelvin = list[i].main.temp;
            var minKelvin = list[0].main.temp_min;
            var maxKelvin = list[0].main.temp_max;
            var temperature = Math.floor((kelvin - 273.15) * 9/5 + 32)
            var mintemperature = Math.floor((minKelvin - 273.15) * 9/5 + 32)
            var maxtemperature = Math.floor((maxKelvin - 273.15) * 9/5 + 32)
            var weatherIcon = 'http://openweathermap.org/img/wn/' + list[i].weather[0].icon  + '@2x.png'
            var humidity = list[i].main.humidity;
            var sealevel = list[i].main.sea_level
            var windspeed = list[i].wind.speed
            var population = response.city.population
            var lon = response.city.coord.lon
            var lat = response.city.coord.lat
            let day_of_week = list[i].dt_txt;
            day_of_week = day_of_week.substring(0, day_of_week.length - 8);
            day_of_week = day_of_week.substring(5)
            var DOW = day_of_week
            //
            var cardDOW = document.querySelector('#card-'+ i +'-day-of-week')
            var cardImg = document.querySelector('#card-'+ i +'-img')
            var cardText = document.querySelector('#card-'+ i +'-text')
            var cardTemp = document.querySelector('#card-'+ i +'-temperature')
            var cityHeader = document.querySelector('#city-display')
            cardDOW.textContent = DOW
            cardImg.setAttribute('src', weatherIcon);
            cardTemp.textContent = temperature + "°F";
            cardText.textContent = forecast;
            //

        }


        location_facts = {
            Savedcity: cityName,    
        }    
        weather.push(location_facts);
        localStorage.setItem('weather', JSON.stringify(weather));

    
    

        //City Summary -- Center Column (MOMENT.JS / WIKIPEDIA API)
        let today = list[0].dt_txt;
        today = today.substring(0, today.length - 8);

        cityHeader.innerHTML = '</i>    City:   ' + cityName + ',    ' + today + '    ' +'</i>' 
            
        
        $('#population').text('Population:   ' + population)
        $('#min-max-temp').text('Min/Max:   ' + mintemperature + "°F" + "  /   " + maxtemperature + "°F")
        $('#humidity').text('Humidity:  ' + humidity + '%')
        $('#sealevel').text('Feet Above Sealevel:  ' + sealevel)
        $('#windspeed').text('Windspeed (MPH):  ' + windspeed)
        $('#coordinates').text('Coordinates:   ' + lat + ",   " + lon)
            
            var pic_api_key = 'l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY'
            
            var Picurl = 'https://api.unsplash.com/search/photos?client_id=' + pic_api_key + '&query=' + cityName;
            $.ajax({
                    url: Picurl,
                    method: "GET"
                })
                .then(function(response) {
                     var random = Math.floor(Math.random() * 10)
                     var authorFirstName = response.results[random].user.first_name
                     var authorLastName = response.results[random].user.last_name
                     var returnedImg = response.results[random].urls.regular;
                     var returnedCitation = response.results[random].links.download;
                     var returnedDescription = response.results[random].alt_description;
                    //  var cityImg = $('<img>');
                     var citation = $('<a>')
                     var cityDescription = $('<p>').text(returnedDescription);
                     citation.attr('href', returnedCitation)
                     $('#locationGif').attr('src', returnedImg);
                     $('#locationGif').attr('alt', returnedCitation);
                     $('#locationGif').addClass('auto-fit');
                     //For small pictures, two are returned to fill empty space; for large pictures, it autofills for only need use of one picture.
                     //If author does not have last name presented, then only first name is shown.
                     if (response.results[random].height < 6000){
                         if(authorLastName === null){
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                            $('#locationGif').html($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         } else{
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                            $('#locationGif').html($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         }
                     } else{
                         if(authorLastName === null){
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                         } else {
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                         }

                     }

                     photo_details = {
                         SavedAFN: authorFirstName,
                         SavedALN: authorLastName,
                         SavedImg: returnedImg,
                         SavedCitation: returnedCitation,
                         SavedDescription: returnedDescription
                     }

                     photo.push(photo_details);
                     localStorage.setItem('photo', JSON.stringify(photo));
                })
        //City Add -- Left Column
                var buttonsDisplayed = document.querySelectorAll('button') 
                var buttonsLength = buttonsDisplayed.length
                if(buttonsDisplayed !== null){
                    for (var j = buttonsLength - 1; j < buttonsLength; j++){
                        if (buttonsDisplayed[j] !== null){
                        var lOne = $("<button class='card-body buttonHistory' value=" + cityName + " id=" + j + ">").text(cityName);
                        $("#city-add-history").prepend(lOne);
                        } 
                    }
                }


                document.querySelector('#myInput').value = "";

              })}
              
            );
                



$(document).on('click', '.buttonHistory', function(){
    $('p').addClass('revert');
    event.preventDefault()
    var apiKey = '79bb7dc0e8f07f6ebe01166410e6e392'
    var recallValue = $(this).val()
    console.log(recallValue)
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + recallValue + '&APPID=' + apiKey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var list = response.list;
        for (var i = 0; i < list.length; i += 8) {
            var forecast = list[i].weather[0].main
            var kelvin = list[i].main.temp;
            var minKelvin = list[0].main.temp_min;
            var maxKelvin = list[0].main.temp_max;
            var mintemperature = Math.floor((minKelvin - 273.15) * 9/5 + 32)
            var maxtemperature = Math.floor((maxKelvin - 273.15) * 9/5 + 32)
            var temperature = Math.floor((kelvin - 273.15) * 9/5 + 32)
            var weatherIcon = 'http://openweathermap.org/img/wn/' + list[i].weather[0].icon  + '@2x.png'
            var humidity = list[i].main.humidity;
            var sealevel = list[i].main.sea_level
            var windspeed = list[i].wind.speed
            var population = response.city.population
            var lon = response.city.coord.lon
            var lat = response.city.coord.lat
            let day_of_week = list[i].dt_txt;
            day_of_week = day_of_week.substring(0, day_of_week.length - 8);
            day_of_week = day_of_week.substring(5)
            var DOW = day_of_week
            //
            var cardDOW = document.querySelector('#card-'+ i +'-day-of-week')
            var cardImg = document.querySelector('#card-'+ i +'-img')
            var cardText = document.querySelector('#card-'+ i +'-text')
            var cardTemp = document.querySelector('#card-'+ i +'-temperature')
            var cityHeader = document.querySelector('#city-display')
            cardDOW.textContent = DOW
            cardImg.setAttribute('src', weatherIcon);
            cardTemp.textContent = temperature + "°F";
            cardText.textContent = forecast;
    }
    let today = list[0].dt_txt;
        today = today.substring(0, today.length - 8);

        cityHeader.innerHTML = '</i>    City:   ' + recallValue + ',    ' + today + '    ' + '</i>' 
    
            
        $('#population').text('Population:   ' + population)
        $('#min-max-temp').text('Min/Max:   ' + mintemperature + "°F" + "  /   " + maxtemperature + "°F")
        $('#humidity').text('Humidity:  ' + humidity + '%')
        $('#sealevel').text('Feet Above Sealevel:  ' + sealevel)
        $('#windspeed').text('Windspeed (MPH):  ' + windspeed)
        $('#coordinates').text('Coordinates:   ' + lat + ",   " + lon)
            
            var pic_api_key = 'l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY'
            
            var Picurl = 'https://api.unsplash.com/search/photos?client_id=' + pic_api_key + '&query=' + recallValue;
            $.ajax({
                    url: Picurl,
                    method: "GET"
                })
                .then(function(response) {
                     var random = Math.floor(Math.random() * 10)
                     var authorFirstName = response.results[random].user.first_name
                     var authorLastName = response.results[random].user.last_name
                     var returnedImg = response.results[random].urls.regular;
                     var returnedCitation = response.results[random].links.download;
                     var returnedDescription = response.results[random].alt_description;
                     var cityImg = $('<img>');
                     var citation = $('<a>')
                     var cityDescription = $('<p>').text(returnedDescription);
                     citation.attr('href', returnedCitation)
                     $('#locationGif').attr('src', returnedImg);
                     $('#locationGif').attr('alt', returnedCitation);
                     $('#locationGif').addClass('auto-fit');
                     //For small pictures, two are returned to fill empty space; for large pictures, it autofills for only need use of one picture.
                     //If author does not have last name presented, then only first name is shown.
                     if (response.results[random].height < 6000){
                         if(authorLastName === null){
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                            $('#locationGif').html($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         } else{
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                            $('#locationGif').html($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         }
                     } else{
                         if(authorLastName === null){
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                         } else {
                            $('#city-picture-header').html(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').html(cityDescription)
                            $('#locationGif').html(cityImg)
                         }

                        }
                })
            })
        });


 
        




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// CITY ADD ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

