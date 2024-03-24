using Backend.Data;
using Backend.dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints;

public static class CitiesEndpoints
{
    const string GetCityEndpointName = "GetCity";

    public static RouteGroupBuilder MapCitiesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cities").WithParameterValidation();

        //GET /cities
        group.MapGet("/", async (FlightSystemContext dbContext) =>
         await dbContext.Cities.
         Select(city => city.toDto()).
         ToListAsync());

        //get /cities/1
        group.MapGet("/{id}", async (int id, FlightSystemContext dbContext) =>
        {
            City? city = await dbContext.Cities.FindAsync(id);
            return city is null ? Results.NotFound() : Results.Ok(city);
        }).WithName(GetCityEndpointName);

        return group;
    }

}
