export type ListingStats = {
    imgSrc: string;
    title: string;
    itemsAvailable: number;
    menuOptions: string[];
};
export const listingStats: ListingStats[] = [
    {
        "imgSrc": "assets/images/food-icon/c-2.png",
        "title": "Starter Course",
        "itemsAvailable": 23,
        "menuOptions": ["Veg", "Non Veg"],
    },
    {
        "imgSrc": "assets/images/food-icon/c-5.png",
        "title": "Main Course",
        "itemsAvailable": 20,
        "menuOptions": ["Veg", "Non Veg"],
    },
    {
        "imgSrc": "assets/images/food-icon/c-9.png",
        "title": "Coldrinks",
        "itemsAvailable": 18,
        "menuOptions": ["Veg"],
    },
    {
        "imgSrc": "assets/images/food-icon/c-6.png",
        "title": "Sweet Desserts",
        "itemsAvailable": 30,
        "menuOptions": ["Veg", "Non Veg"],
    }
]



export const menuProductData = [
    {
        "image": "assets/images/food-icon/pic12.png",
        "name": "Italian Burata Pizza",
        "size": "12-Inch",
        "description": "Pizza is a traditional Italian dish typically consisting of a flat base of...",
        "ingredients": "Mushrooms, Bell Peppers, Onions, Italian Sausage, Olives, Fresh Basil, Fresh Mozzarella...",
        "price": "$12.00",
        "rating": "4.3/5",
        "category": "Italian",
        "status": "non-veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic13.png",
        "name": "Shanghai Noodles",
        "size": "Large bowl",
        "description": "Shanghai noodles are a specific type of noodle that are a wheat flour...",
        "ingredients": "Green Onions, Sesame Seeds, Soy Sauce, Sesame Oil, Cilantro, Chili Oil or Sriracha, Bean Sprouts...",
        "price": "$13.00",
        "rating": "4.1/5",
        "category": "Thai",
        "status": "veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic14.png",
        "name": "Gourmet Burger",
        "size": "-",
        "description": "A burger is a patty of ground meat grilled and placed between two...",
        "ingredients": "Lettuce, Tomato, Onion, Avocado, Roasted Bell Peppers, Mushrooms, Sprouts or Micrograms, Coleslaw...",
        "price": "$14.00",
        "rating": "4.5/5",
        "category": "Hamburger",
        "status": "veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic15.png",
        "name": "Meat Tacos",
        "size": "3 tacos",
        "description": "Tacos, a popular hand-sized food item of Mexican origin combining...",
        "ingredients": "Ground Meat, Shredded Lettuce, Diced Tomatoes, Shredded Cheese, Vegetables...",
        "price": "$15.00",
        "rating": "4.3/5",
        "category": "Mexican",
        "status": "non-veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic16.png",
        "name": "Spaghetti",
        "size": "Large bowl",
        "description": "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food ...",
        "ingredients": "Spaghetti , Garlic , Onion , Zucchini , Mushrooms , Italian Seasoning , Cheddar cheese...",
        "price": "$13.00",
        "rating": "4.2/5",
        "category": "Italian",
        "status": "veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic17.png",
        "name": "Chocolate Lava Cake",
        "size": "Single",
        "description": "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food ...",
        "ingredients": "Chocolate, Flour, Eggs , Milk...",
        "price": "$10.00",
        "rating": "4.2/5",
        "category": "Global",
        "status": "non-veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
    {
        "image": "assets/images/food-icon/pic18.png",
        "name": "Cocktail",
        "size": "300 ML",
        "description": "A cocktail is any beverage that mixes one or more alcoholic drinks and other flavors ...",
        "ingredients": "White Rum , Fresh Lime Juice , Fresh Mint Leaves , Ice...",
        "price": "$21.00",
        "rating": "4.5/5",
        "category": "Global",
        "status": "veg",
        "actions": [
            { "icon": "ri-eye-line", "link": "#!" },
            { "icon": "ri-edit-line", "link": "#!" },
            { "icon": "ri-delete-bin-5-line", "link": "#!" }
        ]
    },
]
