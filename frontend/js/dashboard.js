
const displayPlane = document.getElementById('displayPlane');
const destination = localStorage.getItem("destination");
const date = localStorage.getItem("date");

document.getElementById('showDestination').textContent = (`${destination}`);
document.getElementById('showDate').textContent = (`${date}`);

