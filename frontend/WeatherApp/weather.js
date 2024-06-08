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
    "id": 2,
    "name": "Moscow",
    "country": "RU",
    "days": [
      {
        "id": 1,
        "date": "Thu Nov 09 2023 18:21:45 GMT+0500 (Yekaterinburg Standard Time)",
        "weather": "sunny",
        "temperature": 20,
        "precipitation": 3,
        "humidity": 53,
        "wind": 4
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
        "temperature": 29,
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
// const apiKey = "77891ab9932da5bd5cb13ac764441eef";
// const getApiUrl = (apiKey,cityName) => 'https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=${cityName}&appid=${apiKey}'

// const result = await fetch(link);
// const data = await result.json();

const log = console.log
const App = {
  setup() {
    const [currentLocation] = locations;

    this.showLocation(currentLocation);
    // const [currentDay] = days;
    // this.showDay(currentDay);
    this.modal();
    this.selectListener();
  },
  modal() {
    const modalElement = document.getElementById('pop-up');
    if (modalElement) {
      document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
          modalElement.classList.remove('closed');
          
        })
      });
    }
    if (modalElement) {
      document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
          modalElement.classList.add('closed');
        })
      });
    }
  },
  selectListener() {
    //City Select

    const citySelectElement = document.getElementById('location-select');
    citySelectElement.onchange = () => {
      const newCity = locations.find(location => location.id == citySelectElement.value);
      // console.log(this);
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
    // debugger;
    const { name, country, days } = location;
    const [firstDay] = days;
    const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateElement = document.getElementById('date');
    const cityElement = document.getElementById('city');
    const countryElement = document.getElementById('country');
    const percipitationElement = document.getElementById('percipitation-percent');
    const humidityElement = document.getElementById('humidity-percent');
    const windElement = document.getElementById('wind-percent');
    const weekDay = document.getElementById('current-day');
    const weekTemperature = document.getElementById('current-temperature');
    const weekDaysContainer = document.querySelector('.card-right__widget');
    weekDaysContainer.innerHTML = '';

    days.forEach(day => {
      const { temperature, date } = day;
      // const [weather, temperature, percipitation, humidity, wind, date] = day;
      const dateFormat = new Date(date);
      const dayElement = createDivElement('card-right__widget--unactive');
      const weekDayEl = createDivElement('card-right__widget-text', daysNames[dateFormat.getDay()])
      const tempDayEl = createDivElement('card-right__widget-temperature', temperature + " °C");
      dayElement.append(weekDayEl);
      dayElement.append(tempDayEl);
      weekDaysContainer.append(dayElement);
      if (weekDay) {
        weekDay.innerText = daysNames[dateFormat.getDay()];
      };
      if (dateElement) {
        dateElement.innerText = daysNames[dateFormat.getDay()];
      }
      if (weekTemperature) {
        weekTemperature.innerText = temperature + "°C";
      };
      if (percipitationElement) {
        percipitationElement.innerText = firstDay.precipitation + "%";
      };
      if (humidityElement) {
        humidityElement.innerText = firstDay.humidity + "%";
      };
      if (windElement) {
        windElement.innerText = firstDay.wind + "km/h";
      };
      if (cityElement) {
        cityElement.innerText = name + ", ";
      };
      if (countryElement) {
        countryElement.innerText = country;
      };
    });
  }
};

window.addEventListener("load", function () {
  App.setup();
});


function createDivElement(className, innerText) {
  const element = document.createElement('div');
  element.classList.add(className);

  if (innerText) {
    element.innerText = innerText;
  }

  return element;
}