// 1. Select your modal and trigger buttons 
// (Make sure to match these IDs/classes to your actual HTML elements)
const openModalBtn = document.getElementById('open-modal-btn'); 
const closeModalBtn = document.getElementById('close-modal-btn'); 
const modal = document.querySelector('.modal');

// 2. Open the modal (set to 'flex' so your CSS centering works!)
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// 3. Close the modal using the close button
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 4. Bonus: Close the modal if the user clicks anywhere on the dark backdrop outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});