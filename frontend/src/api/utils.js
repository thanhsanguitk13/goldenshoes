export const formatMoney = (amount) => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
        throw new Error('Invalid numeric value');
    }

    return numericAmount.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: 2,
    });
};

import { v4 as uuidv4 } from 'uuid';

export function getUserId() {
    let userId = localStorage.getItem('userId');

    if (!userId) {
        userId = uuidv4();
        console.log({ userId });
        localStorage.setItem('userId', userId);
    }

    return userId;
}
