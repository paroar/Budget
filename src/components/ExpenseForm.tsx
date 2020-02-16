import React from "react";
import { MdSend } from "react-icons/md";

type ExpenseFormProps = {
  addItemBtn: (event: React.FormEvent<HTMLFormElement>) => void;
  charge: string;
  amount: number | string;
  handleCharge: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitDisabled: boolean;
  edit: boolean;
};

const ExpenseForm: React.FC<ExpenseFormProps> = props => {
  const {
    addItemBtn,
    charge,
    amount,
    handleCharge,
    handleAmount,
    isSubmitDisabled,
    edit
  } = props;

  return (
    <form onSubmit={addItemBtn}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            placeholder="e.g.rent"
            className="form-control"
            id="charge"
            name="charge"
            value={charge}
            onChange={e => handleCharge(e)}
          />
        </div>
      </div>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            placeholder="e.g.100"
            className="form-control"
            id="amount"
            name="amount"
            min={0}
            value={amount}
            onChange={e => handleAmount(e)}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`btn ${isSubmitDisabled ? "btn-disabled" : ""}`}
        disabled={isSubmitDisabled}
      >
        {edit ? "edit" : "submit"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
