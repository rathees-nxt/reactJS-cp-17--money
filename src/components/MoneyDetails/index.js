// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expenditureAmount} = props

  return (
    <div className="moneydetails-container">
      <div className="moneydetails-item-container balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="bal-image"
        />
        <div>
          <p className="details-txt">Your Balance</p>
          <p className="details-money" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="moneydetails-item-container income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="bal-image"
        />
        <div>
          <p className="details-txt">Your Income</p>
          <p className="details-money" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="moneydetails-item-container expenses">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="bal-image"
        />
        <div>
          <p className="details-txt">Your Expenses</p>
          <p className="details-money" data-testid="expensesAmount">
            Rs {expenditureAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
