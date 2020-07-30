// UseContext allows you to hook into GlobalContext. NECESSARY.
import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  // get transactions from context
  const { transactions, getTransactions } = useContext(GlobalContext);

  // useEffect to handle asynchronous http request updating the transactions
  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <>
      <h3 className="history">History</h3>

      <ul className="list">
        {transactions.map(transaction => ( <Transaction key={transaction.id} transaction={transaction}/> ))}
      </ul>
    </>
  )
}
