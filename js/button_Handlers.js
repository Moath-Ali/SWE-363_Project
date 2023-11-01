

// <textarea id="article_Text" cols="30" rows="10"></textarea>
const editButton = document.getElementById("edit")
const pName = document.querySelector("h1").innerText
editButton.addEventListener("click",(e)=>{
    const tArea = document.createElement("textarea")
    tArea.id = "textArea"
    tArea.cols = 50
    tArea.rows = 50
    tArea.style.display = "block"
    

    fetch(`http://localhost:3000/getPath?name=${pName}`)
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        tArea.innerText = data.article;
    })
    document.body.appendChild(tArea)


    const saveButton = document.createElement("button")
    saveButton.innerText = "Save";
    saveButton.addEventListener("click",sFunction)

    document.body.appendChild(saveButton)
})

function sFunction(){
    const tArea = document.getElementById("textArea")

    fetch(`http://localhost:3000/postPath?name=${pName}`,{
        method:"PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({article:tArea.value})
    })
}