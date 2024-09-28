function calculateDepreciation(purchasePrice, purchaseDate) {
    const currentDate = new Date();
    const purchaseDateObj = new Date(purchaseDate);
    
    const usefulLifeYears = 5;
    const annualDepreciation = purchasePrice / usefulLifeYears;

    const yearsPassed = Math.floor((currentDate - purchaseDateObj) / (1000 * 60 * 60 * 24 * 365));
    
    const totalDepreciation = Math.min(yearsPassed * annualDepreciation, purchasePrice);
    
    const currentPrice = purchasePrice - totalDepreciation;
    
    const remainingYears = Math.max(usefulLifeYears - yearsPassed, 0);
    
    return {
        depreciationValue: totalDepreciation,
        currentPrice: currentPrice.toFixed(2),
        remainingYears: remainingYears,
    };
}

// Example Usage
const purchasePrice = 1000; // Cost of the equipment
const purchaseDate = '2020-01-01'; // Purchase date in YYYY-MM-DD format

const result = calculateDepreciation(purchasePrice, purchaseDate);
console.log(`Depreciation Value: $${result.depreciationValue.toFixed(2)}`);
console.log(`Current Price: $${result.currentPrice}`);
console.log(`Remaining Years: ${result.remainingYears}`);
