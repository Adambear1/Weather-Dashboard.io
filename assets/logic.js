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
console.log(arr)

function loadHistory() {
    if(arr !== null){
        for (var j = 0; j < arr.length; j++){
            if (arr[j] !== null){
            var lOne = $("<button value=" + arr[j].Savedcity + " id=" + j + ">").text(arr[j].Savedcity);
            $("#city-add-history").prepend(lOne);
            } 
        }
    }
  };

loadHistory()





let weather = []

$('#btn-submit').on('click', function() {
    event.preventDefault()
    var apiKey = '79bb7dc0e8f07f6ebe01166410e6e392'
    var cityName = document.querySelector('#myInput').value
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&APPID=' + apiKey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //Weather Dashboard
        var list = response.list
        console.log(list)
        let location_facts = {};
        for (var i = 0; i < list.length; i += 8) {
            var forecast = list[i].weather[0].main
            var kelvin = list[i].main.temp;
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
            console.log(DOW)
            //
            console.log(list.length)
            console.log(i)
            var cardDOW = document.querySelector('#card-'+ i +'-day-of-week')
            var cardImg = document.querySelector('#card-'+ i +'-img')
            var cardText = document.querySelector('#card-'+ i +'-text')
            var cardTemp = document.querySelector('#card-'+ i +'-temperature')
            var cityHeader = document.querySelector('#city-display')
            console.log(cardTemp)
            console.log(temperature)
            cardDOW.textContent = DOW
            cardImg.setAttribute('src', weatherIcon);
            cardTemp.textContent = temperature + "°F";
            cardText.textContent = forecast;
            //
            
            

            //

            location_facts = {
                Savedcity: cityName,
                Savedtemp: temperature,
                Savedforecast: forecast,
                Savedhumidity: humidity,
                Savedsealevel: sealevel,
                Savedwindspeed: windspeed,
                Savedpopulation:population,
                Savedlon: lon,
                Savedlat: lat,
                Savedday_of_week1: list[0].dt_txt,
                Savedday_of_week2: list[8].dt_txt,
                Savedday_of_week3: list[16].dt_txt,
                Savedday_of_week4: list[24].dt_txt,
                Savedday_of_week5: list[32].dt_txt,
                Savedimg1: 'http://openweathermap.org/img/wn/' + list[0].weather[0].icon  + '@2x.png',
                Savedimg2: 'http://openweathermap.org/img/wn/' + list[8].weather[0].icon  + '@2x.png',
                Savedimg3: 'http://openweathermap.org/img/wn/' + list[16].weather[0].icon  + '@2x.png',
                Savedimg4: 'http://openweathermap.org/img/wn/' + list[24].weather[0].icon  + '@2x.png',
                Savedimg5: 'http://openweathermap.org/img/wn/' + list[32].weather[0].icon  + '@2x.png',
                Savedtoday: list[0].dt_txt,
                SavedFinalToday:  list[0].dt_txt.substring(0, list[0].dt_txt.length - 8),
          
            }    


        }

        weather.push(location_facts);
        localStorage.setItem('weather', JSON.stringify(weather));


        //City Summary -- Center Column (MOMENT.JS / WIKIPEDIA API)
        let today = list[0].dt_txt;
        today = today.substring(0, today.length - 8);

        cityHeader.innerHTML = '<i class="fas fa-arrow-left"></i>    City:   ' + cityName + ',    ' + today + '    ' + '<i class="fas fa-arrow-right"></i>' 
        console.log(cityHeader.innerHTML)
        console.log('<i class="fas fa-arrow-left"></i>    City:   ' + cityName + ',    ' + today + '    ' + '<i class="fas fa-arrow-right"></i>')
        console.log(cityHeader.innerHTML === '<i class="fas fa-arrow-left"></i>    City:   ' + cityName + ',    ' + today + '    ' + '<i class="fas fa-arrow-right"></i>')
        if (cityHeader.innerHTML === '<i class="fas fa-arrow-left"></i>    City:   ' + cityName + ',    ' + today + '    ' + '<i class="fas fa-arrow-right"></i>'){
            cityHeader.classList.remove('fa-arrow-left')
            
        }
        $('#population').text('Population:   ' + population)
        $('#humidity').text('Humidity:  ' + humidity + '%')
        $('#sealevel').text('Feet Above Sealevel:  ' + sealevel)
        $('#windspeed').text('Windspeed (MPH):  ' + windspeed)
        $('#coordinates').text('Coordinates:   ' + lat + ",   " + lon)


        //Create a new object to interact with the server
        var xhr = new XMLHttpRequest();

        var Wikiurl = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=" + cityName;

        // Provide 3 arguments (GET/POST, The URL, Async True/False)
        xhr.open('GET', Wikiurl, true);

        // Once request has loaded...
        xhr.onload = function() {
            // Parse the request into JSON
            var data = JSON.parse(this.response);

            // Log the data object
            console.log(data);
            }
    // }
        // Send request to the server asynchronously
        xhr.send();



        //City Gif -- Right Column (GIPHY API)
            
            var pic_api_key = 'l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY'
            
            var Picurl = 'https://api.unsplash.com/search/photos?client_id=' + pic_api_key + '&query=' + cityName;
            $.ajax({
                    url: Picurl,
                    method: "GET"
                })
                .then(function(response) {
                     var random = Math.floor(Math.random() * 10)
                     console.log(response.results[random].user.first_name);
                     console.log(response.results[random].urls);
                     console.log(response.results[random].urls.raw);
                     var authorFirstName = response.results[random].user.first_name
                     var authorLastName = response.results[random].user.last_name
                     var returnedImg = response.results[random].urls.regular;
                     var returnedCitation = response.results[random].links.download;
                     var returnedDescription = response.results[random].alt_description;
                     var cityImg = $('<img>');
                     var citation = $('<a>')
                     var cityDescription = $('<p>').text(returnedDescription);
                     citation.attr('href', returnedCitation)
                     cityImg.attr('src', returnedImg);
                     cityImg.attr('alt', returnedCitation);
                     cityImg.addClass('auto-fit');
                     console.log(response.results[random].height < 6000);
                     //For small pictures, two are returned to fill empty space; for large pictures, it autofills for only need use of one picture.
                     //If author does not have last name presented, then only first name is shown.
                     if (response.results[random].height < 6000){
                         console.log(response.results[random].user)
                         console.log(authorLastName == null)
                         if(authorLastName == null){
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
                         if(authorLastName == null){
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



        //City Add -- Left Column
        // console.log()


        if (arr === null){
            var lOne = $("<button value=" + cityName + " id=" + 0 + ">").text(cityName);
            $("#city-add-history").prepend(lOne);
            
        } else {
            var lOne = $("<button value=" + cityName + " id=" + arr.length + ">").text(cityName);
            $("#city-add-history").prepend(lOne);
            
        }
        
        
        //Stores Items

        
    






    document.querySelector('#myInput').value = "";
})
})






  
var selected_button = $('button').val()

$('button').click(function() {
    var selected_button = $(this).attr('id');
    console.log(selected_button)
    if(arr !== null){
        for (var k = selected_button; k < selected_button; k++){
            var index = arr[k]
            console.log(index)
            //CONDENSE IF POSSIBLE ==> VIA FOR LOOP
            let DOW1 = index.Savedday_of_week1.substring(0, index.Savedday_of_week1.length - 8);
            let DOW1Final = DOW1.substring(5)
            document.querySelector('#card-0-day-of-week').textContent = DOW1Final
            let DOW2 = index.Savedday_of_week2.substring(0, index.Savedday_of_week2.length - 8);
            let DOW2Final = DOW2.substring(5)
            document.querySelector('#card-8-day-of-week').textContent = DOW2Final
            let DOW3 = index.Savedday_of_week3.substring(0, index.Savedday_of_week3.length - 8);
            let DOW3Final = DOW3.substring(5)
            document.querySelector('#card-16-day-of-week').textContent = DOW3Final
            let DOW4 = index.Savedday_of_week4.substring(0, index.Savedday_of_week4.length - 8);
            let DOW4Final = DOW4.substring(5)
            document.querySelector('#card-24-day-of-week').textContent = DOW4Final
            let DOW5 = index.Savedday_of_week5.substring(0, index.Savedday_of_week5.length - 8);
            let DOW5Final = DOW5.substring(5)
            document.querySelector('#card-32-day-of-week').textContent = DOW5Final
            //
            document.querySelector('#card-0-img').textContent = null
            document.querySelector('#card-0-img').setAttribute('src', arr[k].Savedimg1);
            document.querySelector('#card-0-img').textContent = null
            document.querySelector('#card-8-img').setAttribute('src', arr[k].Savedimg2);
            document.querySelector('#card-0-img').textContent = null
            document.querySelector('#card-16-img').setAttribute('src', arr[k].Savedimg3);
            document.querySelector('#card-0-img').textContent = null
            document.querySelector('#card-24-img').setAttribute('src', arr[k].Savedimg4);
            document.querySelector('#card-0-img').textContent = null
            document.querySelector('#card-32-img').setAttribute('src', arr[k].Savedimg5);
            //
            document.querySelector('#card-0-temperature').textContent = arr[k].Savedtemp + '° F';
            document.querySelector('#card-8-temperature').textContent = arr[k].Savedtemp + '° F';
            document.querySelector('#card-16-temperature').textContent = arr[k].Savedtemp + '° F';
            document.querySelector('#card-24-temperature').textContent = arr[k].Savedtemp + '° F';
            document.querySelector('#card-32-temperature').textContent = arr[k].Savedtemp + '° F';
            //
            document.querySelector('#card-0-text').textContent = arr[k].Savedforecast;
            document.querySelector('#card-8-text').textContent = arr[k].Savedforecast;
            document.querySelector('#card-16-text').textContent = arr[k].Savedforecast;
            document.querySelector('#card-24-text').textContent = arr[k].Savedforecast;
            document.querySelector('#card-32-text').textContent = arr[k].Savedforecast;
            //
            document.querySelector('#city-display').textContent = arr[k].Savedcity + ";     "  + arr[k].SavedFinalToday
            //
            document.querySelector('#population').textContent = "Population:   " + arr[k].Savedpopulation;
            document.querySelector('#sealevel').textContent = "Feet Above Sealevel:    " + arr[k].Savedsealevel;
            document.querySelector('#humidity').textContent = "Humidity:    " + arr[k].Savedhumidity +"%";
            document.querySelector('#windspeed').textContent = "Windspeed (MPH):   " + arr[k].Savedwindspeed;
            document.querySelector('#coordinates').textContent = "Coordinates:    "  + arr[k].Savedlon + ",   " + arr[k].Savedlat;


            

                
    }
}
})




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// CITY ADD ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

