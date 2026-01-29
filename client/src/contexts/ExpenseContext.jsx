import React, { createContext, useState, useContext, useEffect } from 'react'

const ExpenseContext = createContext()

export const useExpense = () => useContext(ExpenseContext)

export const ExpenseProvider = ({ children }) => {
  // Initial categories for dashboard
  const initialCategories = [
    { id: '1', name: 'Food & Dining', color: '#4CAF50', type: 'expense' },
    { id: '2', name: 'Transportation', color: '#2196F3', type: 'expense' },
    { id: '3', name: 'Shopping', color: '#9C27B0', type: 'expense' },
    { id: '4', name: 'Salary', color: '#8BC34A', type: 'income' },
  ]

  // Initial transactions for dashboard
  const initialTransactions = [
    { id: '1', amount: 45.50, category: 'Food & Dining', date: '2024-01-15', type: 'expense', description: 'Lunch at restaurant' },
    { id: '2', amount: 28.75, category: 'Transportation', date: '2024-01-14', type: 'expense', description: 'Gas station' },
    { id: '3', amount: 1200.00, category: 'Salary', date: '2024-01-10', type: 'income', description: 'Monthly salary' },
    { id: '4', amount: 89.99, category: 'Shopping', date: '2024-01-12', type: 'expense', description: 'New clothes' },
    { id: '5', amount: 150.00, category: 'Food & Dining', date: '2024-01-05', type: 'expense', description: 'Groceries' },
  ]

  // Initial budgets for dashboard
  const initialBudgets = [
    { id: '1', categoryId: '1', limit: 500, period: 'monthly', spent: 195.5 },
    { id: '2', categoryId: '2', limit: 300, period: 'monthly', spent: 28.75 },
    { id: '3', categoryId: 'all', limit: 2000, period: 'monthly', spent: 314.24 },
  ]

  const [categories] = useState(initialCategories)
  const [transactions] = useState(initialTransactions)
  const [budgets] = useState(initialBudgets)

  // Calculate totals
  const getTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      income,
      expenses,
      balance: income - expenses
    }
  }

  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  const getCategoryTotals = () => {
    const categoryTotals = {}
    
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0
        }
        categoryTotals[transaction.category] += transaction.amount
      }
    })
    
    return Object.entries(categoryTotals).map(([name, total]) => ({
      name,
      total
    }))
  }

  const getMonthlyData = () => {
    const monthlyData = {
      '2024-01': { income: 1200, expenses: 314.24 }
    }
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data
    }))
  }

  return (
    <ExpenseContext.Provider value={{
      categories,
      transactions,
      budgets,
      getTotals,
      getRecentTransactions,
      getCategoryTotals,
      getMonthlyData
    }}>
      {children}
    </ExpenseContext.Provider>
  )
}