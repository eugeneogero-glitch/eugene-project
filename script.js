const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modal = document.querySelector('.modal');
const ledgerTableBody = document.querySelector('.ledger-table tbody');

let transactions = [];

function fetchTransactions() {
    fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data => {
            transactions = data;
            renderTransactions();
        })
        .catch(error => console.error('Error fetching transactions:', error));
}

function renderTransactions() {
  ledgerTableBody.innerHTML = '';

  transactions.forEach(tx => {
    const row = document.createElement('tr');

    const customerText = tx.itemDescription
      ? `${tx.customer} (${tx.itemDescription})`
      : tx.customer;

    row.innerHTML = `
      <td>${tx.time}</td>
      <td>${customerText}</td>
      <td>${tx.type}</td>
      <td>KES ${Number(tx.amount).toLocaleString()}</td>
      <td><span class="badge ${tx.status === 'Paid' ? 'status-paid' : 'status-unpaid'}">${tx.status}</span></td>
      <td><button class="btn-delete" onclick="deleteTransaction(${tx.id})">Delete</button></td>
    `;

    ledgerTableBody.appendChild(row);
  });

  updateDashboard();
}

function deleteTransaction(id) {
    fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchTransactions();
        }
    })
    .catch(error => console.error('Error deleting transaction:', error));
}

fetchTransactions();

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const saleForm = document.getElementById('add-sale-form');

saleForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const customer = document.getElementById('customer').value;
    const itemDescription = document.getElementById('item-description').value;
    const amount = Number(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const status = document.getElementById('status').value;

    const newTx = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customer,
        itemDescription,
        amount,
        type,
        status
    };

    fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTx)
    })
    .then(response => response.json())
    .then(() => {
        fetchTransactions();
        saleForm.reset();
        modal.style.display = 'none';
    })
    .catch(error => console.error('Error adding transaction:', error));
});

function updateDashboard() {
    let totalCashIn = 0;
    let totalPending = 0;

    transactions.forEach(tx => {
        const amount = Number(tx.amount) || 0;
        if (tx.status === 'Paid') {
            totalCashIn += amount;
        } else if (tx.status === 'Unpaid') {
            totalPending += amount;
        }
    });

    const netBalance = totalCashIn - totalPending;

    document.getElementById('net-balance').textContent = `KES ${netBalance.toLocaleString()}`;
    document.getElementById('cash-in').textContent = `KES ${totalCashIn.toLocaleString()}`;
    document.getElementById('pending-debts').textContent = `KES ${totalPending.toLocaleString()}`;
}