const cartButton = document.querySelector(".button_cart");
const modal = document.querySelector("#modal")
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

function toggleModal() {
	modal.classList.toggle("is_open");
}

new WOW().init();