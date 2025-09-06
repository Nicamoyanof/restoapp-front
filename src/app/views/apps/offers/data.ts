interface Offer {
    name: string;
    description: string;
    validityPeriod: string;
    discountPercentage: string;
    conditions: string;
    expiryDate: string;
}

export const offers: Offer[] = [
    {
        "name": "Happy Hour",
        "description": "50% off on all appetizers",
        "validityPeriod": "3 PM - 5 PM daily",
        "discountPercentage": "50%",
        "conditions": "Dine-in only",
        "expiryDate": "2024-02-15"
    },
    {
        "name": "Family Feast",
        "description": "Free dessert with family-sized orders",
        "validityPeriod": "Every weekend",
        "discountPercentage": "Free dessert",
        "conditions": "Min. order $50",
        "expiryDate": "2024-02-20"
    },
    {
        "name": "Early Bird",
        "description": "20% off on breakfast items",
        "validityPeriod": "7 AM - 9 AM daily",
        "discountPercentage": "20%",
        "conditions": "Dine-in and Takeaway",
        "expiryDate": "2024-02-25"
    },
    {
        "name": "Seafood Special",
        "description": "30% off on all seafood dishes",
        "validityPeriod": "Fridays",
        "discountPercentage": "30%",
        "conditions": "Dine-in only",
        "expiryDate": "2024-03-02"
    },
    {
        "name": "Pasta Tuesday",
        "description": "Buy one, get one free on all pastas",
        "validityPeriod": "Tuesdays",
        "discountPercentage": "BOGO",
        "conditions": "Dine-in and takeaway",
        "expiryDate": "2024-03-05"
    },
    {
        "name": "Kids Eat Free",
        "description": "Free kids' meal with adult entree",
        "validityPeriod": "Weekdays",
        "discountPercentage": "Free kids' meal",
        "conditions": "For kids under 12",
        "expiryDate": "2024-03-10"
    },
    {
        "name": "Lunch Combo",
        "description": "Combo meal at $10",
        "validityPeriod": "12 PM - 2 PM daily",
        "discountPercentage": "Fixed price",
        "conditions": "Dine-in only",
        "expiryDate": "2024-03-15"
    },
    {
        "name": "Weekend Brunch",
        "description": "25% off on brunch menu",
        "validityPeriod": "Saturdays & Sundays",
        "discountPercentage": "25%",
        "conditions": "Dine-in only",
        "expiryDate": "2024-03-20"
    },
    {
        "name": "Salad Days",
        "description": "Free drink with any salad order",
        "validityPeriod": "Mondays",
        "discountPercentage": "Free drink",
        "conditions": "Dine-in and takeaway",
        "expiryDate": "2024-03-25"
    }
]

