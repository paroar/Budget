import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

type expenseListProps = {
  expenses: {
    id: string;
    charge: string;
    amount: number | string;
  }[];
  clearExpenses: () => void;
  clearExpense: (id:string) => void;
  handleEdit: (id:string) => void;
};

const ExpenseList: React.FC<expenseListProps> = (props) => {
  const {expenses, clearExpense, clearExpenses, handleEdit} = props;
  return (
    <>
      <ul className="list">
        {expenses.map(e => (
          <Item expense={e} key={e.id} clearExpense={clearExpense} handleEdit={handleEdit}/>
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearExpenses}>
          clear expenses <MdDelete className="btn-icon"/>
        </button>
      )}
    </>
  );
};

export default ExpenseList;
