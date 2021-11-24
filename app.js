const rowGallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const createSliderBtn = document.getElementById('create-slider');
const images = document.querySelector('.images');
const main = document.querySelector('.main');
const spinner = document.querySelector('#spinner');

//search button function
const searchBtn = () => {
  const search = document.getElementById('search');
  getImages(search.value);
  images.style.display = "block";
  sliders.length = 0;
  duration.value = "";
  clearInterval(timer);
  search.value = "";
}
// get images from api
const getImages = (query) => {
  toggleSpinner(true);
  setTimeout(function () {
    fetch(`https://pixabay.com/api/?key=24122016-c09e6eb809098225b3222546f&q=${query}&image_type=photo`)
      .then(res => res.json())
      .then(data => showingImages(data.hits));
  }, 3000);
}
//showing image on the display
const showingImages = (images) => {
  galleryHeader.style.display = "flex";
  rowGallery.innerHTML = "";
  images.forEach(image => {
    const div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = `
      <img class = "img-fluid img-thumbnail" src = "${image.webformatURL}" onclick = "selectItem(event,'${image.webformatURL}')">
      `
    rowGallery.appendChild(div);
    toggleSpinner()
  })
  main.style.display = "none";

}

//Select image
let sliders = [];
const selectItem = (event, img) => {
  const element = event.target;
  element.classList.add('added');
  const item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
  else {
    element.classList.remove('added');
    sliders.pop(img);
  }
}
document.getElementById('create-slider').addEventListener('click', function () {
  createSlider(sliders);
})

let timer;
const createSlider = (slideImages) => {
  if (slideImages.length < 2) {
    alert('Hey! Select at least two images');
    return;
  }
  const slideContainer = document.getElementById('sliders');
  slideContainer.innerHTML = "";
  slideImages.forEach(item => {
    const div = document.createElement('div');
    div.className = "slide-items";
    div.innerHTML = `
    <img src = "${item}" class = "w-100">
    `
    slideContainer.appendChild(div);
  })
  const duration = document.getElementById('duration').value;
  const sec = duration * 1000;
  if (duration === "") {
    alert(`Hey! Set minimum value`);
    return;
  }
  if (sec < 1000) {
    alert(`Hey! You can't set negetive value`);
    return;
  }
  images.style.display = "none";
  main.style.display = "block";
  timer = setInterval("createSlideShow(1)", sec);
}

let slideIndex = 0;
const createSlideShow = (n) => {
  showSlide(slideIndex = slideIndex + n);
}
const showSlide = (index) => {
  const items = document.querySelectorAll('.slide-items');
  if (index > items.length - 1) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(element => {
    element.style.display = "none";
  })
  items[index].style.display = "block";
}

//trigger button click on enter key
document.getElementById('search').addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById('search-btn').click();
    searchBtn();
  }
})

//toggle spinner function
const toggleSpinner = (condition) => {
  if (condition === true) {
    spinner.style.display = "block";
  }
  else {
    spinner.style.display = "none";
  }
}


































