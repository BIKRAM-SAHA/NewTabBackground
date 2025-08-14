const fileName = document.getElementById("file-name");

const img = document.getElementById("img");

const clock = document.querySelector(`.clock`);
const clockColor = document.querySelector(`.clock-color`);
const defaultColor = "#31dd3c";
const clockPosition = document.querySelector(`.clock-position`);
const clockProperties = document.querySelectorAll(".clock-property");

const submit = document.querySelector(`.submitBtn`);

// Retrieving the name of the previously (if any) selected image
function retrieveNameAndSetURL() {
	fileName.innerText = localStorage.getItem("name") ?? "None";
	// img.files[0] = localStorage.getItem("bgimg") ?? null;
	// console.log(img.files[0]);
}

// Retrieving all of the data related to the clock (if any)
function retrieveClockData() {
	const clockData = JSON.parse(localStorage.getItem("clock")) ?? {};
	if (clockData.value == "true") {
		clock.checked = true;
		clockProperties.forEach((e) => e.classList.toggle("hide"));
		clockColor.value = clockData.color;
		clockPosition.value = clockData.position;
	}
}

// Displaying the name of the selected image
function imgName(e) {
	fileName.innerText = e.target.files[0]?.name || "None";
}

// Toggling clock properties if needed
function toggleClockProperties() {
	clockProperties.forEach((e) => e.classList.toggle("hide"));
}

// On submit saving the details in local storage
function onSubmit(e) {
	e.preventDefault();

	if (!img.files[0]) return;

	const reader = new FileReader();
	reader.onload = function () {
		localStorage.setItem("name", fileName.innerText);
		localStorage.setItem("bgimg", reader.result);

		const clockObj = {
			color: clock.checked ? clockColor.value : "#87CBEB",
			position: clock.checked ? clockPosition.value : "center-center",
			value: `${clock.checked}`,
		};
		localStorage.setItem("clock", JSON.stringify(clockObj));
	};
	reader.readAsDataURL(img.files[0]);
}

// Main function
function Main() {
	retrieveNameAndSetURL();
	retrieveClockData();

	img.addEventListener("change", imgName);
	clock.addEventListener("click", toggleClockProperties);
	submit.addEventListener("click", onSubmit);
}

Main();
