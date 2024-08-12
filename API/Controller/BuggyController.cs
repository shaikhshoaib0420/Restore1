using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


public class BuggyController : BaseApiController {

    [HttpGet("bad-request")]
    public IActionResult  Get400Error() {
        return BadRequest();
    }

    [HttpGet("not-found")]
    public IActionResult Get404NotFound() {
        return NotFound();
    }

    [HttpGet("unauthorized")]
    public IActionResult  Get401Unauthorized() {
        return Unauthorized();
    }

    [HttpGet("server-error")]
    public IActionResult Get500Error() {
        throw new Exception("Server Error");
    }

    [HttpGet("validation-error")]
    public IActionResult GetValidationError(){
        ModelState.AddModelError("Problem 1", "This is first error");
        ModelState.AddModelError("Problem2", "This is second error");
        return ValidationProblem();
    }
}