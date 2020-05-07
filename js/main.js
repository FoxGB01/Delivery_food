'use strict'

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const cancel = document.querySelector(".clear-cart");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem('nickname');



function toggleModal() {
	modal.classList.toggle("is-open");
}
function toggleModalAuth() {
	modalAuth.classList.toggle("is-open");
};


function authorized() {
	userName.textContent = login;
	function logOut() {
		login = '';

		buttonAuth.style.display = '';
		userName.style.display = '';
		buttonOut.style.display = '';
		buttonOut.removeEventListener("click", logOut);
		localStorage.removeItem('nickname');

		checkAuth();
	}

	buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'block';

	buttonOut.addEventListener("click", logOut);
};
function notAuthorized() {
	logInForm.addEventListener("submit", logIn);
	buttonAuth.addEventListener("click", toggleModalAuth);
	closeAuth.addEventListener("click", toggleModalAuth);

	function logIn(event) {
		event.preventDefault();

		loginInput.style.borderColor = '';

		if (loginInput.value) {
			login = loginInput.value;
		closeAuth.addEventListener("click", toggleModalAuth);
		localStorage.setItem('nickname', login);

		toggleModalAuth();
		buttonAuth.removeEventListener("click", toggleModalAuth);
		closeAuth.removeEventListener("click", toggleModalAuth);
		logInForm.removeEventListener("submit", logIn);
		logInForm.reset();
		checkAuth();
		} else {
			loginInput.style.borderColor = 'red';
		}
	};
}

function checkAuth() {
		if (login) {
		authorized();
		cardsRestaurants.removeEventListener('click', toggleModalAuth);
		function createCardGood() {
			const card = document.createElement('div');
			card.className = "card";

			card.insertAdjacentHTML('beforeend',`
				<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
				<div class="card-text">
					<div class="card-heading">
						<h3 class="card-title card-title-reg">Пицца Везувий</h3>
					</div>
					<!-- /.card-heading -->
					<div class="card-info">
						<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
							«Халапенье», соус «Тобаско», томаты.
						</div>
					</div>
					<!-- /.card-info -->
					<div class="card-buttons">
						<button class="button button-primary button-add-cart">
							<span class="button-card-text">В корзину</span>
							<span class="button-cart-svg"></span>
						</button>
						<strong class="card-price-bold">545 ₽</strong>
					</div>
			`);
			cardsMenu.insertAdjacentElement('beforeend', card);
			};

			function openGoods(event) {
				const target = event.target;
				const restaurant = target.closest('.card-restaurant');

				if (restaurant) {
					cardsRestaurants.removeEventListener('click', openGoods);
					containerPromo.classList.add('hide');
					restaurants.classList.add('hide');
					menu.classList.remove('hide');

					cardsMenu.textContent = '';

					createCardGood();
					createCardGood();
					createCardGood();
				};
			};
			cardsRestaurants.addEventListener('click', openGoods);
	} else {
		notAuthorized();
		cardsRestaurants.addEventListener('click', toggleModalAuth);
	}
};

function createCardRestaurant() {
	const card = `
	<a class="card card-restaurant">
		<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title">Пицца плюс</h3>
				<span class="card-tag tag">50 мин</span>
			</div>
			<div class="card-info">
				<div class="rating">
					4.5
				</div>
				<div class="price">От 900 ₽</div>
				<div class="category">Пицца</div>
			</div>
		</div>
	</a>
	`;
	cardsRestaurants.insertAdjacentHTML('beforeend', card);
};


close.addEventListener("click", toggleModal);
logo.addEventListener('click', function() {
	containerPromo.classList.remove('hide');
	restaurants.classList.remove('hide');
	menu.classList.add('hide');
	}
);
cancel.addEventListener("click", toggleModal);
cartButton.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', checkAuth);

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();



