using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _req;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate req, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _req = req;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context) {
        try {
            await _req(context);
        }
        catch(Exception ex) {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var response = new ProblemDetails {
                Status = 500,
                Title = ex.Message,
                Detail = ex.StackTrace
            };

            var options = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            var json = JsonSerializer.Serialize(response, options);
            
            await context.Response.WriteAsync(json);
            
        }
    }
}