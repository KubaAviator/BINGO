const images = Array.from({ length: 36 }, (_, i) => `images/image${i + 1}.png`);
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");

let spinning = false;
let lastSelectedIndex = null; // Store the index of the last selected image

// Dynamically add images to the wheel
function createWheel() {
  wheel.innerHTML = ""; // Clear the wheel before recreating
  images.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    wheel.appendChild(img);
  });
}

createWheel();

// Spin functionality
spinButton.addEventListener("click", () => {
  if (spinning) return;
  if (images.length === 0) {
    resultDiv.innerText = "All images have been selected!";
    return;
  }

  spinning = true;

  // If there is a previously selected image, remove it now
  if (lastSelectedIndex !== null) {
    images.splice(lastSelectedIndex, 1); // Remove the image from the array
    createWheel(); // Recreate the wheel with remaining images
    lastSelectedIndex = null;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
  lastSelectedIndex = randomIndex; // Store the current selected index

  const spinDuration = 3000; // 3 seconds
  const rotations = 5; // Number of full rotations
  const totalImages = images.length;
  const anglePerImage = 360 / totalImages;
  const angle = randomIndex * anglePerImage + rotations * 360;

  let currentIndex = 0;

  // Animate the spinning effect
  const interval = setInterval(() => {
    const imgs = document.querySelectorAll("#wheel img");
    imgs.forEach((img, index) => {
      img.classList.remove("active");
      if (index === currentIndex) img.classList.add("active");
    });
    currentIndex = (currentIndex + 1) % totalImages;
  }, 100); // Quick cycling effect

  wheel.style.transition = `transform ${spinDuration}ms ease-out`;
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    clearInterval(interval); // Stop the spinning effect
    resultDiv.innerText = `Selected Image: ${selectedImage}`;
    spinning = false;
  }, 3000);
});
