```javascript
class HodlCoin {
    constructor() {
        this.balances = new Map();
        this.totalSupply = 1000000; // 1 million HODL coins
        this.balances.set('genesis', this.totalSupply);
    }

    // Get balance for an address
    getBalance(address) {
        return this.balances.get(address) || 0;
    }

    // Transfer coins between addresses
    transfer(from, to, amount) {
        if (!this.balances.has(from)) {
            throw new Error('Sender address does not exist');
        }
        if (this.balances.get(from) < amount) {
            throw new Error('Insufficient balance');
        }
        if (amount <= 0) {
            throw new Error('Invalid transfer amount');
        }

        this.balances.set(from, this.balances.get(from) - amount);
        this.balances.set(to, (this.balances.get(to) || 0) + amount);
        return true;
    }

    // Mint new coins (for testing)
    mint(address, amount) {
        if (amount <= 0) {
            throw new Error('Invalid mint amount');
        }
        this.balances.set(address, (this.balances.get(address) || 0) + amount);
        this.totalSupply += amount;
        return true;
    }

    // Burn coins (for testing)
    burn(address, amount) {
        if (!this.balances.has(address)) {
            throw new Error('Address does not exist');
        }
        if (this.balances.get(address) < amount) {
            throw new Error('Insufficient balance to burn');
        }
        if (amount <= 0) {
            throw new Error('Invalid burn amount');
        }

        this.balances.set(address, this.balances.get(address) - amount);
        this.totalSupply -= amount;
        return true;
    }
}

// Test code to run when file is executed directly
if (require.main === module) {
    const hodl = new HodlCoin();

    try {
        // Check initial genesis balance
        console.log('Genesis balance:', hodl.getBalance('genesis')); // Should show 1000000

        // Transfer 1000 coins from genesis to user1
        hodl.transfer('genesis', 'user1', 1000);
        console.log('User1 balance:', hodl.getBalance('user1')); // Should show 1000
        console.log('Genesis balance:', hodl.getBalance('genesis')); // Should show 999000

        // Mint 500 coins to user2
        hodl.mint('user2', 500);
        console.log('User2 balance:', hodl.getBalance('user2')); // Should show 500
        console.log('Total supply:', hodl.totalSupply); // Should show 1000500

        // Burn 200 coins from user1
        hodl.burn('user1', 200);
        console.log('User1 balance:', hodl.getBalance('user1')); // Should show 800
        console.log('Total supply:', hodl.totalSupply); // Should show 1000300

        // Try an invalid transfer (should fail)
        hodl.transfer('user1', 'user2', 1000); // Should throw error
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = HodlCoin;
