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
        //City Summary -- Right Column (WIKIPEDIA API)
        cityHeader.textContent += "   " + cityName
        var url = 'https://en.wikipedia.org/w/api.php' 
        $.ajax({
            type: "GET",
            url: url,
            data:{action:'openseach', format:'json',search: cityName},
            dataType:'jsonp',
            success: function (data){
                data.setHeader("Set-Cookie", "HttpOnly;Secure; SameSite=Strict");
                var arr=data;
                console.log(arr)

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

