import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios'

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component linking the components & state to the db
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // GET transactions
  async function getTransactions() {
    try {
      // Go to controller and send http request
      const res = await axios.get('/api/v1/transactions')

      // Update state
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  // DELETE transaction
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`)

      // Update state
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  // POST transaction
  async function addTransaction(transaction) {

    // Create content type
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // POST route, data, and content type to the db
      const res = await axios.post('/api/v1/transactions', transaction, config)

      // Then update the state for the UI
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  return(
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction
      }}>
      {children}
    </GlobalContext.Provider>
  )
}