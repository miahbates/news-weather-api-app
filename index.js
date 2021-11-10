const reqOptions = { 'mode': 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

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

          // add headline image to retropective subheading
          // create img elemet each time the loop runs and set src attribute to urlToImage 
          // let headlineImg = document.createElement("img").setAttribute("src", article.urlToImage);
          // sectionCountry.appendChild(headlineImg);
          // append to relevant section 
        } 
      })
      .catch((error) => console.log(error, "nay"))
  })
})
