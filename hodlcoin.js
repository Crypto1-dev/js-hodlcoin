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

// Example usage for testing
function testHodlCoin() {
    const hodl = new HodlCoin();
    
    try {
        // Test initial balance
        console.log('Genesis balance:', hodl.getBalance('genesis')); // 1000000
        
        // Test transfer
        hodl.transfer('genesis', 'alice', 1000);
        console.log('Alice balance:', hodl.getBalance('alice')); // 1000
        console.log('Genesis balance:', hodl.getBalance('genesis')); // 999000
        
        // Test mint
        hodl.mint('bob', 500);
        console.log('Bob balance:', hodl.getBalance('bob')); // 500
        console.log('Total supply:', hodl.totalSupply); // 1000500
        
        // Test burn
        hodl.burn('alice', 200);
        console.log('Alice balance:', hodl.getBalance('alice')); // 800
        console.log('Total supply:', hodl.totalSupply); // 1000300
        
        // Test invalid transfer
        hodl.transfer('alice', 'bob', 1000); // Should throw error
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run tests
testHodlCoin();
