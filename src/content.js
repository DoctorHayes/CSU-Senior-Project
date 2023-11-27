// content.js
loadVerseOfTheDay();

function loadVerseOfTheDay() {
  // Your code to load and display the Bible Gateway VOTD on the webpage
  // Example: insert the VOTD into the page's DOM
  fetch("https://www.biblegateway.com/votd/get/?format=html&version=ESV")
    .then((response) => response.text())
    .then((data) => {
      // Create a container for the VOTD
      var votdContainer = document.createElement("div");
      votdContainer.innerHTML = data;

      // Find a suitable location in the webpage's DOM to insert the VOTD
      // For example, insert it at the top of the body
      var body = document.querySelector("body");
      body.insertBefore(votdContainer, body.firstChild);
    })
    .catch((error) => {
      console.error("Error loading VOTD:", error);
    });
}


console.log('listening for commands')