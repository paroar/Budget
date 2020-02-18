import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

type initial = {
  id: string;
  charge: string;
  amount: number;
};

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

const App = () => {
  const [expenses, setExpenses] = useState<initial[]>(initialExpenses);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(NaN);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    text: "",
    count: 0
  });

  const actualCount = useRef<number>(0);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const addItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (charge !== "" && !isNaN(amount) && amount > 0) {
      if (edit) {
        const tempExpenses = expenses.map(e => {
          return e.id === id ? { ...e, charge, amount } : e;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert("success", "Item Edited", alert.count);
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert("success", "Item Added to the list", alert.count);
      }
      setCharge("");
      setAmount(NaN);
    }
  };

  const handleCharge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleAlert = (type: string, text: string, count: number) => {
    const c = count+1;
    actualCount.current++;
    setAlert({ show: true, type, text, count: c });
    time(c);
  };

  const time = (c:number) => {
    setTimeout(() => {
      if (actualCount.current === c) {
        setAlert({ show: false, type: "", text: "", count: 0 });
      }
    }, 5000);
  }

  const clearExpenses = () => {
    handleAlert("danger", "All Items Deleted from the list", alert.count);
    setExpenses([]);
  };

  const clearExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    handleAlert("danger", "Item Deleted from the list", alert.count);
  };

  const handleEdit = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    setCharge(expense!.charge);
    setAmount(expense!.amount);
    setEdit(true);
    setId(id);
  };

  useEffect(() => {
    if (charge === "" || isNaN(amount) || amount < 1) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [charge, amount]);

  useEffect(() => {
    const keyEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCharge("");
        setAmount(NaN);
      }
    };
    window.addEventListener("keydown", keyEscape);
    return () => window.removeEventListener("keydown", keyEscape);
  }, []);

  return (
    <>
      {alert.show && <Alert alert={alert} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          addItemBtn={addItem}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          isSubmitDisabled={isSubmitDisabled}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearExpenses={clearExpenses}
          clearExpense={clearExpense}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending:
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
