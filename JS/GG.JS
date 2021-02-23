"use strict";
//define vars , and global arrays

let firstImage;
let secoundImage;
let thirdImage;
let UserChoices = 0; //to use it as counter
let ProductNames = [];
let VotesResults = [];
let TimesResults = [];
let x;
let y;
let z;
let previousImages=[];
console.log("----------",previousImages);

//Constructor Function

function Product(name, imagSource, times, vote) {
  this.name = name;
  this.imagSource = imagSource;
  this.times = parseInt(times);
  this.vote = parseInt(vote);
  //   this.result = result;
  Product.productsArray.push(this);
  // ProductNames.push(this.name);
}



Product.productsArray = []; //to push all intances to

//new intances
new Product("bag", "Images/bag.jpg", 0, 0);
new Product("banana", "Images/banana.jpg", 0, 0);
new Product("bathroom", "Images/bathroom.jpg", 0, 0);
new Product("boots", "Images/boots.jpg", 0, 0);
new Product("breakfast", "Images/breakfast.jpg", 0, 0);
new Product("bubblegum", "Images/bubblegum.jpg", 0, 0);
new Product("chair", "Images/chair.jpg", 0, 0);
new Product("cthulhu", "Images/cthulhu.jpg", 0, 0);
new Product("dog-duck", "Images/dog-duck.jpg", 0, 0);
new Product("dragon", "Images/dragon.jpg", 0, 0);
new Product("pen", "Images/pen.jpg", 0, 0);
new Product("pet-sweep", "Images/pet-sweep.jpg", 0, 0);
new Product("scissors", "Images/scissors.jpg", 0, 0);
new Product("sweep", "Images/sweep.png", 0, 0);
new Product("tauntaun", "Images/tauntaun.jpg", 0, 0);
new Product("unicorn", "Images/unicorn.jpg", 0, 0);
new Product("usb", "Images/usb.gif", 0, 0);
new Product("water-can", "Images/water-can.jpg", 0, 0);
new Product("wine-glass", "Images/wine-glass.jpg", 0, 0);
new Product("shark", "Images/shark.jpg", 0, 0);

console.log('Product.productsArray.includes',Product.productsArray.includes("bag"));




//LOCAL STORAGE FUNCTIONS
function settingVotes(){
  let storedProducts=JSON.stringify(Product.productsArray);
  // console.log("storedProducts",storedProducts);
  localStorage.setItem("storedProducts",storedProducts);
  // console.log(storedProducts);
}


function gettingVotes(){


  let stringProducts=localStorage.getItem('storedProducts');
  let normalProducts=JSON.parse(stringProducts);
  if (normalProducts!=null){
    Product.productsArray=normalProducts;
  }
  console.log("normalProducts",normalProducts);
  // return;

}





//creating images elements
let image = document.getElementById("images");
let imageSource1 = document.createElement("img");
image.appendChild(imageSource1);
imageSource1.id = "firstImage";
let imageSource2 = document.createElement("img");
image.appendChild(imageSource2);
imageSource2.id = "secoundImage";
let imageSource3 = document.createElement("img");
image.appendChild(imageSource3);
imageSource3.id = "thirdImage";

//random Function
function randomImages() {
  return Math.floor(Math.random() * Product.productsArray.length);
}

//calling function of rendering at the start
//if it's the first time 


if(UserChoices==0){

  renderImages();
}
// else{
//   // checkupdatevalid(previousImages,firstImage);
//   // gettingVotes();
//   // renderImages();




// }

function renderImages() {
  
  // checkupdatevalid();
console.log("attempts",UserChoices);
  //is it the last attempt ? 
  if (UserChoices === 25) {
    result();
    viewChart();
  }
  
  
  firstImage = randomImages();
  settingVotes();//to send the times of appearing to the Local storage
  
  Product.productsArray[firstImage].times++; //to counter the times the first image appeared
  
  do {
    
    secoundImage = randomImages();
    settingVotes();//to send the times of appearing to the Local storage
    Product.productsArray[secoundImage].times++; //to counter the times the secound image appeared
    
    
    thirdImage = randomImages();
    settingVotes();//to send the times of appearing to the Local storage
    checkupdatevalid();

    Product.productsArray[thirdImage].times++; //to counter the times the third image appeared
    
    //to prevent repeated images in the same attempt
  } while (
    firstImage === secoundImage ||
    firstImage === thirdImage ||
    secoundImage === thirdImage
  );


  //asign images
  imageSource1.src = Product.productsArray[firstImage].imagSource;
  imageSource2.src = Product.productsArray[secoundImage].imagSource;
  imageSource3.src = Product.productsArray[thirdImage].imagSource;


  // console.log('indexes------------------',firstImage,secoundImage,thirdImage);
//to prevent repeating 

previousImages=[firstImage,secoundImage,thirdImage];

console.log("previousImages",previousImages);

}









function checkupdatevalid(){

   x=previousImages.includes(firstImage);
   y=previousImages.includes(secoundImage);
   z=previousImages.includes(thirdImage);
   
   console.log('----includes------',firstImage,'-----',x );
   console.log('----includes------',secoundImage,'-----', y);
   console.log('----includes------',thirdImage,'-----', z);
if(x==true||y==true||z==true){
  return false;
}
else{
  return true
}






  //  y=previousImages.includes(secoundImage);
  //  z=previousImages.includes(thirdImage);


  // secoundImage,thirdImage




}


// Handle clicking

imageSource1.addEventListener("click", vote);
imageSource2.addEventListener("click", vote);
imageSource3.addEventListener("click", vote);

// console.log('times', Product.productsArray[firstImage].imagSource);
function vote(event) {
  UserChoices++;
  gettingVotes();

  if (event.target.id === "firstImage") {
    Product.productsArray[firstImage].vote++;


  } else if (event.target.id === "secoundImage") {
    Product.productsArray[secoundImage].vote++;

  } else if (event.target.id === "thirdImage") {
    Product.productsArray[thirdImage].vote++;

  }
  settingVotes();//to send the votes to the Local storage

  renderImages();
}


function result() {
  let ViewResults = document.createElement("button");
  image.appendChild(ViewResults);
  ViewResults.id = "ViewResults";
  ViewResults.innerHTML = "ViewResults";
  imageSource1.removeEventListener("click", vote);
  imageSource2.removeEventListener("click", vote);
  imageSource3.removeEventListener("click", vote);
  ViewResults.addEventListener("click", renderResults);
  MakearrayforVotes();

}

function MakearrayforVotes() {
  for (let i = 0; i < Product.productsArray.length; i++) {
    VotesResults.push(Product.productsArray[i].vote);
    TimesResults.push(Product.productsArray[i].times);
    ProductNames.push(Product.productsArray[i].name);
  }

}

function renderResults() {
  ViewResults.removeEventListener("click", renderResults);
  for (let i = 0; i < Product.productsArray.length; i++) {
    // console.log("VotesResults =", VotesResults[i]);

    let resultsArea = document.getElementById("resultsArea");
    let resultWritten = document.createElement("p");
    resultsArea.appendChild(resultWritten);
    resultWritten.id = "resultWritten";

    if (Product.productsArray[i].times == 0) {
      resultWritten.textContent =
        Product.productsArray[i].name +
        "  " +
        "was seen" +
        ".  " +
        "No" +
        ".  " +
        "times";
    } else {
      resultWritten.textContent =
        Product.productsArray[i].name +
        "  " +
        "had" +
        "  " +
        Product.productsArray[i].vote +
        "  " +
        "votes" +
        "  " +
        " and was seen " +
        "  " +
        Product.productsArray[i].times +
        " times";

    //   console.log("finish");
    }
    // console.log(VotesResults);
  }
}

//------------------------------------------------------------
//Make Chart
//---------------------------------------------------------

function viewChart() {
  let ctx = document.getElementById("myChart").getContext("2d");

  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: ProductNames,

      datasets: [
        {
          label: " votes",
          backgroundColor: "#f14668",
          borderColor: "#ffff",
          data: VotesResults,
        },

        {
          label: "times seen",
          backgroundColor: "#314e52",
          borderColor: "red",
          data: TimesResults,

          //

          // Configuration options go here
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

