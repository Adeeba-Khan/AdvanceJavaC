// Initialize expenses from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.addEventListener('DOMContentLoaded', renderExpenses);

function addExpense() {
    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;

    if (amount && description && category) {
        const expense = { amount, description, category };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    } else {
        alert('Please fill in all fields');
    }
}

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.classList.add('expense-item');
        li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}
            <button onclick="deleteExpense(${index})">Delete Expense</button>
            <button onclick="editExpense(${index})">Edit Expense</button>`;
        expenseList.appendChild(li);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expenseDescription').value = expense.description;
    document.getElementById('expenseCategory').value = expense.category;

    deleteExpense(index);
}
