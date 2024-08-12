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
recognition.onend=function(){
    console.log("vr deactive");
};

recognition.continuous=true;

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