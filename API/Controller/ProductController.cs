using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controller {
    // [ApiController]
    // [Route("api/[controller]")]
    public class ProductController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts() {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById([FromRoute] int id) {
            Product product =  await _context.Products.FindAsync(id);
            if (product == null) {
                return BadRequest("Product Not Found");
            }
            return Ok(product);
        }
    }
}
