'use strict'

const cartButton = document.querySelector("#cart-button"),
	modal = document.querySelector(".modal"),
	close = document.querySelector(".close"),
	cancel = document.querySelector(".clear-cart"),
	buttonAuth = document.querySelector(".button-auth"),
	modalAuth = document.querySelector(".modal-auth"),
	closeAuth = document.querySelector(".close-auth"),
	logInForm = document.querySelector("#logInForm"),
	loginInput = document.querySelector("#login"),
	userName = document.querySelector(".user-name"),
	buttonOut = document.querySelector(".button-out"),
	cardsRestaurants = document.querySelector(".cards-restaurants"),
	containerPromo = document.querySelector(".container-promo"),
	restaurants = document.querySelector(".restaurants"),
	menu = document.querySelector(".menu"),
	logo = document.querySelector(".logo"),
	cardsMenu = document.querySelector(".cards-menu"),
	restaurantTitle = document.querySelector(".restaurant-title"),
	minPrice = document.querySelector(".price"),
	category = document.querySelector(".category"),
	rating = document.querySelector(".rating");

let login = localStorage.getItem('nickname');

const getData = async function(url) {

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url},
			статус ошибки ${response.status}!`);
	}

	return await response.json();
};

function toggleModal() {
	modal.classList.toggle("is-open");
}
function toggleModalAuth() {
	modalAuth.classList.toggle("is-open");
};

function returnMain() {
	containerPromo.classList.remove('hide');
	restaurants.classList.remove('hide');
	menu.classList.add('hide');
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
		returnMain();
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
	} else {
		notAuthorized();
	}
};

function createCardRestaurant(restaurant) {
	const { image, kitchen, name, price, 
		products, stars, 
		time_of_delivery: timeOfDelivery 
	} = restaurant;

	const card = `
	<a class="card card-restaurant" data-products="${products}"
	data-info="${[name, price, stars, kitchen]}">
		<img src="${image}" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title">${name}</h3>
				<span class="card-tag tag">${timeOfDelivery} мин</span>
			</div>
			<div class="card-info">
				<div class="rating">
					${stars}
				</div>
				<div class="price">От ${price} ₽</div>
				<div class="category">${kitchen}</div>
			</div>
		</div>
	</a>
	`;
	cardsRestaurants.insertAdjacentHTML('beforeend', card);
};

function createCardGood(goods) {

	const { description, id, image, name, price } = goods;

	const card = document.createElement('div');
	card.className = "card";

	card.insertAdjacentHTML('beforeend',`
		<img src="${image}" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">${name}</h3>
			</div>
			<!-- /.card-heading -->
			<div class="card-info">
				<div class="ingredients">${description}
				</div>
			</div>
			<!-- /.card-info -->
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
				<strong class="card-price-bold">${price} ₽</strong>
			</div>
	`);
	cardsMenu.insertAdjacentElement('beforeend', card);
};

function openGoods(event) {
	const target = event.target;

	if (login) {

		const restaurant = target.closest('.card-restaurant');

		if (restaurant) {
			const info = restaurant.dataset.info.split(',');
			const [ name, price, stars, kitchen ] = info;

			containerPromo.classList.add('hide');
			restaurants.classList.add('hide');
			menu.classList.remove('hide');
			cardsMenu.textContent = '';

			restaurantTitle.textContent = name;
			category.textContent = kitchen;
			minPrice.textContent = `От ${price} ₽`;
			rating.textContent = stars;

			getData(`./db/${restaurant.dataset.products}`).then(function(data) {
				data.forEach(createCardGood);
			});
		};
	} else {
			toggleModalAuth();
		};
};

function init() {
	getData('./db/partners.json').then(function(data) {
		data.forEach(createCardRestaurant);
	});

	close.addEventListener("click", toggleModal);
	logo.addEventListener('click', function() {
		containerPromo.classList.remove('hide');
		restaurants.classList.remove('hide');
		menu.classList.add('hide');
		}
	);
	cancel.addEventListener("click", toggleModal);
	cartButton.addEventListener("click", toggleModal);
	cardsRestaurants.addEventListener('click', openGoods);

	checkAuth();



	new Swiper('.swiper-container', {
		loop: true,
		autoplay: {
			delay: 5000
		},
	})
};

init();

