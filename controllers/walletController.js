// File: controllers/walletController.js

// Add funds to wallet
exports.addFunds = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        // Update the user's balance and add a transaction entry
        const { data: updatedUser, error: balanceError } = await req.supabase
            .from('users')
            .update({ balance: req.supabase.raw(`balance + ${amount}`) })
            .eq('id', userId)
            .select('balance')
            .single();

        if (balanceError) {
            throw balanceError;
        }

        // Add transaction history entry
        const { error: transactionError } = await req.supabase
            .from('transactionHistory')
            .insert([{ userId, amount, type: 'credit', description: 'Funds added', date: new Date() }]);

        if (transactionError) {
            throw transactionError;
        }

        res.status(200).json({ message: 'Funds added successfully', balance: updatedUser.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error adding funds', error });
    }
};

// View wallet balance
exports.getBalance = async (req, res) => {
    try {
        const { data: user, error } = await req.supabase
            .from('users')
            .select('balance')
            .eq('id', req.user.id)
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error });
    }
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
    try {
        const { data: transactions, error } = await req.supabase
            .from('transactionHistory')
            .select('*')
            .eq('userId', req.user.id)
            .order('date', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error });
    }
};
