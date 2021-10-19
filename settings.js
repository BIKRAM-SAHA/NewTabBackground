//imgs have an id so it is defined in JS execution environment by default
clock=document.querySelector(`.clock`)
submit=document.querySelector(`input[type="submit"]`)


submit.addEventListener("click",function(e){
    e.preventDefault()
    reader= new FileReader()
    reader.onload=function(){
        console.log(reader.result)
        localStorage.bgimg=reader.result
    }
    if(img.files[0]){
        reader.readAsDataURL(img.files[0])
    }
})

