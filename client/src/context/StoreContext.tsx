import { Basket } from "../model/Basket";
import { createContext, PropsWithChildren, useContext, useState } from "react";


//  interface StoreContextValue {
//     basket: Basket | null;
//     setBasket: (basket: Basket) => void;
//     removeItem: (productId: number, quantity: number) => void;
// }


// export const StoreContext = createContext<StoreContextValue | undefined>(undefined);


// export function useStoreContext() {
//     const context = useContext(StoreContext!);

//     if(context) return context
//     else {
//         throw("context not found");
//     }
// }

// export function StoreProvider({children}: PropsWithChildren<any>) {
//     const [basket, setBasket] = useState<Basket | null>(null);

//     function removeItem(productId: number, quantity: number) {
//         if (!basket) return;
//         const items = [...basket?.basketItemDto];
//         const itemIndex = items.findIndex(i => i.productId == productId);
//         if (items[itemIndex]) {
//             items[itemIndex].quantity = -quantity;
//             if (items[itemIndex].quantity == 0) items.splice(itemIndex, 1);
//         }

//         setBasket((prev) => {
//             return {...prev!, items}
//         })

//     }

//     return (
//         <StoreContext.Provider value={{basket, setBasket, removeItem}}>
//             {children}
//         </StoreContext.Provider>
//     )
// }




interface StoreContextType {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context) return context;
    else {
        throw Error("Oops Context didn't found.");
    }
}


export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return 

        const items = [... basket.basketItemDto];
        const itemIndex = items.findIndex(i => productId == i.productId);
        if (items[itemIndex]) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity == 0) items.splice(itemIndex, 1);
        }

        setBasket((prev) => {
            //replacing the basket's basketItemDto property with items.
            return {...prev!, basketItemDto:items}
        });   
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}

