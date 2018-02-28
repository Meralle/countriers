
countrysArray = [];
function getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => {
            // console.log(response)
            return response.json()
        })

    .then(countries => {
        countrysArray = countries;
        console.log(countrysArray);
        createLyout(countrysArray);

    })
    .catch(err => {
      alert('Fetch error', err)
    })
}

function createLyout(countrysArray) {
    let htmlElements = `<div><table border=1 margin="0 auto">`
    // let db = countrysArray.map((c, i) => c.id = i)
    let localdb = countrysArray;
    if (document.getElementById("searchcountry").value !== "") {
       localdb = localdb.filter(i => i.name.toLowerCase().includes(document.getElementById("searchcountry").value))
    }

    var countries = document.getElementById("countries");
    // population
    let sum = 0;
    for (let i = 0; i < countrysArray.length; i++) {
        sum += countrysArray[i].population
    }
      // console.log(sum)

    // for the numbers
    let numCount = 0;
    // sorting
    if (window.location.search.substr(1) === "sort=asc") {
        countrysArray.sort((a, b) => a.population - b.population)
    } else if (window.location.search.substr(1) === "sort=desc") {
        countrysArray.sort((a, b) => b.population - a.population)
    }

    localdb.forEach(country => {
        numCount++;
        htmlElements += `<tr><td>${numCount}</td>
      <td width= 20%>${country.name} </td>
      <td width= 20%> <img src = " ${country.flag} " width= 30%"" >  </td>
      <td>${country.capital}</td>
      <td>${country.population}</td>
      <td>${(country.population / sum *100).toFixed(2)}%</td></tr>` 
      // <td>${(country.population / world population)}       
       
    });

     countries.innerHTML = htmlElements
           
  } 

function searchButton() {
    let button = document.getElementById('searchcountry');
    button.addEventListener('keyup', (e) => {
    e.preventDefault();
    createLyout(countrysArray) 

  });

}
  getCountries();
  searchButton();


// this part with search button
// searching() {  
//   var search = document.getElementById("search") 
//      search.addEventListener('keyup', (e) => {
//      e.preventDefault()
//      this.printCountries()
//    })