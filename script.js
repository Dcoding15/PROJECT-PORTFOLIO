// =========================
// Slideshow
// =========================

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
showSlides(slideIndex += n);
}

function currentSlide(n) {
showSlides(slideIndex = n);
}

function showSlides(n) {

let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");

if (slides.length === 0) return;

if (n > slides.length) {slideIndex = 1}
if (n < 1) {slideIndex = slides.length}

for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}

for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}

slides[slideIndex-1].style.display = "block";

if(dots.length){
dots[slideIndex-1].className += " active";
}

}


// =========================
// Scroll Reveal Animation
// =========================

const revealCards = () => {
const cards = document.querySelectorAll(".card");
const windowHeight = window.innerHeight;

cards.forEach(card => {
const cardTop = card.getBoundingClientRect().top;

if (cardTop < windowHeight - 100) {
card.classList.add("visible");
}
});
};

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);


// =========================
// Search Filter
// =========================

document.addEventListener("DOMContentLoaded", function () {

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

if(!searchInput) return;

searchInput.addEventListener("input", function () {

const query = searchInput.value.toLowerCase().trim();
let visible = 0;

cards.forEach(function(card){

const text = card.textContent.toLowerCase();

if(text.includes(query)){
card.style.display = "";
visible++;
}else{
card.style.display = "none";
}

});

if(noResults){
noResults.style.display = visible === 0 ? "block" : "none";
}

});

});