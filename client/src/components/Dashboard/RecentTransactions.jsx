import React from 'react'
import './RecentTransactions.css'

const RecentTransactions = ({ transactions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': '#4CAF50',
      'Transportation': '#2196F3',
      'Shopping': '#9C27B0',
      'Salary': '#8BC34A'
    }
    return colors[category] || '#64748b'
  }

  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <div 
                className="transaction-icon"
                style={{ backgroundColor: getCategoryColor(transaction.category) }}
              >
                {transaction.category.charAt(0)}
              </div>
              <div className="transaction-details">
                <span className="transaction-category">{transaction.category}</span>
                <span className="transaction-date">{formatDate(transaction.date)}</span>
                <span className="transaction-description">{transaction.description}</span>
              </div>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions