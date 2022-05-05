// Open Weather API key e493d7860e9f31ea12032a54ec9425f4
//https://openweathermap.org/api
//by city: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//by geolocation: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
"use strict";
$( document ).ready(function() {

   //geting user location
   //built-in geolocation api
   //on loadup
   $("#userLocation").click(function(){
      navigator.geolocation.getCurrentPosition(function(position){
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
         
         $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            data: {lat: lat, lon: long, units: "imperial", appid: "e493d7860e9f31ea12032a54ec9425f4"}
         }).done(function(data){
             const {main, name, sys, weather } = data;
             const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

             const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
               <h2 class="city-name" data-name="${name},${sys.country}">
                  <span>${name}</span>
                  <sup>${sys.country}</sup>
               </h2>
               <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
               </div>
               <figure>
                  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                  <figcaption>${weather[0]["description"]}</figcaption>
               </figure>
            `;
         li.innerHTML = markup;
         $(".cities").append(li);
         }).fail(function(jqXHR){
            $("forecast").html("There was a problem contacting the server: " + jqXHR.status + " " + jqXHR.responseText);
         });
      });
   });
   

   $("button").click(function() {
      
       let city = $("#city").val();
       $.ajax({
           url: "http://api.openweathermap.org/data/2.5/weather",
           data: { q: city, units: "imperial", appid: 
   "e493d7860e9f31ea12032a54ec9425f4" }
        }).done(function(data) {
         const {main, name, sys, weather } = data;
         const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

         const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
           <h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
           </h2>
           <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
           </div>
           <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
              <figcaption>${weather[0]["description"]}</figcaption>
           </figure>
        `;
     li.innerHTML = markup;
     $(".cities").append(li);
       }).fail(function(jqXHR) {
          $("#forecast").html("There was a problem contacting the server: " +
             jqXHR.status + " " + jqXHR.responseText);
       });
    });
});