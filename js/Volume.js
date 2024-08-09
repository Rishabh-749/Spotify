Volume.addEventListener("change",(e)=>{
    console.log("Volume Setted to:- " + parseInt(e.target.value)/100)
    audio.volume = parseInt(e.target.value)/100
    if(audio.volume>0){
        document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("Mute.svg","Volume.svg")
    }else{
        document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("Volume.svg","Mute.svg")
    }
})

document.querySelector(".volume>img").addEventListener("click",(e)=>{
    if(e.target.src.includes("Volume.svg")){
        e.target.src = e.target.src.replace("Volume.svg","Mute.svg")
        audio.volume = 0;
        document.querySelector(".volume>input").value = 0  
    }
    else{
        e.target.src = e.target.src.replace("Mute.svg","Volume.svg")
        audio.volume = 0.10;
        document.querySelector(".volume>input").value = 10  
    }
})