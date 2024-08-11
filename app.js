//elements
const startBtn =document.querySelector("#start");
const stopBtn =document.querySelector("#stop");


//speech reconiaztion

const SpeechRecongnition= window.SpeechRecognition || window.webkitSpeechRecognition

const recognition= new SpeechRecongnition();
recognition.onstart = function(){
    console.log("vr active")
};
recognition.onend=function(){
    console.log("vr deactive");
};

startBtn.addEventListener("click",()=>{
    recognition.start();

});

stopBtn.addEventListener("click",()=>{
    recognition.stop();

});