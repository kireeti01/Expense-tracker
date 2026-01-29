// Change initial transaction amounts to more realistic INR values
const initialTransactions = [
  { id: '1', amount: 450.50, category: 'Food & Dining', date: '2024-01-15', type: 'expense', description: 'Lunch at restaurant' },
  { id: '2', amount: 2875.75, category: 'Transportation', date: '2024-01-14', type: 'expense', description: 'Gas station' },
  { id: '3', amount: 120000.00, category: 'Salary', date: '2024-01-10', type: 'income', description: 'Monthly salary' },
  { id: '4', amount: 8999.00, category: 'Shopping', date: '2024-01-12', type: 'expense', description: 'New clothes' },
  { id: '5', amount: 1500.00, category: 'Food & Dining', date: '2024-01-05', type: 'expense', description: 'Groceries' },
]

// Update budgets to INR values
const initialBudgets = [
  { id: '1', categoryId: '1', limit: 15000, period: 'monthly', spent: 1950.5 },
  { id: '2', categoryId: '2', limit: 10000, period: 'monthly', spent: 2875.75 },
  { id: '3', categoryId: 'all', limit: 50000, period: 'monthly', spent: 13324.25 },
]