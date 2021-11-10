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
  country.addEventListener("click",(event) => {
    selectedButton = country.dataset.tabTarget;
    // console.log(selectedButton);
    fetch(`http://newsapi.org/v2/top-headlines?country=${selectedButton}&apiKey=c08a1eeb4cd64f16814aa16e610ace2b`)
      .then((response) => {
        if(response.ok !== true) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => console.log(data, 'yaya'))
      .catch((error) => console.log(error, "nay"))
  })

  })
