
type OrderStatus = {
    icon: string;
    count: number;
    title: string;
};
export const orderStatusData: OrderStatus[] = [
    {
        "icon": "assets/images/food-icon/i-2.png",
        "count": 80,
        "title": "Total Orders"
    },
    {
        "icon": "assets/images/food-icon/i-3.png",
        "count": 21,
        "title": "Cancelled"
    },
    {
        "icon": "assets/images/food-icon/i-1.png",
        "count": 78,
        "title": "Confirm"
    },
    {
        "icon": "assets/images/food-icon/i-4.png",
        "count": 48,
        "title": "Preparing"
    },
    {
        "icon": "assets/images/food-icon/i-5.png",
        "count": 42,
        "title": "Ready For Delivery"
    },
    {
        "icon": "assets/images/food-icon/i-6.png",
        "count": 20,
        "title": "Order On Its Way"
    },
    {
        "icon": "assets/images/food-icon/i-8.png",
        "count": 30,
        "title": "Pending Orders"
    },
    {
        "icon": "assets/images/food-icon/i-9.png",
        "count": 25,
        "title": "Delivered Order"
    }
]


export const ordersData = [
    {
        "orderNo": "#ORD-001",
        "customer": "Erma D. Rumph",
        "items": [
            { "name": "Margherita Pizza", "quantity": 1, "pricePerItem": 16.00 },
            { "name": "Cheeseburger", "quantity": 2, "pricePerItem": 10.00 }
        ],
        "totalPrice": 36.00,
        "paymentMethod": "Online UPI",
        "icon": 'ri-check-double-line text-success',
        "orderDateTime": "15-02-2024, 04:27 pm",
        "address": "44 Hide A Way Orlando",
        "deliveryStatus": "Ready To Pick"
    },
    {
        "orderNo": "#ORD-002",
        "customer": "Craig E. Morg",
        "items": [
            { "name": "Caesar Salad", "quantity": 2, "pricePerItem": 13.00 },
            { "name": "Veggie Wrap", "quantity": 2, "pricePerItem": 9.00 },
            { "name": "BBQ Chicken Wings", "quantity": 3, "pricePerItem": 18.00 }
        ],
        "totalPrice": 98.00,
        "paymentMethod": "COD",
        "icon": 'ri-restart-line text-warning',
        "orderDateTime": "19-11-2024, 03:45 pm",
        "address": "Denver Avenue Edgemt, CA 92",
        "deliveryStatus": "Out Of Delivery"
    },
    {
        "orderNo": "#ORD-003",
        "customer": "Laura W. Gibb",
        "items": [
            { "name": "Caesar Salad", "quantity": 1, "pricePerItem": 13.00 }
        ],
        "totalPrice": 13.00,
        "paymentMethod": "Online UPI",
        "icon": 'ri-check-double-line text-success',
        "orderDateTime": "12-03-2026, 11:15 am",
        "address": "Goldie Lane Cincinnati, OH",
        "deliveryStatus": "Delivered"
    },
    {
        "orderNo": "#ORD-004",
        "customer": "Angela Henry",
        "items": [
            { "name": "Greek Gyro", "quantity": 1, "pricePerItem": 14.00 },
            { "name": "Grilled Salmon", "quantity": 1, "pricePerItem": 12.00 },
            { "name": "Shrimp Tacos", "quantity": 1, "pricePerItem": 10.00 }
        ],
        "totalPrice": 36.00,
        "paymentMethod": "Online UPI",
        "icon": "ri-close-line text-danger",
        "orderDateTime": "23-01-2027, 02:00 pm",
        "address": "1452 Koontz Lane San Fernando",
        "deliveryStatus": "Cancel"
    },
    {
        "orderNo": "#ORD-005",
        "customer": "Danny E. Peyton",
        "items": [
            { "name": "Mushroom Risotto", "quantity": 1, "pricePerItem": 17.00 },
            { "name": "Veggie Wrap", "quantity": 4, "pricePerItem": 9.00 },
            { "name": "Shrimp Tacos", "quantity": 2, "pricePerItem": 12.00 },
            { "name": "Cheeseburger", "quantity": 1, "pricePerItem": 10.00 }
        ],
        "totalPrice": 86.00,
        "paymentMethod": "COD",
        "icon": 'ri-restart-line text-warning',
        "orderDateTime": "17-10-2024, 12:30 pm",
        "address": "519 Hill Haven Drive Waco",
        "deliveryStatus": "Progress"
    },
    {
        "orderNo": "#ORD-006",
        "customer": "Joyce R. Boone",
        "items": [
            { "name": "Spaghetti Carbonara", "quantity": 3, "pricePerItem": 57.00 }
        ],
        "totalPrice": 57.00,
        "paymentMethod": "COD",
        "icon": 'ri-restart-line text-warning',
        "orderDateTime": "22-07-2025, 08:45 am",
        "address": "14 Newton Street Saint Cloud",
        "deliveryStatus": "Delivered"
    }
]
