const tabs = document.querySelectorAll('[data-tab-target]')

const tabContents = document.querySelectorAll('[data-tab-content]');

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', () => {
    for (let j = 0; j < tabContents.length; j++) {
      tabContents[j].dataset.active = false;
    }
    // select one you want to show
    const target = document.querySelector('#' + tabs[i].dataset.tabTarget);
    target.dataset.active = true;
  })
}

// grab button seperately and access api object in the console.
// let buttonUk = document.querySelector("#button-uk");
// let buttonUs = document.querySelector("#button-us");

// instead grab buttons collectively and loop over. 
const buttonCountry = document.querySelectorAll(".button-country");

// add event listerner to button`
let selectedButton = "";
buttonCountry.forEach((button) => {
  button.addEventListener("click", (event) => {
    loadArticles(button.dataset.country)
  })
})

// display gb auto 
loadArticles('gb');

function loadArticles(selectedButton) {

  // get news section
  const sectionCountry = document.getElementById('news');
  // empty the news section to stop duplicate
  sectionCountry.innerHTML = ''

  let encoded = encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=${selectedButton}&pageSize=9&apiKey=c08a1eeb4cd64f16814aa16e610ace2b`)
  // console.log(selectedButton);
  fetch(`https://cors-proxy.oliverjam.workers.dev?url=${encoded}`)
    .then((response) => {
      if (response.ok !== true) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(data => {
      console.log(data, 'yaya')

      // use template literal to get h3 associated with id or either uk or us depending on button clicked.

      let header = document.createElement("h2");
      header.innerHTML = `Top Stories for the ${selectedButton.toUpperCase()}`;
      sectionCountry.appendChild(header);

      const articles = document.createElement('div');
      articles.classList.add("articles-container")

      // Loop over the articles
      for (let i = 0; i < data.articles.length; i++) {
        // saved looped article in a variable
        const article = data.articles[i];
        // create a wrapper for the content
        const articleElement = document.createElement("article")
        // create new h3 each time to add the headline into
        let headlineName = document.createElement("h3");
        // access dom node, and set text to the variable of the title
        headlineName.innerHTML = article.title;
        // add headline name to the section with allocated us or uk button clicked
        articleElement.appendChild(headlineName);
        if (article.urlToImage) {
          let headlineImg = document.createElement("img");
          headlineImg.classList.add("article-img");
          // create img elemet each time the loop runs and set src attribute to urlToImage
          headlineImg.setAttribute("src", article.urlToImage);
          // append to relevant section 
          articleElement.appendChild(headlineImg);
        }
        let description = document.createElement("p");
        description.classList.add("article-description")
        description.innerHTML = article.description;
        articleElement.appendChild(description);

        let link = document.createElement("a");
        link.classList.add("article-url");
        link.setAttribute("href", article.url);
        link.setAttribute("target", "_blank");
        link.innerHTML = `Click here to access full article`;
        articleElement.appendChild(link);

        articles.appendChild(articleElement);
      }
      sectionCountry.appendChild(articles);
    })
    .catch((error) => console.log(error, "nay"))
}


const weatherKey = '2f3d3d3d32f17bca72f64fb285f2214a';
const form = document.querySelector('form')
const weatherInput = document.querySelector('#location')
const weatherOutput = document.querySelector('#output')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(weatherInput.value)
  weatherOutput.innerHTML = ''
  /*let url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&units=metric&appid=${weatherKey}`
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      let icon = data.weather[0].icon
      let currentDay = document.createElement('section')
      currentDay.innerHTML = `
      <section>
            <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="">
            <p class='description'>${data.weather[0].description}</p>
            <p>Feels like ${data.main.feels_like}&deg;C</p>
            <p>High:${data.main.temp_max}&deg;C</p>
            <p>Low:${data.main.temp_min}&deg;C</p>
            <p>Humdity:${data.main.humidity}%</p>
            <p>Wind:${data.wind.speed}mph</p>
            </section>
            `
      weatherOutput.append(currentDay)
    })
    .catch((error) => {
      console.log(error)
      if (error == 'Error: 404') {
        weatherOutput.innerHTML = `<p>Place not found</p>`
      }
    })*/
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherInput.value}&units=metric&appid=${weatherKey}`
  fetch(url2)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then((array) => {
      console.log(array)
      let bottomInfo = document.createElement('section')
      bottomInfo.classList.add('timedWeather')
      array.list.forEach((data, index) => {
        let next5Days

        let dailyTime = data.dt_txt.split(' ')[1].split(':').splice(0, 2).join(':')
        let hourlyTemp;

        if (index % 8 === 0) {

          console.log(dailyTime)
          const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let d = new Date(data.dt * 1000); // to get the DateTime. 
          let dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array. 

          next5Days = document.createElement('section')
          let icon = data.weather[0].icon
          next5Days.innerHTML = `
          <p id="day">${dayName}</p>
          <p id="place">${array.city.name}</p>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="">
          <p id='description'>${data.weather[0].description}</p>
          <p class="weatherInfo">Feels like ${data.main.feels_like}&deg;C</p>
          <p class="weatherInfo">High:${data.main.temp_max}&deg;C</p>
          <p class="weatherInfo">Low:${data.main.temp_min}&deg;C</p>
          <p class="weatherInfo">Humdity:${data.main.humidity}%</p>
          <p class="weatherInfo">Wind:${data.wind.speed}mph</p>
          `
          next5Days.classList.add('mainWeather')
          weatherOutput.append(next5Days)
          // weatherOutput.append(hourlyTemp)

          if (index > 0) {
            next5Days.classList.add('hidden')
          }
        }

        if (index <= 3) {
          hourlyTemp = document.createElement('div')
          hourlyTemp.innerHTML = `
          <p class="bottomTime">${dailyTime}</p>
          <img class="bottom-icons" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
          <p class="bottomTemp">${data.main.feels_like}&deg;C</p>`

          hourlyTemp.classList.add('hourlyTemp')
          bottomInfo.append(hourlyTemp)
        }

      })
      weatherOutput.append(bottomInfo)
    })
    .catch((error) => {
      console.log(error)
      if (error == 'Error: 404') {
        weatherOutput.innerHTML = `<p>Place not found</p>`
      }
    })

})

