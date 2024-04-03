using Backend.Data;
using Backend.Entities;
using Backend.Mapping;

namespace Backend;

public static class UserEndpoints
{
    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("users").WithParameterValidation();
        
        // POST /users
        group.MapPost("/", async (CreateUserDto newUserDto, FlightSystemContext dbContext) =>
        {
            User newUser = newUserDto.ToEntitiy();

            await dbContext.Users.AddAsync(newUser);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute("GetUser");
        }).WithName("AddUser");

        return group;
    }
}
