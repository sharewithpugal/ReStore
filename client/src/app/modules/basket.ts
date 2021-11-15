 

    export interface BasketItem {
        productID: number;
        name: string;
        price: number;
        picture: string;
        type: string;
        brand: string;
        quantity: number;
    }

    export interface Basket {
        id: number;
        buyerId: string;
        items: BasketItem[];
    }
 