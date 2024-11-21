
public class Basket {
    public int Id { get; set; } 
    public string BuyerId { get; set; }
    public List<BasketItem> BasketItems { get; set; } = new ();

    public void AddBasketItem (Product product, int quantity){
        BasketItem item = BasketItems.Find(i => i.ProductId == product.Id);
        if (item != null) {
            item.Quantity += quantity;
        } else {
            BasketItems.Add(new BasketItem{Product = product, Quantity = quantity});
        }
    }

    public void RemoveBasketItem (Product product, int quantity) {
        BasketItem item = BasketItems.Find(i => i.ProductId == product.Id);
        if (item != null) {
            item.Quantity -= quantity;  
            if (item.Quantity <= 0) {
                BasketItems.Remove(item);
            }
        }
    }

}

// using Microsoft.AspNetCore.Http.HttpResults;
// using Microsoft.AspNetCore.Mvc;

// public class Basket {
//     public int Id { get; set; } 
//     public int BuyerId { get; set; }    
    
//     public List<BasketItem> BasketItems{ get; set; } = new List<BasketItem>();

//     public void AddBasketItem(Product product, int quantity) {
//         BasketItem basketItem = BasketItems.Find(x => x.ProductId == product.Id) as BasketItem;
//         if(basketItem == null) {
//             BasketItems.Add(new BasketItem{Product = product, Quantity = quantity});
//         } else {
//             basketItem.Quantity += quantity;    
//         }     
//     }

//     public IActionResult RemoveBasketItem(Product product, int quantity) {
//         BasketItem basketItem = BasketItems.Find(b => b.ProductId == product.Id);
//         if (basketItem == null) {
//             return new BadRequestObjectResult($"{product.Id} not found");
//         } 

//         basketItem.Quantity -= quantity;
//         if (basketItem.Quantity == 0) {
//             BasketItems.Remove(basketItem);
//         }
//         return new OkObjectResult("Item Removed Successfully");

//     }
// }





















    // public void AddBasketItem(Product product, int quantity) {
    //     BasketItem item = BasketItems.Find(x => x.ProductId == product.Id);
    //     // if (item == null) {
    //     //     BasketItems.Add(new BasketItem{Product = product, Quantity = quantity});
    //     // }

    //     if(item == null) {
    //         BasketItems.Add(new BasketItem{Product = product, Quantity = quantity}); 
    //     } else {
    //         item.Quantity += quantity;
    //     }
    // }

    // public void RemoveBasketItem(Product product, int quantity) {
    //     BasketItem item = BasketItems.Find(item => item.ProductId == product.Id);

    //     if (item != null) {
    //         item.Quantity -= quantity;  
    //         if (item.Quantity <= 0) {
    //             BasketItems.Remove(item);
    //         }
            
    //     }
    // }



