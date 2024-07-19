async function getCurrentImageOfTheDay(newdate) {
    if(new Date(newdate)<=new Date(new Date().toISOString().split("T")[0])){
  let apikey = "x7Y3EtHBZFy0Ny4lYNyCeaDyJ7In8TUchuoeAg3w";
  console.log("the currdate is ", new Date().toISOString());

  let res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${newdate}`
  );
  console.log("res", res);
  let data = await res.json();
  console.log("data is ", data);
  imgDiv = document.getElementById("current-image-container");
  if (newdate == new Date().toISOString().split("T")[0])
    document.getElementById(
      "current-image-container"
    ).innerHTML = `<h1 style="margin:20px">NASA Picture of the Day</h1>`;
  else
    document.getElementById(
      "current-image-container"
    ).innerHTML = `<h1>Picture on ${newdate}</h1>`;

  imgEle = document.createElement("img");
  imgEle.src = data.url;
  imgEle.style.width = "90vw";
  imgEle.style.height = "50vw";
  imgEle.style.margin="20px";
  imgEle.style.paddin="10px";


  imgDiv.appendChild(imgEle);
  imgDiv.innerHTML += `<div class="title"><h1 id="curr-day">${data.title}</h1></div>
        <div class="paragraph"><p id="about-img">${data.explanation}</p></div>`;
  saveSearch(newdate);
  addSearchToHistory();}else {
    alert(`Please select today or date before today`)
    document.getElementById("search-input").value="";
  }
}
getCurrentImageOfTheDay(new Date().toISOString().split("T")[0]);
function saveSearch(newdate) {

  
   
  let allSearch = localStorage.getItem("searches");
  allSearch = allSearch ? JSON.parse(allSearch) : [];
  console.log("allsearch is ", allSearch);
  if (allSearch == null) {
    localStorage.setItem("searches", JSON.stringify([{ date: `${newdate}` }]));
  } else {
    let filteredSearch = allSearch.filter((item, i) => item.date == newdate);
    if (filteredSearch.length == 0)
      localStorage.setItem(
        "searches",
        JSON.stringify([...allSearch, { date: `${newdate}` }])
      );
  }

}
function addSearchToHistory() {
  let allSearch = JSON.parse(localStorage.getItem("searches"));
  let ulList = document.getElementById("search-history");
  ulList.innerHTML = "";
  allSearch.map((item) => {
    let listItem = document.createElement("li");

    let achtag = document.createElement("a");
    achtag.href = "#";
    achtag.textContent = item.date;
    achtag.onclick = () => {
      getCurrentImageOfTheDay(item.date);
    };
    listItem.appendChild(achtag);

    ulList.appendChild(listItem);
  });
}
function handleClick() {
  let calInput = document.getElementById("search-input");
  console.log("callinput is ", typeof calInput.value);
  if (calInput.value.length>0) {
    
    getCurrentImageOfTheDay(calInput.value);
  }
}

document.getElementById("submit").addEventListener("click", handleClick);
