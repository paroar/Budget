import React from 'react'

type expenseItemProps = {
    expense: {
        id: string;
        charge: string;
        amount: number;
    }
}

const ExpenseItem:React.FC<expenseItemProps> = ({expense}) => {
    return (
        <div>
            {expense.charge}
            {expense.amount}
        </div>
    )
}

export default ExpenseItem
