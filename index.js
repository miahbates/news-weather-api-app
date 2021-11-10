const tabs = document.querySelectorAll('[data-tab-target]')

const tabContents = document.querySelectorAll('[data-tab-content]');

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', () => {
    for (let j = 0; j < tabContents.length; j++) {
      tabContents[j].dataset.active = false;
    }
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
buttonCountry.forEach((country) => {
  country.addEventListener("click", (event) => {
    selectedButton = country.dataset.tabTarget;

    let encoded = encodeURIComponent(`http://newsapi.org/v2/top-headlines?country=${selectedButton}&apiKey=c08a1eeb4cd64f16814aa16e610ace2b`)

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
        document.getElementById(`header${selectedButton}`).innerHTML = `Top Stories for the ${selectedButton.toUpperCase()}`;

          // Loop over the articles
          for (let i = 0; i < data.articles.length; i++) {
          // saved looped article in a variable
          const article = data.articles[i];
          // create new h3 each time to add the headline into
          let headlineName = document.createElement("h3");
          // access dom node, and set text to the variable of the title
          headlineName.innerHTML = article.title;
          // use template literal to get h3 associated with id or either uk or us depending on button clicked.
          const sectionCountry = document.getElementById(`${selectedButton}`);
          // add headline name to the section with allocated us or uk button clicked
          sectionCountry.appendChild(headlineName);
        } 
      })
      .catch((error) => console.log(error, "nay"))
  })
})

 // add headline image to retropective subheading
          // create img elemet each time the loop runs and set src attribute to urlToImage 
          // let headlineImg = document.createElement("img").setAttribute("src", article.urlToImage);
          // sectionCountry.appendChild(headlineImg);
          // append to relevant section 

const weatherKey = '2f3d3d3d32f17bca72f64fb285f2214a';
const form = document.querySelector('form')
const weatherInput = document.querySelector('#location')
const weatherOutput = document.querySelector('#output')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(weatherInput.value)
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&units=metric&appid=${weatherKey}`
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
      weatherOutput.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="">
            <h2>${data.weather[0].description}</h2>
            <p>Feels like ${data.main.feels_like}&deg;C</p>
            <p>High:${data.main.temp_max}&deg;C</p>
            <p>Low:${data.main.temp_min}&deg;C</p>
            <p>Humdity:${data.main.humidity}%</p>
            <p>Wind:${data.wind.speed}mph</p>
            `
    })
    .catch((error) => {
      console.log(error)
      if (error == 'Error: 404') {
        weatherOutput.innerHTML = `<p>Place not found</p>`
      }
    })
  })