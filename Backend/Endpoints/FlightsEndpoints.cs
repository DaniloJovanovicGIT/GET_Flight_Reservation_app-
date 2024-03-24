using Backend.Data;
using Backend.dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public static class FlightsEndpoints
{
    const string GetFlightEndpointName = "GetFlight";
    public static  RouteGroupBuilder MapFlightsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("flights").WithParameterValidation();
        //GET /flights
        group.MapGet("/", async (FlightSystemContext dbContext) => await dbContext.Flights.
        Include(fligh => fligh.DepartureCity).
        Include(flight => flight.ArrivalCity).
        Select(flight => flight.toDto()).
        AsNoTracking().ToListAsync());

        //GET /flights
        group.MapGet("/{id}", async (int id, FlightSystemContext dbContext) =>
        {
            Flight? flight = await dbContext.Flights.FindAsync(id);
            if (flight is not null)
            {
                flight.DepartureCity = await dbContext.Cities.FindAsync(flight.DepartureCityID);
                flight.ArrivalCity = await dbContext.Cities.FindAsync(flight.ArrivalCityID);
            }
            return flight is null ? Results.NotFound() : Results.Ok(flight.toDto());

        }).WithName(GetFlightEndpointName);

        //POST /flights
        group.MapPost("/", async (CreateFlightDto newFlight, FlightSystemContext dbContext) =>
        {
            Flight flight = newFlight.ToEntitiy();
            flight.DepartureCity = dbContext.Cities.Find(flight.DepartureCityID);
            flight.ArrivalCity = dbContext.Cities.Find(flight.ArrivalCityID);

            await dbContext.Flights.AddAsync(flight);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetFlightEndpointName, new { id = flight.FlightId }, flight.toDto());
        });


        //PUT /flights
        group.MapPut("/{id}", async (int id, UpdateFlightDto updatedFlight, FlightSystemContext dbContext) =>
        {
            var existingFlight = await dbContext.Flights.FindAsync(id);
            if (existingFlight is null) { return Results.NotFound(); }

            dbContext.Entry(existingFlight).CurrentValues.SetValues(updatedFlight.ToEntitiy(id));
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });


        //DELETE /flights
        group.MapDelete("/{id}", async (int id, FlightSystemContext dbContext) =>
        {
            await dbContext.Flights.
            Where(game => game.FlightId == id).
            ExecuteDeleteAsync();
            
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        return group;
    }
}
