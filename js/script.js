// Find the date input fields on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Set up the date inputs using the setupDateInputs function
setupDateInputs(startInput, endInput);

// Your NASA API key (replace 'YOUR_API_KEY' with your actual key)
const apiKey = 'NBYUMmoJbW5KqDLbGXIyPc0Tg3sMAFRTS0S2i5cO';

// Function to fetch data from NASA's APOD API
function fetchSpaceImages() {
  // Get the selected start and end dates from the inputs
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Build the API URL with the selected dates and your API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  // Find the container where images will be displayed
  const imageContainer = document.getElementById('imageContainer');

  // Display a loading message
  imageContainer.innerHTML = `<p>🔄 Loading space photos…</p>`;

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      // Call a function to display the fetched images
      displayImages(data);
    })
    .catch(error => {
      console.error('Error fetching data from NASA API:', error);
      // Display an error message in the container
      imageContainer.innerHTML = `<p>❌ Failed to load space photos. Please try again later.</p>`;
    });
}

// Function to display the fetched images on the webpage
function displayImages(images) {
  // Find the container where images will be displayed
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = ''; // Clear any existing content

  // Loop through the images and create HTML for each
  images.forEach(image => {
    // Create a div to hold the image and its details
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-item';

    // Add the image
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.title;
    imageDiv.appendChild(img);

    // Add the title
    const title = document.createElement('h3');
    title.textContent = image.title;
    imageDiv.appendChild(title);

    // Create a "More Info" button
    const moreInfoButton = document.createElement('button');
    moreInfoButton.textContent = 'More Info';
    imageDiv.appendChild(moreInfoButton);

    // Create a hidden description element
    const description = document.createElement('p');
    description.textContent = image.explanation;
    description.style.display = 'none'; // Hide the description initially
    imageDiv.appendChild(description);

    // Add an event listener to the button to toggle the description
    moreInfoButton.addEventListener('click', () => {
      description.style.display = description.style.display === 'none' ? 'block' : 'none';
    });

    // Add the image div to the container
    imageContainer.appendChild(imageDiv);
  });
}

// Add event listeners to fetch images when the date range changes
startInput.addEventListener('change', fetchSpaceImages);
endInput.addEventListener('change', fetchSpaceImages);

// Fetch images for the default date range on page load
fetchSpaceImages();

// Set up the date pickers with:
// - A start date 9 days ago
// - Today as the end date
// - Makes sure you can't pick dates before 1995