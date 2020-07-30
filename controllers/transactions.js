const Transaction = require('../models/Transaction')

// Get transaction
// route is GET /api/v1/transactions
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// Add transaction
// route is POST /api/v1/transactions
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body

        const transaction = await Transaction.create(req.body)
    
        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        // catch validation error response and parse it into an array
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
        }
    }
}

// Delete transaction
// route is DELETE /api/v1/transactions/id
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        if(err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        } else {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })}
    }
}