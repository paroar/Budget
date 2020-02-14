import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

type expenseListProps = {
  expenses: {
    id: string;
    charge: string;
    amount: number;
  }[];
};

const ExpenseList: React.FC<expenseListProps> = ({ expenses }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(e => (
          <Item expense={e} key={e.id} />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn">
          clear expenses <MdDelete className="btn-icon"/>
        </button>
      )}
    </>
  );
};

export default ExpenseList;
