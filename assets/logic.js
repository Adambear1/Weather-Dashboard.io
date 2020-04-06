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
$('#btn-submit').on('click', function() {
    event.preventDefault()
    var apiKey = '79bb7dc0e8f07f6ebe01166410e6e392'
    var cityName = document.querySelector('#myInput').value
    // var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + apiKey
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&APPID=' + apiKey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //Weather Dashboard
        var list = response.list
        for (var i = 0; i < list.length; i += 8) {
            var forecast = list[i].weather[0].main
            var kelvin = list[i].main.temp;
            var temperature = Math.floor((kelvin - 273.15) * 9/5 + 32)
            var weatherIcon = 'http://openweathermap.org/img/wn/' + list[i].weather[0].icon  + '@2x.png'
            var humidity = list[i].main.humidity;
            var sealevel = list[i].main.sea_level
            var windspeed = list[i].wind.speed
            console.log(list[i])
            for(var j = 1; j < 6; j++){
                var cardImg = document.querySelector('#card-'+[j]+'-img')
                var cardText = document.querySelector('#card-'+[j]+'-text')
                var cardTemp = document.querySelector('#card-'+[j]+'-temperature')
                var cityHeader = document.querySelector('#city-display')

                console.log(cardTemp)
                console.log(temperature)
                cardImg.src = weatherIcon;
                cardTemp.textContent = temperature + "°F";
                cardText.textContent = forecast;
            }
        }
        //City Summary -- Center Column (MOMENT.JS / WIKIPEDIA API)
        // $('.list-group-item').empty();

        var today = moment().format("dddd, MMMM Do YYYY hh:mm:ss");
        var hour = parseInt(moment().format('HH'))
        
        console.log(hour)
        if(hour > 11.5){
            x = "PM"
        } else {
            x = "AM"
        }
        console.log(x)
        cityHeader.textContent += "   " + cityName + ",    " + today + "    "  + x
        $('#humidity').text('Humidity:  ' + humidity + '%')
        $('#sealevel').text('Feet Above Sealevel:  ' + sealevel)
        $('#windspeed').text('Windspeed (MPH):  ' + windspeed)


        // 

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

        //     // Log the page objects
        //     console.log(data.query.pages)

        //     // Loop through the data object
        //     // Pulling out the titles of each page
        //     for (var i in data.query.pages) {
        //         console.log(data.query.pages[i].title);
            }
    // }
        // Send request to the server asynchronously
        xhr.send();



        // $.ajax({
        //     type: "GET",
        //     url: Wikiurl,
        //     data:{action:'openseach', format:'json',search: cityName},
        //     dataType:'jsonp',
        //     success: function (data){
        //         data.setHeader("Set-Cookie", "HttpOnly;Secure; SameSite=Strict");
        //         var arr=data;
        //         console.log(arr)

        //     }
        // })

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
                            $('#city-picture-header').append(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').append(cityDescription)
                            $('#locationGif').append(cityImg)
                            $('#locationGif').append($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         } else{
                            $('#city-picture-header').append(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').append(cityDescription)
                            $('#locationGif').append(cityImg)
                            $('#locationGif').append($('<img>').addClass('auto-fit').attr('src',response.results[random - 1].urls.regular))
                         }
                     } else{
                         if(authorLastName == null){
                            $('#city-picture-header').append(citation).text('Photo(s) by:   ' + authorFirstName);
                            $('.auto-fit').append(cityDescription)
                            $('#locationGif').append(cityImg)
                         } else {
                            $('#city-picture-header').append(citation).text('Photo(s) by:   ' + authorFirstName + '    ' + authorLastName);
                            $('.auto-fit').append(cityDescription)
                            $('#locationGif').append(cityImg)
                         }

                     }
                })



        //City Add -- Left Column
        var lOne = $("<li id=" + cityName + ">").text(cityName);
        $("#city-add-history").append(lOne);

        const citySave = [];

        let individualCity = {
            city: $("<li id=" + cityName + ">").attr('id')
        }
        citySave.push(individualCity)
        localStorage.setItem('city', JSON.stringify(citySave));
    })
})



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// CITY ADD ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

