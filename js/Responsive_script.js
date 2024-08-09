let hamburger = document.querySelector(".hamburger").getElementsByTagName("img")[0]
let Close_btn = document.querySelector(".close").getElementsByTagName("img")[0]

let left_con = document.querySelector(".left")
let right_con = document.querySelector(".right")

hamburger.addEventListener("click",()=>{
    left_con.style.left = 0
    console.log(left_con.offsetHeight + "px")
    right_con.style.height = left_con.offsetHeight + "px";
    
})

Close_btn.addEventListener("click",()=>{
    left_con.style.left = "-220%"
    right_con.style.height = "98vh"
})