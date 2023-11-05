const tArea = document.getElementById("textArea");
const editButton = document.getElementById("edit")
const pName = document.querySelector("h1").innerText
const saveButton = document.getElementById("saveButton")


editButton.addEventListener("click",(e)=>{

    console.log(window.location.href.substring(0,window.location.href.indexOf("/",2)))
    fetch(`https://devpath0.onrender.com/getPath?name=${pName}`)
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        tArea.innerText = data.article;
    })
})

saveButton.addEventListener("click",sFunction)
function sFunction(){
    fetch(`https://devpath0.onrender.com/postPath?name=${pName}`,{
        method:"PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({article:tArea.value})
    })
}