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
        htmlElements += `<tr>
      <td>${numCount}</td>
      <td width= 20%>${country.name} </td>
      <td width= 20%><img data-id = "${country.latlng}" src ="${country.flag}" width= 30%"" >  </td>
      <td>${country.capital}</td>
      <td>${country.population}</td>
      <td>${(country.population / sum *100).toFixed(2)}%</td></tr>` 
    
    });

     countries.innerHTML = htmlElements        
  } 


  function initMap(lat,lng,zoom){
    const coord = {
      lat:lat,
      lng:lng,
    }
    const map = new google.maps.Map(document.getElementById('map'), 
      {zoom: zoom, center:coord})
    const marker = new google.maps.Marker({
      position:coord, map:map});

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position :coord,
        pov: {
          heading:34,
          pitch:10
        }
      });
    map.setStreetView(panorama);
      
  }

  document.getElementById('countries').addEventListener('click', function(e){
    // console.log(e.target);
    // const {target} = e;
    // es6 object destructuring
    // const target = e.target
    // const {target} = e;
    const coord = e.target.getAttribute('data-id');
    // console.log(coord)
    const final = coord.split(',');
    // console.log(final)
    initMap(Number(final[0]),Number(final[1]), 6);
    $('.bd-example-modal-lg').modal();
  });


function searchButton() {
    let button = document.getElementById('searchcountry');
    button.addEventListener('keyup', (e) => {
    e.preventDefault();
    createLyout(countrysArray) 

  });

}
  getCountries();
  searchButton();