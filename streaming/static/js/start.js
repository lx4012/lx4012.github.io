
function resetServices(loading) {

	if ( loading ) {

		loading = document.createElement("h2");
		loading.setAttribute("class", "headline-2");
		loading.innerHTML = "Loading..."

		document.getElementById("accounts-container").replaceChildren(loading);
	}
	else
	{
		document.getElementById("accounts-container").replaceChildren();
	}
}

function addDisabledService(filename){

	let image = new Image();
	image.setAttribute("class", "account-image");
	image.style.backgroundImage = 'url("static/assets/' + filename + '")';

	let account = document.createElement("div");
	account.setAttribute("class", "account account-image-disabled");
	account.appendChild(image);

	let container = document.getElementById("accounts-container");
	container.appendChild(account);
}

function addSpecialService(filename){

	let image = new Image();
	image.setAttribute("class", "account-image");
	image.style.backgroundImage = 'url("static/assets/' + filename + '")';

	let account = document.createElement("a");
	account.setAttribute("href", "#");
	account.setAttribute("class", "account");
	account.appendChild(image);
	account.onclick = LetsGo;

	let container = document.getElementById("accounts-container");
	container.appendChild(account);
}

function addService(filename, URL){

	let image = new Image();
	image.setAttribute("class", "account-image");
	image.style.backgroundImage = 'url("static/assets/' + filename + '")';

	let account = document.createElement("a");
	account.setAttribute("href", URL);
	account.setAttribute("class", "account");
	account.appendChild(image);

	let container = document.getElementById("accounts-container");
	container.appendChild(account);
}

function addRegularServices() {

	addService("hbo.jpg", "https://play.hbomax.com/page/urn:hbo:page:home");
	addService("prime.webp", "https://www.primevideo.com/");
	addService("disney.jpg", "https://www.disneyplus.com/home");
	addService("star.png", "https://www.starplus.com/home");
	addService("movistar.png", "https://movistartv.cl/tv-guide/now");
}

const LetsGo = function () {
	
	const xhttp = new XMLHttpRequest();
	xhttp.timeout = 1000;
	xhttp.onload = function() {

		resetServices();

		if ( this.responseText == "1" ) {

			location.href = "https://www.netflix.com/browse";
		}
		else
		{
			addDisabledService("netflix.png");
		}

		addRegularServices();
    }
	xhttp.onerror = function () {

		resetServices();
		addDisabledService("netflix.png");
		addRegularServices();
	}
	xhttp.ontimeout = function () {

		resetServices();
		addDisabledService("netflix.png");
		addRegularServices();
	}
	xhttp.open("GET", "https://elementalvision.ddns.net/streaming/test.php", true);
	xhttp.send();
}

const CheckServiceStatus = function () {

	resetServices(true);

	const xhttp = new XMLHttpRequest();
	xhttp.timeout = 1000;
	xhttp.onload = function() {

		resetServices();

		if ( this.responseText == "1" ) {

			addSpecialService("netflix.png");
		}
		else
		{
			addDisabledService("netflix.png");
		}

		addRegularServices();
    }
	xhttp.onerror = function () {

		resetServices();
		addDisabledService("netflix.png");
		addRegularServices();
	}
	xhttp.ontimeout = function () {

		resetServices();
		addDisabledService("netflix.png");
		addRegularServices();
	}
	xhttp.open("GET", "https://elementalvision.ddns.net/streaming/test.php?rd=" + Date.now(), true);
	xhttp.send();
}

window.onload = CheckServiceStatus;
