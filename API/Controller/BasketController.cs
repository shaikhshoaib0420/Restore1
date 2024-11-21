using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BasketController : BaseApiController {
    private readonly StoreContext _context;
    public BasketController(StoreContext context) {
        _context = context;
    }
  
    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = new Basket();
        basket = await _context.Baskets
        .Include(b => b.BasketItems)
        .ThenInclude(b => b.Product)
        .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);

        if (basket == null)
        {
            return NotFound();
        }
        return MapBasketToDto(basket);
    }

    [HttpPost]
    public async Task<ActionResult> AddBasketItem(int productId, int quantity){

        var basket = await RetrieveBasket();
        if (basket == null) basket = CreateBasket();

        var product = await _context.Products.FindAsync(productId);
        if (product == null) return new NotFoundObjectResult($"{productId} not found");

        basket.AddBasketItem(product, quantity);
        bool saved = await _context.SaveChangesAsync() >= 1;
        if (!saved) {
            return BadRequest("issue saving data");
            // new BadRequestObjectResult("Error adding basket!")
        }
        return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItem(int productId, int quantity) {
        var basket = await RetrieveBasket();
        if (basket == null) return BadRequest(new ProblemDetails {Title = "Basket not found!"});
        var product = _context.Products.Find(productId);
        basket.RemoveBasketItem(product,quantity);
        bool saved = await _context.SaveChangesAsync() >= 1;
        if (saved) return Ok("Removed");
        return BadRequest(new ProblemDetails{Title = "Problem removing item!"});
        
    }

    private async Task<Basket> RetrieveBasket() {
        var basket = await _context.Baskets
        .Include(b => b.BasketItems)
        .ThenInclude(b => b.Product)
        .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);

        return basket;
    }

    private Basket CreateBasket() {
        var buyerId = Guid.NewGuid().ToString();
        var cookiesOption = new CookieOptions {Expires=DateTime.Now.AddDays(30), IsEssential=true};
        Response.Cookies.Append("buyerId", buyerId, cookiesOption);
        var basket = new Basket {BuyerId = buyerId};
        _context.Baskets.Add(basket);
        return basket;
    }

    private BasketDto MapBasketToDto(Basket basket) {
        return new BasketDto
        {
            BuyerId = basket.BuyerId,
            Id = basket.Id,
            BasketItemDto = basket.BasketItems.Select(i => new BasketItemDto
            {
                Brand = i.Product.Brand,
                Name = i.Product.Name,
                ProductId = i.Product.Id,
                Quantity = i.Quantity,
                PictureUrl = i.Product.PictureUrl,
                Price = i.Product.Price,
                Type = i.Product.Type
            }).ToList()
        };
    }

    
}