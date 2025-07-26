body=document.querySelector("body")
clock=document.querySelector(".clock")
clockUI=document.querySelector(".clockUI")
intervalID=0


//if no data in localStorage then default to these
clockObj={}
clockObj.color='#31dd3c'
clockObj.position='center-center'
clockObj.value=`${clock.checked}`


// fix delay in showing time when new tab opened 
function padZero(num) {
    let s = num+"";
    while (s.length < 2) {s = "0" + s};
    return s;
}
today = new Date();
time = padZero(today.getHours()) + ":" + padZero(today.getMinutes()) + ":" + padZero(today.getSeconds())
clockUI.innerText= time
clockUI.dataset.after=time
//fix-end


function changeBackground(url) {
    if(localStorage.bgimg){
        body.style=`background: url('${url}') no-repeat center center;
        background-color: #555;
        background-attachment: fixed;
        background-size: cover;`
    }else{
        body.style="background-color: #666"
    }
}

function showClock(Obj){
    value=Obj.value
    color=Obj.color
    position=Obj.position

    if(value==='true'){
        document.documentElement.style.setProperty('--clockColor', `${clockObj.color}`)
        switch(position){
            case "center-center":
                clock.style="justify-content: center; align-items: center;"
                break
            case "center-right":
                clock.style="justify-content: flex-end; align-items: center;"
                break
            case "center-left":
                clock.style="justify-content: flex-start; align-items: center;"
                break
            case "top-left":
                clock.style="justify-content: flex-start; align-items: flex-start;"
                break
            case "top-right":
                clock.style="justify-content: flex-end; align-items: flex-start;"
                break
            case "top-center":
                clock.style="justify-content: center; align-items: flex-start;"
                break
            case "bottom-right":
                clock.style="justify-content: flex-end; align-items: flex-end;"
                break
            case "bottom-left":
                clock.style="justify-content: flex-start; align-items: flex-end;"
                break
            case "bottom-center":
                clock.style="justify-content: center; align-items: flex-end;"
                break
        }
        clockUI.style="display:block"
        intervalID=setInterval(function(){
            today = new Date();
            time = padZero(today.getHours()) + ":" + padZero(today.getMinutes()) + ":" + padZero(today.getSeconds())
            clockUI.innerText= time
            clockUI.dataset.after=time
        }, 1000)
    }else{
        clockUI.style="display:none"
        if(intervalID!=0){
            clearInterval(intervalID)
        }
    }
}

window.addEventListener("DOMContentLoaded", function(){
    url=localStorage.bgimg
    if(localStorage.clock != null){clockObj=JSON.parse(localStorage.clock)}
    changeBackground(url)
    showClock(clockObj)
})

window.addEventListener("storage", function(e){
    if (e.key==='bgimg'|e.key==='clock'){
        if(localStorage.clock != null){clockObj=JSON.parse(localStorage.clock)}
        if(localStorage.bgimg != null){url=localStorage.bgimg}
        changeBackground(url)
        showClock(clockObj)
    }
})