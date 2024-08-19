//elements
const startBtn =document.querySelector("#start");
const stopBtn =document.querySelector("#stop");
const speakBtn =document.querySelector("#speak");
const time =document.querySelector("#time");
const battery=document.querySelector("#battery");

//weather setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(
          data.main.temp
        )}`;
        weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
        weatherStatement = `sir the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };
  
    xhr.send();
  }
  
  // convert kelvin to celcius
  function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
  }










  
  function batteryCallBack(batteryObject) {
    console.log("Battery callback executed");
    printBatteryStatus(batteryObject);

    batteryObject.addEventListener('levelchange', () => {
        printBatteryStatus(batteryObject);
    });
}

function printBatteryStatus(batteryObject) {
    document.getElementById('battery').textContent = `Battery Level: ${Math.round(batteryObject.level * 100)}%`;
    console.log(`Battery Level: ${Math.round(batteryObject.level * 100)}%`);
}

window.onload = () => {
    console.log("JavaScript is running!");

    // Time
    updateTime(); 
    setInterval(updateTime, 1000); 

    // Battery
    navigator.getBattery().then(batteryCallBack).catch(err => {
        console.log("Battery API error:", err);
    });
};

function updateTime() {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    document.getElementById('time').textContent = `${hrs}:${mins}:${secs}`;
    console.log(`Time updated: ${hrs}:${mins}:${secs}`);
}















 //sela setup
 if (localStorage.getItem("jarvis_setup") !== null) {
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
  
  // sela information setup
  
  const setup = document.querySelector(".sela_setup");
  setup.style.display = "none";
  if (localStorage.getItem("sela_setup") === null) {
    setup.style.display = "block";
    setup.querySelector("button").addEventListener("click", userInfo);
  }


 //user info funcaton
 function userInfo() {
    let setupinfo = {
        name: setup.querySelectorAll("input")[0].value,
        bio: setup.querySelectorAll("input")[1].value,
        location: setup.querySelectorAll("input")[2].value,
        instagram: setup.querySelectorAll("input")[3].value,
        facebook: setup.querySelectorAll("input")[4].value,
        github: setup.querySelectorAll("input")[5].value,
    };
    
    let testArr = [];

    setup.querySelectorAll("input").forEach((e) => {
        testArr.push(e.value);
    });

    if (testArr.includes("")) {
        readOut("sir enter your complete information");
    } else {
        localStorage.clear();
        localStorage.setItem("sela_setup", JSON.stringify(setupinfo)); // Use setupinfo here
        setup.style.display = "none";
        weather(JSON.parse(localStorage.getItem("sela_setup")).location); // Use setupinfo here as well
    }
}

  //if (localStorage.getItem("sela_setup") !== null) {
   // weather(JSON.parse(localStorage.getItem("sela_setup")).location);
 // }

//speech reconiaztion

const SpeechRecongnition= window.SpeechRecognition || window.webkitSpeechRecognition

const recognition= new SpeechRecongnition();
recognition.onstart = function(){
    console.log("vr active")
};


//result of sr
recognition.onresult = function(event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    let userdata =localStorage.getItem("sela_setup")
    
    //console.log("Event Object:", event);
   console.log(`my words:${transcript}`);

    transcript = transcript.toLowerCase();

    if (transcript.includes("hello")) {
        readOut("hello sir");
        //console.log("hello sir");
    }
    if(transcript.includes("open youtube")){
        readOut("opening youtube sir");
        window.open("https://www.youtube.com/");
    }
    if(transcript.includes("open google")){
        readOut("opening google sir");
        window.open("https://www.google.com/");
    }

    // in youtube
    if (transcript.includes("play")) {
        readOut("Here is your result");
    
        // Remove the word "play" and get the rest of the command
        let input = transcript.slice(5).trim(); 
    
        // Prepare the search query by replacing spaces with '+'
        input = input.split(" ").join("+");
    
        console.log(input);
    
        // Open YouTube with the search query
        window.open(`https://www.youtube.com/results?search_query=${input}`);
    }
    
    //searching in google
    if(transcript.includes("search for")){
        readOut("here is your result");
        let input=transcript.split("");
        input.splice(0,11);
        input.pop();
        input=input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}/`);
        
    }
    if(transcript.includes("open instagram")){
        readOut("opening instagram  sir");
        window.open("https://www.instagram.com/");
    }
    // if(transcript.includes("open gmail")|| transcript.includes("open g m a i l")){
    //     readOut("opening gmail");
    //     window.open("https://www.gmail.com/");
    // }

    if (transcript.includes("open gmail") && transcript.includes("account")) {
        readOut("opening Gmail");
    
        let words = transcript.split(" ");
        let accId = words[words.length - 1]; // Extract the last word as accId
    
        // If accId is a word like "zero" or "one", convert it to a number
        const wordToNumber = {
            "zero": 0,
            "one": 1,
            "to": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9
        };
    
        accId = wordToNumber[accId.toLowerCase()] !== undefined ? wordToNumber[accId.toLowerCase()] : accId;
    
        console.log(`accId: ${accId}`);
    
        window.open(`https://mail.google.com/mail/u/${accId}/`);
    }
    

    //github
    if (transcript.includes("open github")) {
        readOut("opening github")
        window.open("https://github.com/")
        
    }
    if (transcript.includes("open my github profile")) {
        readOut("opening  your github profile")
        window.open(`https://github.com/${JSON.parse(userdata).github}`)
        
    }
    if (transcript.includes("open instagram")) {
        readOut("opening instagram")
        window.open("https://instagram.com/")
        
    }
    if (transcript.includes("open my instagram profile")) {
        readOut("opening  your instagram profile")
        window.open(`https://instagram.com/${JSON.parse(userdata).instagram}`)
        
    }
    if (transcript.includes("open facebook")) {
        readOut("opening facebook")
        window.open("https://facebook.com/")
        
    }
    if (transcript.includes("open my facebook profile")) {
        readOut("opening  your facebook profile")
        window.open(`https://facebook.com/${JSON.parse(userdata).facebook}`)
        
    }
   
    
}


recognition.onend=function(){
   
    console.log("vr deactive");
};

//recognition.continuous=true;

startBtn.addEventListener("click",()=>{
    recognition.start();

});

stopBtn.addEventListener("click",()=>{
    recognition.stop();

});

// seela speak
function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    //different voice
    const allVoice=speechSynthesis.getVoices()
    speech.text = message;
    speech.voice=allVoice[2];
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    console.log("Speaking out:", message);
}

speakBtn.addEventListener("click", () => {
    readOut("Hello, I am Sela, an advanced AI assistant. How can I help you, sir?");
});

window.onload=function(){
    readOut("... ");
};