const tArea = document.getElementById("articleTA");
const editButton = document.getElementById("edit")
const pName = document.querySelector("h1").innerText
const saveButton = document.getElementById("saveButton")
const tAreaIntro = document.getElementById("introTA")

editButton.addEventListener("click",(e)=>{

    fetch(`http://localhost:3000/getPath?name=${pName}`)
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        tAreaIntro.innerText = data.intro;

        //to display article
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
        body:JSON.stringify({article:tArea.value, intro:tAreaIntro.value})
    })
}