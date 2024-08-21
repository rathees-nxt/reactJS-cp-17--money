import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  toUpdateTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  toUpdateAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  toUpdateType = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updateTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({transactionList: updateTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrasaction => eachTrasaction.optionId === optionId,
    )
    console.log(typeOption)
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      inputTitle: '',
      inputAmount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenditure = () => {
    const {transactionList} = this.state
    let expenditureAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenditureAmount += eachTransaction.amount
      }
    })
    return expenditureAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let expenditureAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenditureAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expenditureAmount
    return balanceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  render() {
    const {inputTitle, inputAmount, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenditureAmount = this.getExpenditure()

    return (
      <div className="app-container">
        <div className="header-MoneyManager-container">
          <div className="header-container">
            <h1 className="header-heading">Hi, Richard</h1>
            <p className="header-para">
              Welcome back to your
              <span className="header-span"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenditureAmount={expenditureAmount}
          />
          <div className="footer-moneydetails-container">
            <form
              className="transaction-container"
              onSubmit={this.onAddTransaction}
            >
              <h1 className="middle-heading">Add transaction</h1>
              <label htmlFor="title" className="title-heading">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="TITLE"
                onChange={this.toUpdateTitle}
                value={inputTitle}
              />
              <label htmlFor="amount" className="title-heading">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                placeholder="AMOUNT"
                onChange={this.toUpdateAmount}
                value={inputAmount}
              />
              <label htmlFor="select" className="title-heading">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.toUpdateType}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="history-table-container">
                <ul className="history-list-container">
                  <li className="history-item-container">
                    <p className="table-header">Title</p>
                    <p className="table-header">Amount</p>
                    <p className="table-header">Type</p>
                  </li>

                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
