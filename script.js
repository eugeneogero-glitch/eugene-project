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
// 1. Select the form element from your HTML
const saleForm = document.getElementById('add-sale-form');

// 2. Listen for the 'submit' event on the form
saleForm.addEventListener('submit', (event) => {
    // Prevent the default browser behavior (which reloads the page)
    event.preventDefault();

    // 3. Grab the input values using their IDs
    const customer = document.getElementById('customer').value;
    const itemDescription = document.getElementById('item-description').value;
    const amount = document.getElementById('amount').value;

    // 4. For now, log the object to the console to verify it works
    console.log("New Transaction Data:", { customer, itemDescription, amount });

    // 5. Reset the form fields and close the modal automatically
    saleForm.reset();
    modal.style.display = 'none';
});