//imgs have an id so it is defined in JS execution environment by default
clock = document.querySelector(`.clock`);
clockColor = document.querySelector(`.clock-color`);
clockPosition = document.querySelector(`.clock-position`);
defaultColor = '#31dd3c';
clockColor.value = defaultColor;

submit = document.getElementById(`submitBtn`);

clock.addEventListener('click', function () {
	clockProperties = document.getElementsByClassName('clock-property');
	clockProperties = Array.from(clockProperties);
	clockProperties.forEach((elem) => {
		elem.classList.toggle('hide');
	});
});

submit.addEventListener('click', function (e) {
	e.preventDefault();
	reader = new FileReader();
	reader.onload = function () {
        localStorage.name = fileName.innerText;
		localStorage.bgimg = reader.result;

		clockObj = {};
		clockObj.color = '#87CBEB';
		clockObj.position = 'center-center';
		clockObj.value = `${clock.checked}`;

		if (clock.checked) {
			clockObj.color = clockColor.value;
			clockObj.position = clockPosition.value;
		}
		localStorage.clock = JSON.stringify(clockObj);
	};
	if (img.files[0]) {
		reader.readAsDataURL(img.files[0]);
	}
});

//taking name of choosen file and displaying
let fileName = document.getElementById('file-name');
img.addEventListener('change', function (event) {
	let upload = event.target.files[0].name;
	fileName.innerText = upload;
});

function onload(){
    retrieve()
}

function retrieve(){
    
}