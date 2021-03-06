'use strict'
let continers = document.getElementById('pictures');

let firstImge = document.getElementById('frstPicture');         // in order to make render "step3"
let secondImg = document.getElementById('SecondPicture');
let lastImg = document.getElementById('lastPicture');


let firstImgeIndex;
let secondImgIndex;
let lastImgIndex;


let maxAttempts = 25;
let numberOfAttampts = 0;

let productName = [];
let productVote = [];
let productShown = [];

let Imges= []; 

function Products(name, source) {    //step 1
    this.name = name
    this.source = source
    this.vote = 0;
    this.shown = 0;
    Products.allImages.push(this);
    productName.push(name);
}


Products.allImages = [];

function setItems() {
  let data = JSON.stringify(Products.allImages);
  localStorage.setItem('product' , data);

}

new Products('banana', 'imges/banana.jpg');
new Products('bathroom', 'imges/bathroom.jpg');
new Products('boots', 'imges/boots.jpg');
new Products('breakfast', 'imges/breakfast.jpg');
new Products('bubblegum', 'imges/bubblegum.jpg');
new Products('chair', 'imges/chair.jpg');
new Products('cthulhu', 'imges/cthulhu.jpg');
new Products('dog-duck', 'imges/dog-duck.jpg');
new Products('dargon', 'imges/dragon.jpg');
new Products('pen', 'imges/pen.jpg');
new Products('pat-sweep', 'imges/pet-sweep.jpg');
new Products('scissors', 'imges/scissors.jpg');
new Products('shark', 'imges/shark.jpg');
new Products('sweep', 'imges/sweep.png');
new Products('tauntaun', 'imges/tauntaun.jpg');
new Products('unicorn', 'imges/unicorn.jpg');
new Products('usb', 'imges/usb.gif');
new Products('water-can', 'imges/water-can.jpg');
new Products('wine-glass', 'imges/wine-glass.jpg');



//console.log(Products.allImages);


function randomlyGenerate() {                    // step 2 
    return Math.floor(Math.random() * Products.allImages.length);
}

function getItems() {
  let srtringObject = localStorage.getItem('product')
  if (srtringObject) {
    Products.allImages = JSON.parse(srtringObject)
  }
}


function renderThreeImages() {

    do {
      firstImgeIndex = randomlyGenerate();
      secondImgIndex= randomlyGenerate();
      lastImgIndex = randomlyGenerate();


    } while ((firstImgeIndex === secondImgIndex) || (secondImgIndex ===lastImgIndex) || (firstImgeIndex ===lastImgIndex) || Imges.includes(firstImgeIndex) || Imges.includes(secondImgIndex) || Imges.includes(lastImgIndex))

    firstImge.src = Products.allImages[firstImgeIndex].source;
    Products.allImages[firstImgeIndex].shown++

    secondImg.src = Products.allImages[secondImgIndex].source;
    Products.allImages[secondImgIndex].shown++

    lastImg.src = Products.allImages[lastImgIndex].source;
    Products.allImages[lastImgIndex].shown++


    Imges = [firstImgeIndex, secondImgIndex, lastImgIndex]
}
renderThreeImages();


continers.addEventListener('click', click);


function click(event) {
    numberOfAttampts++;
    if (numberOfAttampts <= maxAttempts) {
        if (event.target.id === 'frstPicture') {
            Products.allImages[firstImgeIndex].vote++
            setItems()
            
        } else if (event.target.id = 'SecondPicture') {
            Products.allImages[secondImgIndex].vote++
            setItems()
            
        } else {
            Products.allImages[lastImgIndex].vote++
            setItems()

        }
        renderThreeImages();

    } else {
        /*let list = document.getElementById('results');
        let result;
        for (let i = 0; i < Products.allImages.length; i++) {
            result = document.createElement('li')
            list.appendChild(result)
            result.textContent = Products.allImages[i].name + ' had ' + Products.allImages[i].vote + ' vote, and was seen ' + Products.allImages[i].shown + ' times ';
        }*/
        /*let btn = document.createElement('button')
        list.appendChild(btn);
        btn.textContent = " Show The Results "
        btn.addEventListener('click', enter)*/

        continers.removeEventListener('click', click)

// to push every vote and shown 
for (let i = 0; i < Products.allImages.length; i++) {
    productVote.push(Products.allImages[i].vote);
    productShown.push(Products.allImages[i].shown);
}
viewChart();
    }

}


  function viewChart() {

    let ctx = document.getElementById('myChart').getContext('2d');
  
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
        labels: productName,
  
        datasets: [
  
  
          {
            label: ' product votes',
            backgroundColor: '#9a8194',
            borderColor: '#9a8194',
            data: productVote
          },
          
          {
            label: ' product shown',
            backgroundColor: '#822659',
            borderColor: '#822659',
            data: productShown
          },
     
  
        ]
      },
       

      // Configuration options go here
      options: {}
    
    }); 
  }
  getItems()
 // console.log(chart);
