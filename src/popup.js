document.addEventListener("DOMContentLoaded", function () {
  // Load the VOTD when the popup is opened
  loadVerseOfTheDay();
});

function loadVerseOfTheDay() {
  // Your code to load the Bible Gateway VOTD here
  // Example: fetch and display the VOTD from the external source
  fetch("https://www.biblegateway.com/votd/get/?format=html&version=ESV")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("votdContainer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading VOTD:", error);
    });
}  

console.log('settings loaded')
