//JSON
const locations = [
    {
      "id": 1,
      "name": "Biarritz",
      "country": "FR",
      "days": [
        {
          "id": 1,
          "date": "Thu Nov 09 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 29,
          "precipitation": 0,
          "humidity": 42,
          "wind": 3
        },
        {
          "id": 2,
          "date": "Fri Nov 10 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "cloudy",
          "temperature": 24,
          "precipitation": 5,
          "humidity": 64,
          "wind": 4
        },
        {
          "id": 3,
          "date": "Sat Nov 11 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "rainy",
          "temperature": 18,
          "precipitation": 10,
          "humidity": 80,
          "wind": 5
        },
        {
          "id": 4,
          "date": "Sun Nov 12 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 29,
          "precipitation": 4,
          "humidity": 60,
          "wind": 4
        }
      ]
    },
    {
      "id": 2,
      "name": "Moscow",
      "country": "RU",
      "days": [
        {
          "id": 1,
          "date": "Thu Nov 09 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 220,
          "precipitation": 0,
          "humidity": 42,
          "wind": 3
        },
        {
          "id": 2,
          "date": "Thu Nov 10 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "cloudy",
          "temperature": 24,
          "precipitation": 5,
          "humidity": 64,
          "wind": 4
        },
        {
          "id": 3,
          "date": "Thu Nov 11 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "rainy",
          "temperature": 18,
          "precipitation": 10,
          "humidity": 80,
          "wind": 5
        },
        {
          "id": 4,
          "date": "Thu Nov 12 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 29,
          "precipitation": 4,
          "humidity": 60,
          "wind": 4
        }
      ]
    },
    {
      "id": 3,
      "name": "London",
      "country": "UK",
      "days": [
        {
          "id": 1,
          "date": "Thu Nov 09 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 150,
          "precipitation": 0,
          "humidity": 42,
          "wind": 3
        },
        {
          "id": 2,
          "date": "Thu Nov 10 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "cloudy",
          "temperature": 24,
          "precipitation": 5,
          "humidity": 64,
          "wind": 4
        },
        {
          "id": 3,
          "date": "Thu Nov 11 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "rainy",
          "temperature": 18,
          "precipitation": 10,
          "humidity": 80,
          "wind": 5
        },
        {
          "id": 4,
          "date": "Thu Nov 12 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
          "weather": "sunny",
          "temperature": 29,
          "precipitation": 4,
          "humidity": 60,
          "wind": 4
        }
      ]
    }
  ];


  const App = {
    init() {
      //Сбор инфы с JSON
      const [currentLocation] = locations;
      this.showLocation(currentLocation);

      this.modal();
      this.selectListener();
    },

    modal() {
      //Модальное окно
      const modalElement = document.getElementById('first'); 
      if (modalElement) {
        document.querySelectorAll('.js-open-modal').forEach(button => {
          button.addEventListener('click', () => {
            modalElement.classList.remove('closed');
          })
        });

        document.querySelectorAll('.js-close-modal').forEach(button => {
          button.addEventListener('click',()=>{
            modalElement.classList.add('closed');
          })
        });
      }
    },

    selectListener() {
      //City Select
      const citySelectElement = document.getElementById('city-select');

      citySelectElement.onchange =  () => {
        const newCity = locations.find(location => location.id == citySelectElement.value);
        console.log(this);
        this.showLocation(newCity);
      };

      this.createSelectOptions(citySelectElement);
    },

    createSelectOptions(citySelectElement) {
      locations.forEach(location => {
        const option = document.createElement('option');
        option.innerText = `${location.name}, ${location.country}`;
        option.value = location.id;
        option.id = location.id
        citySelectElement.appendChild(option);
      });
    },
    
    showLocation(location) {
      const { name, country, days } = location;
      const [ firstDay ] = days;
      console.log(locations);
      
      
    //Переменные левый блок, верх
      const LeftWeekElement = document.getElementById('week');
      const LeftDateElement = document.getElementById('dateEl')
      const cityElement = document.getElementById('city');
      const countryElement = document.getElementById('country');
    //Переменные левый блок, низ
      const LeftWeatherElementMark = document.getElementById('left-block__location-mark')
      const LeftTempElement = document.getElementById('Temperature')
      const LeftWeatherElement = document.getElementById('WeatherEl')
    //Переменные правый блок, верх
      const precipitationElement = document.getElementById('first-percent');
      const humidityElement = document.getElementById('second-percent');
      const windElement = document.getElementById('WindPercent');
        
    //Weatherblock
      const daysContainer = document.querySelector('.right-block__weatherblock');
      daysContainer.innerHTML = '';

      console.log(daysContainer);
      days.forEach((day, index) => {
        const { temperature, date, weather } = day;
        const weekdayClassname = index !== 0 ? 'weatherblock__unit__week' : 'weatherblock_1st-unit__week';
        const tempClassname = index!==0 ?'weatherblock__unit__temperature':'weatherblock_1st-unit__temperature';
        const markClassname = index!==0 ? 'weatherblock__unit__mark':'weatherblock__1st-unit__mark';
        const weekDayEl = createDivElement(weekdayClassname, date.slice(0,3));
        const tempDayEl = createDivElement(tempClassname, temperature +'°C');
        const image = document.createElement('img');
              image.src= WeatherToMark(weather);
              image.width=50;
        const markDayEl = createDivElement(markClassname);
              markDayEl.append(image);
        const dayElname = index!==0?'right-block__weatherblock__unit':'right-block__weatherblock__1st-unit';
        const dayEl = createDivElement(dayElname)
        dayEl.append(markDayEl);
        dayEl.append(weekDayEl);
        dayEl.append(tempDayEl);
        daysContainer.append(dayEl);
      });
    
    
      
    //Раскидывание данных по HTML
      if (cityElement) {
          cityElement.innerText = name;
      }
      if (countryElement) { 
          countryElement.innerText = country;
      }
      if (LeftWeekElement){
        LeftWeekElement.innerText = weekChanger(firstDay.date.slice(0,3))
      }
      if (precipitationElement) {
        precipitationElement.innerText =  `${firstDay.precipitation} %`;
      }
      if (humidityElement){
        humidityElement.innerText = firstDay.humidity + ' %'
      }
      if (windElement) {
        windElement.innerText = firstDay.wind + ' km/h';
      }
      if (LeftTempElement){
        LeftTempElement.innerText = firstDay.temperature + '°C'
      }
      if (LeftWeatherElement){
        LeftWeatherElement.innerText=zaglav(firstDay.weather)
      }
      if (LeftDateElement){
        LeftDateElement.innerText = firstDay.date.slice(4,15)
      }
      if (LeftWeatherElementMark){
      } 
    }
  };








window.addEventListener('load', function() {
 App.init();
});


//Делает первую букву заглавной
function zaglav(str) {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  return(capitalize(str)) ;
}

//Возвращает полное название недели 
function weekChanger(str) {
  if (str=='Mon'){
    str=Monday
  }
  else if  (str=="Thu"){
    str="Thursday"
  }
  else if (str=='Wed'){
    str='Wednesday'
  }
  else if (str=='Thu'){
    str='Thursday'
  }
  else if (str=='Fry'){
    str='Friday'
  }
  else if(str=='Sat'){
    str='Saturday'
  }
  else if(str=='Sun'){
    str="Sunday"
  }
  return str
}

//Создание div элемента
function createDivElement(className, innerText) {
  const el = document.createElement('div');
  el.classList.add(className);

  if (innerText) {
    el.innerText = innerText
  }

  return el;
}

//Отдает на погоду соответствующую иконку погоды
function WeatherToMark (weather){
  if (weather == 'sunny')
  {str ='./image/sunmark.svg'
  
  }
  else if (weather == 'rainy')
  {str ='./image/rainymark.svg'
  
  }
  else if (weather == 'cloudy')
  {str ='./image/cloudlymark.svg'
  
  }
  return str
};