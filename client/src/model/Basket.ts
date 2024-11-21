export interface Basket {
    id: number
    buyerId: string
    basketItemDto: BasketItemDto[]
  }
  
  export interface BasketItemDto {
    productId: number
    quantity: number
    name: string
    price: number
    pictureUrl: string
    quantityInStock: number
    brand: string
    type: string
  }