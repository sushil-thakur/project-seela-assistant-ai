//elements
const startBtn =document.querySelector("#start");
const stopBtn =document.querySelector("#stop");
const speakBtn =document.querySelector("#speak");



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
            "two": 2,
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