document.addEventListener('DOMContentLoaded', function () {
    const expenseAmount = document.getElementById('expenseAmount');
    const expenseDescription = document.getElementById('expenseDescription');
    const expenseCategory = document.getElementById('expenseCategory');
    const addExpenseButton = document.getElementById('addExpense');
    const expenseList = document.getElementById('expenseList');

    // Load expenses from local storage on page load
    loadExpenses();

    // Add Expense
    addExpenseButton.addEventListener('click', function () {
        const amount = expenseAmount.value;
        const description = expenseDescription.value;
        const category = expenseCategory.value;

        if (amount && description && category) {
            const expense = {
                id: Date.now(),
                amount,
                description,
                category,
            };

            addExpenseToList(expense);
            saveExpenseToLocalStorage(expense);
        }
    });

    // Add Expense to List
    function addExpenseToList(expense) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${expense.amount} - ${expense.description} - ${expense.category}
            <span>
                <button class="btn btn-sm btn-warning edit-expense mr-2">Edit</button>
                <button class="btn btn-sm btn-danger delete-expense">Delete</button>
            </span>
        `;
        listItem.dataset.id = expense.id;
        expenseList.appendChild(listItem);

        // Edit Expense
        listItem.querySelector('.edit-expense').addEventListener('click', function () {
            editExpense(expense, listItem);
        });

        // Delete Expense
        listItem.querySelector('.delete-expense').addEventListener('click', function () {
            deleteExpense(expense.id, listItem);
        });
    }

    // Edit Expense
    function editExpense(expense, listItem) {
        expenseAmount.value = expense.amount;
        expenseDescription.value = expense.description;
        expenseCategory.value = expense.category;

        deleteExpense(expense.id, listItem); // Remove existing entry to avoid duplication
    }

    // Delete Expense
    function deleteExpense(id, listItem) {
        expenseList.removeChild(listItem);
        deleteExpenseFromLocalStorage(id);
    }

    // Save Expense to Local Storage
    function saveExpenseToLocalStorage(expense) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Load Expenses from Local Storage
    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpenseToList(expense));
    }

    // Delete Expense from Local Storage
    function deleteExpenseFromLocalStorage(id) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
});
