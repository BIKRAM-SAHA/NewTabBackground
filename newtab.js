body=document.querySelector("body")

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


window.addEventListener("load", function(){
    url=localStorage.bgimg
    changeBackground(url)
})
window.addEventListener("storage", function(e){
    if (e.key==='bgimg'){
        url=localStorage.bgimg
        changeBackground(url)
    }
})