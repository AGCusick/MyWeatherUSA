//current condition variables
const mainContainer = document.querySelector('.mainContainer');
const currentConditions = document.querySelector('.currentConditions');
const city = document.querySelector('.city');
const time = document.querySelector('.time');
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const condition = document.querySelector('.condition');
const wind = document.querySelector('.wind');
const gust = document.querySelector('.gust');
const icon = document.querySelector('.icon');
const apiContainer = document.querySelector('.apiContainer');
const zipInput = document.querySelector('#zipCode');
const img = document.createElement('img');
const changeLocation = document.querySelector('#changeLocation')

//forecast container
const threeDay = document.querySelector('.threeDay');
// weekday names
const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
// month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// get the date
const d = new Date();
let day = d.getDay();
const month = d.getMonth();
const monthDay = d.getDate();
let hour = d.getHours();
const minute = d.getMinutes();
const second = d.getSeconds();

// e listener for form
zipInput.addEventListener('keypress', ((e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        let location = zipInput.value;

        // fetch weather data
        async function getWeather() {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6e6263afb84f44279f731543222510&q=${location}&days=3&aqi=no&alerts=no`);
            const data = await response.json()
            console.log(data)
            zipInput.style.display = 'none';
            changeLocation.style.display = 'block';
            // current conditions......................................................................................................
            currentConditions.style.display = 'block';
            threeDay.style.display = 'flex';
            city.innerHTML = `${data.location.name}, ${data.location.region}`;
            time.innerHTML = `${weekDay[day]}, ${monthNames[month]} ${monthDay}`;
            temp.innerHTML = `${Math.round(data.current.temp_f)} °F`;
            feelsLike.innerHTML = `Feels like: ${Math.round(data.current.feelslike_f)}°`
            humidity.innerHTML = `Humidity ${data.current.humidity}%`
            condition.innerHTML = data.current.condition.text;
            wind.innerHTML = `Wind:  ${data.current.wind_dir} ${Math.round(data.current.wind_mph)} mph`;
            gust.innerHTML = `Gusting at: ${Math.round(data.current.gust_mph)} mph`
            //icon
            //get png from data to match to assets folder and display icon
            let fullIconString = data.current.condition.icon
            let iconString = data.current.condition.icon.slice(-7);
            // get day or night icon
            if (fullIconString.includes('night')) {
                img.src = `assets/night/${iconString}`;
                icon.appendChild(img)
            } else {
                img.src = `assets/day/${iconString}`;
                icon.appendChild(img)
            }

            apiContainer.style.display = 'block';
            // three day forecast......................................................................
        
         
            for (i = 0; i <= 2; i++) {
                // three day forecast variables
                let forecastDiv = document.createElement('div');
                let forecastIcons = document.createElement('img');
                let oneIconString = data.forecast.forecastday[i].day.condition.icon.slice(-7);
                // create divs for forecast and icons
                forecastDiv.classList.add('forecastStyle');
                forecastDiv.innerHTML = `${weekDay[day + 1]} <br> ${Math.round(data.forecast.forecastday[i].day.maxtemp_f)}° | 
                ${Math.round(data.forecast.forecastday[i].day.mintemp_f)}° <br>
                Humidity: ${data.forecast.forecastday[i].day.avghumidity}% <br>
                Wind: ${Math.round(data.forecast.forecastday[i].day.maxwind_mph)} mph`;
                forecastIcons.src = `assets/day/${oneIconString}`;
                forecastIcons.classList.add('forecastIconImg');
                forecastDiv.appendChild(forecastIcons);
                threeDay.appendChild(forecastDiv);
                day++;

            }


            zipInput.value = '';
        
        }

        getWeather();
    }
}));




