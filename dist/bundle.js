!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t){let e='<div><table border=1 margin="0 auto">',n=t;""!==document.getElementById("searchcountry").value&&(n=n.filter(t=>t.name.toLowerCase().includes(document.getElementById("searchcountry").value)));var o=document.getElementById("countries");let r=0;for(let e=0;e<t.length;e++)r+=t[e].population;let a=0;"sort=asc"===window.location.search.substr(1)?t.sort((t,e)=>t.population-e.population):"sort=desc"===window.location.search.substr(1)&&t.sort((t,e)=>e.population-t.population),n.forEach(t=>{e+=`<tr>\n      <td>${++a}</td>\n      <td width= 20%>${t.name} </td>\n      <td width= 20%><img data-id = "${t.latlng}" src ="${t.flag}" width= 30%"" >  </td>\n      <td>${t.capital}</td>\n      <td>${t.population}</td>\n      <td>${(t.population/r*100).toFixed(2)}%</td></tr>`}),o.innerHTML=e}countrysArray=[],document.getElementById("countries").addEventListener("click",function(t){const e=t.target.getAttribute("data-id").split(",");!function(t,e,n){const o={lat:t,lng:e},r=new google.maps.Map(document.getElementById("map"),{zoom:n,center:o}),a=(new google.maps.Marker({position:o,map:r}),new google.maps.StreetViewPanorama(document.getElementById("pano"),{position:o,pov:{heading:34,pitch:10}}));r.setStreetView(a)}(Number(e[0]),Number(e[1]),6),$(".bd-example-modal-lg").modal()}),fetch("https://restcountries.eu/rest/v2/all").then(t=>t.json()).then(t=>{countrysArray=t,console.log(countrysArray),n(countrysArray)}).catch(t=>{alert("Fetch error",t)}),document.getElementById("searchcountry").addEventListener("keyup",t=>{t.preventDefault(),n(countrysArray)})}]);