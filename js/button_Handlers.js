const tArea = document.getElementById("textArea");
const editButton = document.getElementById("edit")
const pName = document.querySelector("h1").innerText
const saveButton = document.getElementById("saveButton")


editButton.addEventListener("click",(e)=>{

    console.log(window.location.href.split("/"))
    fetch(`http://localhost:3000/getPath?name=${pName}`)
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        tArea.innerText = data.article;
    })
})

saveButton.addEventListener("click",sFunction)
function sFunction(){
    fetch(`http://localhost:3000/postPath?name=${pName}`,{
        method:"PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({article:tArea.value})
    })
}