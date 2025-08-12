const fileName = document.getElementById("file-name").innerText;

const img = document.getElementById("img");

const clock = document.querySelector(`.clock`);
const clockColor = document.querySelector(`.clock-color`);
const clockPosition = document.querySelector(`.clock-position`);
const defaultColor = "#31dd3c";

const submit = document.getElementById(`submitBtn`);

// Retrieving the name of the previously (if any) selected image
function retrieveName() {
	fileName = localStorage.getItem("name") || "None";
}

// Displaying the name of the selected image
function imgName(e) {
	fileName = e.target.files[0]?.name || "None";
}

// Toggling clock properties if needed
function toggleClockProperties() {
	document.querySelectorAll(".clock-property").forEach((e) => e.classList.toggle("hide"));
}

// On submit saving the details in local storage
function onSubmit(e) {
	e.preventDefault();

	if (!img.files[0]) return;

	const reader = new FileReader();
	reader.onload = function () {
		localStorage.setItem("name", fileName);
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
	retrieveName();

	clockColor.value = defaultColor;

	img.addEventListener("change", imgName);
	clock.addEventListener("click", toggleClockProperties);
	submit.addEventListener("click", onSubmit);
}

Main();
