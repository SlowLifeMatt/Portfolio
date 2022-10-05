// Clock animation

setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
  
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);



// Script that follows where the user is on the page and highlights accordingly

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY = window.pageYOffset;
  

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;

    const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 50;
    sectionId = current.getAttribute("id");

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}


// Weather App code below
const weatherBtn = document.querySelector('button')
const inputBox = document.querySelector('input')
const feels_like = document.getElementById('feels_like')
const main_temp = document.getElementById('main_temp')
const city_name = document.getElementById('city_name')

description = document.getElementById('description')
weatherBtn.addEventListener('click', (e) => {
     e.preventDefault()
    console.log(inputBox.value)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&units=imperial&appid=26ebea8ed348135195f7f6a703585e09`)
        .then((res) => res.json())
        .then((data) => {
            city_name.innerText = "Current City: " + data.name
            main_temp.innerText = "Temperature Outside: " + Math.round(data.main.temp) + "°F"    
            feels_like.innerText = "Feels like: " + Math.round(data.main.feels_like) + "°F"
            description.innerText = "Weather: " + data.weather[0].description
            })
                .catch((err) => console.log(err));
});

