using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Backend.model;         // for RegisterDto, LoginDto, AppUser
using Backend.Service;       // for MongoUserService



[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly MongoUserService _mongoUserService;

    private readonly IConfiguration _configuration;

    public AuthController(
        UserManager<IdentityUser> userManager,
        MongoUserService mongoUserService,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _mongoUserService = mongoUserService;
        _configuration = configuration;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto model)
    {
        var user = new IdentityUser
        {
            UserName = model.UserName,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        // Save to MongoDB
        var mongoUser = new AppUser
        {
            IdentityUserId = user.Id,
            UserName = user.UserName,
            Email = user.Email
        };

        await _mongoUserService.CreateUserAsync(mongoUser);

        return Ok("User registered successfully");
    }

    [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto model)
{
    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null)
    {
        return Unauthorized("Invalid email or password.");
    }

    var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
    if (!passwordValid)
    {
        return Unauthorized("Invalid email or password.");
    }

    var secretKey = _configuration["Jwt:Key"];
    if (string.IsNullOrEmpty(secretKey) || secretKey.Length < 32)
    {
        throw new Exception("JWT Key is missing or too short. It must be at least 32 characters.");
    }

    var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email ?? ""),
        new Claim(ClaimTypes.Name, user.UserName ?? "")
    };

    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

    var token = new JwtSecurityToken(
        expires: DateTime.UtcNow.AddHours(1),
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
    );

    return Ok(new
    {
        token = new JwtSecurityTokenHandler().WriteToken(token),
        expiration = token.ValidTo
    });
}

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Ok(new { message = $"Hello user with ID: {userId}" });
    }


}
