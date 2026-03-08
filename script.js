//Login 

function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){
        window.location.href = "index.html"
    }else{
        alert("Wrong Username or Password")
    }

}

// LOAD ALL ISSUES

async function loadIssues(){

 manageSpinner(true)
 
const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

displayIssues(data.data)

};


// DISPLAY ISSUES

function displayIssues(issues){
    

const container = document.getElementById("issueContainer")

const count = document.getElementById("issueCount")

container.innerHTML = ""

count.innerText = issues.length + " Issues"


issues.forEach(issue => {

const card = document.createElement("div")

let border = issue.status === "open" ? "border-green-500" : "border-purple-500"

card.innerHTML = `

<div class="card-body card bg-white shadow border-t-4 ${border} cursor-pointer">

<div class="flex justify-between items-center">
            <img src="./assets/Open-Status.png" alt="">
            <h2 class="bg-red-100 px-7 py-2 rounded-xl text-green-600 font-semibold uppercase">${issue.priority}</h2>
        </div>

<h2 class="card-title">${issue.title}</h2>

<p class = "text-gray-500">${issue.description}</p>

<div class="flex gap-2 mt-2">

<span class="badge bg-red-200 border-red-400 uppercase">${issue.labels[0]}</span>

<span class="badge bg-orange-200 border-orange-400 uppercase">${issue.labels[1]}</span>

</div>

<p class="text-sm mt-3">#${issue.id} by ${issue.author}</p>

<p class="text-sm">${issue.createdAt}</p>

</div>

`
card.onclick = () => openModal(issue)

container.appendChild(card)

})
manageSpinner(false);
};

// Spinner

  const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issueContainer").classList.add("hidden");
    }else{
        document.getElementById("issueContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
  };


// MODAL

function openModal(issue){

const modal = document.getElementById("issueModal")

document.getElementById("modalContent").innerHTML = `

<h2 class="text-xl font-bold">${issue.title}</h2>

<p class="mt-2">${issue.description}</p>

<p class="mt-2">Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Category: ${issue.category}</p>

<p>Date: ${issue.createdAt}</p>

`

modal.showModal()

}

// FILTER

async function filterIssues(status){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

const filtered = data.data.filter(issue => issue.status === status)

displayIssues(filtered)

};

// SEARCH

function searchIssue(){

const text = document.getElementById("searchInput").value

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

.then(res => res.json())

.then(data => displayIssues(data.data))

};

// ACTIVE BUTTON
function setActive(button){

const buttons = document.querySelectorAll(".tab-btn")

buttons.forEach(btn => {
btn.classList.remove("btn-primary")
})

button.classList.add("btn-primary")

};

  

  loadIssues()