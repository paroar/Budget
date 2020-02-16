import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

type expenseItemProps = {
  expense: {
    id: string;
    charge: string;
    amount: number | string;
  };
  clearExpense: (id: string) => void;
  handleEdit: (id: string) => void;
};

const ExpenseItem: React.FC<expenseItemProps> = props => {
  const { expense, clearExpense, handleEdit } = props;
  const { id, charge, amount } = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div className="">
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => clearExpense(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
