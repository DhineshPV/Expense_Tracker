import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{amount: 25000,
category: "Salary",
date: "2021-10-31",
id: "e9472db2-6fdf-4cda-a705-596001388933",
type: "Income"},{amount: 8000,
category: "Other",
date: "2021-11-05",
id: "35dbd09d-ab7f-43f5-9d62-7f458fb1254b",
type: "Expense"},{amount: 1500,
category: "Bills",
date: "2021-11-10",
id: "694dbe63-7d2d-43dd-8b00-11d3bf0a69f3",
type: "Expense",
},{amount: 5000,
category: "House",
date: "2021-11-17",
id: "19832b17-a25b-45ea-af29-17a101272637",
type: "Expense",
}];



export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
