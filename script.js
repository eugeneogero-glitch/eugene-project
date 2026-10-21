// 1. Select your modal and trigger buttons 
// (Make sure to match these IDs/classes to your actual HTML elements)
const openModalBtn = document.getElementById('open-modal-btn'); 
const closeModalBtn = document.getElementById('close-modal-btn'); 
const modal = document.querySelector('.modal');
// Grab table body element
const ledgerTableBody = document.querySelector('.ledger-table tbody');

// Load existing transactions from localStorage or initialize empty array
let transactions = JSON.parse(localStorage.getItem('dukaTransactions')) || [];

// Function to display transactions in the table
function renderTransactions() {
  ledgerTableBody.innerHTML = ''; // Clear hardcoded/old rows

  transactions.forEach((tx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tx.time}</td>
      <td>${tx.customer} (${tx.itemDescription})</td>
      <td>${tx.type}</td>
      <td>KES ${Number(tx.amount).toLocaleString()}</td>
      <td><span class="badge ${tx.status === 'Paid' ? 'status-paid' : 'status-unpaid'}">${tx.status}</span></td>
    `;
    ledgerTableBody.appendChild(row);
  });
}

// Initial render when the page loads
renderTransactions();

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

  // 3. Grab input values
  const customer = document.getElementById('customer').value;
  const itemDescription = document.getElementById('item-description').value;
  const amount = document.getElementById('amount').value;

  // Create new transaction object
  const newTx = {
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customer,
    itemDescription,
    amount,
    type: "Cash Sale",
    status: "Paid"
  };

  // 4. Save to array and localStorage
  transactions.push(newTx);
  localStorage.setItem('dukaTransactions', JSON.stringify(transactions));

  // 5. Update UI
  renderTransactions();

  // 6. Reset form & close modal
  saleForm.reset();
  modal.style.display = 'none';
});