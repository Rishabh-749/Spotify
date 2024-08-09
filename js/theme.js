let change1 = document.querySelector(".theme");
let icon = document.getElementsByClassName("switch")[0].getElementsByTagName("img")[0];
let btn = document.querySelector(".switch");
let shadow = document.querySelector(".s")
let theme = true;

btn.addEventListener("click",(e)=>{

    change1.classList.toggle("theme")
    shadow.classList.toggle("box-shadow")
    if(theme){
        icon.src = "Assets/Images/Switch_on.svg";
        theme = false;
    }else{
        icon.src = "Assets/Images/Switch_off.svg";
        theme = true;
    }
})
