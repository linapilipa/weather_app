let apiKey = '233685be5a9e7d9956bd51cd9c52657c' // jusu api key
let lang = 'lt' // kalba
let units = 'metric' // naudojama metrine sistema
let city = '' // miestas irasytas inpute

let cityName = document.getElementById('city')
let searchButton = document.getElementById('search')

searchButton.addEventListener('click', getDataFromApi)

let localStorageCity = localStorage.getItem('city')
cityName.value = localStorageCity

console.log(localStorageCity)

if (localStorageCity != null){
    if (localStorage.getItem('city').length){
        getDataFromApi()
    } 
}

function getDataFromApi() {
    city = cityName.value
    localStorage.setItem('city', city);
   
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city +
        '&units=' + units +
        '&lang=' + lang +
        '&appid=' + apiKey

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            removeDayForecast()
            showWeatherInDom(data)
            console.log(data)
        });
        
}



function showWeatherInDom(data) {
    if (data.cod === '200') {

        startWeather(data)

        for (let i=2; i<data.list.length; i += 2 ){
            createWeatherTab(data.list[i])
        }
    } else {
        alert('kazkas negerai, patikrinti konsole')
        console.log('Kazkas negerai',data)
    }
}


function startWeather(data){
    
    let date = document.getElementById('date')
    date.innerHTML = data.list[0].dt_txt + ', ' + data.city.name
    // localStorage.setItem('date', date.innerHTML = data.list[0].dt_txt + ', ' + data.city.name)
    // console.log(localStorage)
    
    let icon = document.getElementById('whaeterIcon')
    let iconCode = data.list[0].weather[0].icon;
    let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    icon.src = iconUrl

    let cityTemp = document.getElementById('temperature')
    cityTemp.innerHTML = Math.round(data.list[0].main.temp) + '°C'

    let weatherDescription = document.getElementById('weatherDescription')
    weatherDescription.innerHTML = data.list[0].weather[0].description 
    
    let feelTemp = document.getElementById('feelTemp')
    feelTemp.innerHTML = 'Pojūtis: ' + Math.round(data.list[0].main.feels_like) + '°C' 

    let wind = document.getElementById('wind')
    wind.innerHTML = 'Vėjas: ' + Math.round(data.list[0].wind.speed) + ' m/s' + ', gūsiai iki ' + Math.round(data.list[0].wind.gust) + ' m/s'

    let tempMinMax = document.getElementById('tempMinMax')
    tempMinMax.innerHTML =  'Min: ' + Math.round(data.list[0].main.temp_min) + '°C' + ' Max: ' + Math.round(data.list[0].main.temp_max) + '°C'
   
    let selectLang = document.querySelector('label')
        
    if (lang == 'LT' ) {
        cityName.placeholder = 'Miestas'
        searchButton.value = 'Ieškoti'
        selectLang.innerHTML = 'Pasirinkite kalbą:'
        feelTemp.innerHTML = 'Pojūtis: ' + Math.round(data.list[0].main.feels_like) + '°C' 
        wind.innerHTML = 'Vėjas: ' + Math.round(data.list[0].wind.speed) + ' m/s' + ', gūsiai iki ' + Math.round(data.list[0].wind.gust) + ' m/s' 
    } else if (lang == 'EN') {
        cityName.placeholder = 'City'
        searchButton.value = 'Search'
        selectLang.innerHTML = 'Select language:'
        feelTemp.innerHTML = 'Feels like: ' + Math.round(data.list[0].main.feels_like) + '°C' 
        wind.innerHTML = 'Wind: ' + Math.round(data.list[0].wind.speed) + ' m/s' + ', gust: ' + Math.round(data.list[0].wind.gust) + ' m/s'
        console.log(feelTemp)
    } else if (lang == 'IT') {
        cityName.placeholder = 'Città'
        searchButton.value = 'Ricerca'
        selectLang.innerHTML = 'Seleziona la lingua:'
        feelTemp.innerHTML = 'Si sente come: ' + Math.round(data.list[0].main.feels_like) + '°C' 
        wind.innerHTML = 'Il vento: ' + Math.round(data.list[0].wind.speed) + ' m/s' + ', folata: ' + Math.round(data.list[0].wind.gust) + ' m/s'
    }
   
}

function createWeatherTab(forecast) {
    
    let dayForecast = document.createElement('div')
    dayForecast.setAttribute('class', 'dayForecast')

    let singleDay = document.createElement('div')
    singleDay.setAttribute('class', 'singleDay')
    dayForecast.appendChild(singleDay)

    let forecastDate = document.createElement('div')
    forecastDate.setAttribute('class', 'forecastDate')
    singleDay.appendChild(forecastDate)
    forecastDate.innerHTML = forecast.dt_txt

    let symbol = document.createElement('img')
    let forecastIconCode = forecast.weather[0].icon
    symbol.src = 'http://openweathermap.org/img/wn/' + forecastIconCode + '@2x.png'
    symbol.setAttribute('class', 'symbol')
    singleDay.append(symbol)
    
    let temp = document.createElement('div')
    temp.setAttribute('class', 'temp')
    singleDay.appendChild(temp)
    temp.innerHTML = Math.round(forecast.main.temp) + '°C'

    let description = document.createElement('div')
    description.setAttribute('class', 'description')
    singleDay.appendChild(description)
    description.innerHTML = forecast.weather[0].description

    document.body.appendChild(dayForecast)
}

function removeDayForecast() {
    let elements = document.querySelectorAll(".dayForecast");

    if(elements.length) {
        for (let i=0; i<elements.length; i++) {
            elements[i].remove()
        }
    }
}

document.getElementsByTagName('select')[0].addEventListener ('change', function(){
        lang = this.value

        getDataFromApi()
    }
)












