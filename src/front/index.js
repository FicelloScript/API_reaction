let startBtn = document.querySelector(".start");
let reactBtn = document.querySelector(".reaction");
let textBox = document.querySelector(".textTable");
targetBlock = document.querySelector(".indicator");
let randomNum = (Math.floor(Math.random()*3)+1)*1000;

startBtn.addEventListener('click',function(){
    randomNum = (Math.floor(Math.random()*3)+1)*1000;
    let time = 0;
    setTimeout(function(){
        targetBlock.style.backgroundColor = "#2ecc71";
            let timer = setInterval(function(){
                time++;
                textBox.innerText = time;
            }, 0.1);
            reactBtn.addEventListener('click',function(){
                clearInterval(timer);
                targetBlock.style.backgroundColor = "#e74c3c";
                textBox.innerText = "Your reaction is "+time;
                time = 0;
            })
    },randomNum);
})
