const fileName = document.getElementById("file-name");

const img = document.getElementById("img");

const clock = document.querySelector(`.clock`);
const clockColor = document.querySelector(`.clock-color`);
const clockPosition = document.querySelector(`.clock-position`);
const clockProperties = document.querySelectorAll(".clock-property");

const submit = document.querySelector(`.submitBtn`);

// Converting Base64 to File type
function dataURLtoFile(dataURL, fileName) {
	let arr = dataURL.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[arr.length - 1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, { type: mime });
}

// Imitating a Drop Event on img to set the required data
function imitateDropEventOnImg() {
	const dataURL = localStorage.getItem("bgimg");
	const file = dataURLtoFile(dataURL, fileName.innerText);
	const dataTransfer = new DataTransfer();

	// Add your file to the file list of the object
	dataTransfer.items.add(file);

	// Save the file list to a new variable
	const fileList = dataTransfer.files;

	// Set your input `files` to the file list
	img.files = fileList;
	img.dispatchEvent(new Event("change", { bubbles: true }));
}

// Retrieving the name of the previously (if any) selected image and setting the img.files[0] as the previously selected file
function retrieveNameAndSetURL() {
	fileName.innerText = localStorage.getItem("name") ?? "None";

	if (fileName.innerText === "None") return;

	imitateDropEventOnImg();
}

// Retrieving all of the data related to the clock (if any)
function retrieveClockData() {
	const clockData = JSON.parse(localStorage.getItem("clock")) ?? {};
	if (clockData.value === "true") {
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
