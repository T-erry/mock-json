// document.addEventListener("DOMContentLoaded", ()=>{
//     fetchData()
// })

let postList = document.querySelector(".post-list");
let output = "";
let addPostForm = document.getElementById("add-post-form");
let inputType= document.getElementById("title-value");
let bodyValue =  document.getElementById("body-value");
let renderquotes = (quotes)=>{
    quotes.forEach((quote)=>{
        // console.log(quote);
        output += `
        <div class="card mt-4 col-md-6">
        <div class="card-body" data-id=${quote.id}>
          <h5 class="card-title">${quote.author}</h5>
          <p class="card-text">${quote.text}</p>
          <a href="#" class="btn btn-primary id="edit-quote">Edit</a>
          <a href="#" class="btn btn-primary" id="delete-quote">Delete</a>
        </div>
      </div>
     `;
    })
    postList.innerHTML = output;
}
const url = "http://localhost:3000/Quotes";

// GET request

fetch(url)
.then((response)=> response.json())
.then((quotes)=> renderquotes(quotes));

postList.addEventListener("click",(e)=>{
    e.preventDefault();
let deleteButtonPressed = e.target.id === "delete-quote";
let EditButtonPressed = e.target.id === "edit-quote";
let id = e.target.parentElement.dataset.id;
// Delete existing quote
// method is DELETE
if(deleteButtonPressed){
fetch(`${url}/${id}`,{
    method: "DELETE",
})
.then((response)=> response.json())
.then( ()=> location.reload())
}
if(EditButtonPressed){
    const parent = e.target.parentElement;
    const cardText = parent.querySelector(".card-text").texContent;
    console.log(cardText);

}
})

// POST- insert new post
addPostForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(inputType);
    fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
           text: inputType.value,
           author: bodyValue.value
        })
    })
    .then((response)=> response.json())
    .then(quotes=> {
        const quotesArray = [];
        quotesArray.push(quotes)
        renderquotes(quotes)
    })

})
