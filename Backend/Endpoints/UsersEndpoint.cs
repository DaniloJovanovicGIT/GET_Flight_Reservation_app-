using Backend.Data;
using Backend.dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public static class UsersEndpoints
    {
        const string GetUserEndpointName = "GetUser";

        public static RouteGroupBuilder MapUsersEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("users").WithParameterValidation();

            // GET /users
            group.MapGet("/", async (FlightSystemContext dbContext) => await dbContext.Users
                .Select(user => user)
                .AsNoTracking()
                .ToListAsync());

            // GET /users/{id}
            group.MapGet("/{id}", async (int id, FlightSystemContext dbContext) =>
            {
                User? user = await dbContext.Users.FindAsync(id);
                return user is not null ? Results.Ok(user) : Results.NotFound();
            }).WithName(GetUserEndpointName);

            // POST /users
            group.MapPost("/", async (CreateUserDto newUserDto, FlightSystemContext dbContext) =>
            {
                User newUser = newUserDto.ToEntitiy();

                await dbContext.Users.AddAsync(newUser);
                await dbContext.SaveChangesAsync();

                return Results.CreatedAtRoute(GetUserEndpointName, new { id = newUser.UserId }, newUser);
            });

            
            // DELETE /users/{id}
            group.MapDelete("/{id}", async (int id, FlightSystemContext dbContext) =>
            {
                var existingUser = await dbContext.Users.FindAsync(id);
                if (existingUser is null) { return Results.NotFound(); }

                dbContext.Users.Remove(existingUser);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
