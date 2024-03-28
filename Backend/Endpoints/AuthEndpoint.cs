using Backend.Data;
using Backend.dtos;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Endpoints
{
    public static class AuthEndpoint
    {

        public static void MapAuthEndpoints(this WebApplication app)
        {
            app.MapPost("/login", async (LoginDTO loginDto, FlightSystemContext dbContext) =>
                {
                    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username && u.Password == loginDto.Password);
                    if (user == null)
                    {
                        return Results.NotFound("Invalid username or password");
                    }

                    var token = GenerateJwtToken(user);
                    return Results.Ok(new { Token = token, Username = user.Username, Role = user.Role });
                });
        }

        private static object GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("GETGETGETGETGETGETGETGETGETGETGET");
             var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                            new Claim[]
                        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
                        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "dotnet-user-jwts"
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}