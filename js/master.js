let backgroundOption = true;

let backgroundInterval;

let mainColors = localStorage.getItem("color-option");

if (mainColors !== null){

	document.documentElement.style.setProperty("--main-color", mainColors);


	document.querySelectorAll(".colors-list li").forEach(element => {

		element.classList.remove("active");

		if (element.dataset.color === mainColors){
			element.classList.add("active");
		}
	});
}

let backgroundLocalItem = localStorage.getItem("backgrount-option");

if (backgroundLocalItem !== null){

	if(backgroundLocalItem == "true"){
		backgroundOption = true;
	}
	else{
		backgroundOption = false;
	}

	document.querySelectorAll(".random-backgrounds span").forEach(element => {
		element.classList.remove("active");
	});

	if(backgroundLocalItem === "true"){
		document.querySelector(".random-backgrounds .yes").classList.add("active");
	}
	else{
		document.querySelector(".random-backgrounds .no").classList.add("active");
	}
}


document.querySelector(".toggole-settings").onclick = function() {

	document.querySelector('.toggole-settings i').classList.toggle('fa-spin');

	document.querySelector('.settings-box').classList.toggle('opened');
};

const colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach(li => {
	li.addEventListener('click', (e) => {

		localStorage.setItem('color-option', e.target.dataset.color);

		document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"));

		e.target.parentElement.querySelectorAll(".active").forEach(element => {
			element.classList.remove("active");
		});

		e.target.classList.add("active");
	});
});

const backgroundList = document.querySelectorAll(".random-backgrounds span");

backgroundList.forEach(span => {
	span.addEventListener('click', (e) => {

		e.target.parentElement.querySelectorAll(".active").forEach(element => {
			element.classList.remove("active");
		});

		e.target.classList.add("active");

		if(e.target.dataset.background === "yes"){
			backgroundOption = true;
			randomizeImages();	
			localStorage.setItem("backgrount-option", "true");
		}
		else{
			backgroundOption = false;
			clearInterval(backgroundInterval);
			localStorage.setItem("backgrount-option", "false");
		}
	});
});

let landingPage = document.querySelector('.landing-page');

let imagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

function randomizeImages(){

	if(backgroundOption === true){

		backgroundInterval = setInterval(() => {

			let randomNumber = Math.floor(Math.random() * imagesArray.length);
		
			landingPage.style.backgroundImage = `url("../Images/Landing-${imagesArray[randomNumber]}")`;

		}, 5000);
	}
}

randomizeImages();


let ourSkills = document.querySelector(".skills")

window.onscroll = function() {

	let skillsOffsetTop = ourSkills.offsetTop;

	let skillsOuterHeight = ourSkills.offsetHeight;

	let windowHeight = this.innerHeight; // this = window

	let windowScrollTop = this.scrollY;

	if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 300){
		
		let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

		allSkills.forEach(skill => {

			skill.style.width = skill.dataset.progress;
		});
		
	}

};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(image => {

	image.addEventListener("click", (e) => {

		let overlay = document.createElement("div");

		overlay.className = "popup-overlay";

		document.body.appendChild(overlay);

		let popupBox = document.createElement("div");

		popupBox.className = 'popup-box';

		if (image.alt != null){

			let imageHeading = document.createElement("h3");

			let imageText = document.createTextNode(image.alt);

			imageHeading.appendChild(imageText);

			popupBox.appendChild(imageHeading);

		}

		let popupImage = document.createElement('img');

		popupImage.src = image.src;

		popupBox.appendChild(popupImage);

		document.body.appendChild(popupBox);

		let closeButton = document.createElement("span");

		let closeButtonText = document.createTextNode("X");

		closeButton.appendChild(closeButtonText);

		closeButton.className = "close-button";

		popupBox.appendChild(closeButton);

	});

});

document.addEventListener("click", (e) => {

	if(e.target.className == 'close-button'){

		e.target.parentElement.remove();
		
		document.querySelector(".popup-overlay").remove();
	}

});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

	elements.forEach(ele => {

		ele.addEventListener('click', (e) => {
	
			e.preventDefault();
	
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);