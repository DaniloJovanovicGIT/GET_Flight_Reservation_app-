using Backend.Data;
using Backend.dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public static class FlightsEndpoints
{
    const string GetFlightEndpointName = "GetFlight";
    public static RouteGroupBuilder MapFlightsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("flights").WithParameterValidation();
        //GET /flights
        group.MapGet("/", async (FlightSystemContext dbContext) => await dbContext.Flights
            .Include(flight => flight.DepartureCity)
            .Include(flight => flight.ArrivalCity)
            .Where(flight => flight.Status == null)
            .Select(flight => flight.toDto())
            .AsNoTracking()
            .ToListAsync());

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

        //GET flights for agent
        group.MapGet("/agent/{AgentID}", async (int AgentID, FlightSystemContext dbContext) =>
        {
            var agentFlights = await dbContext.Flights
                .Include(flight => flight.DepartureCity)
                .Include(flight => flight.ArrivalCity)
                .Where(flight => flight.AgentID == AgentID)
                .Where(flight => flight.Status == null)
                .Select(flight => flight.toDto())
                .AsNoTracking()
                .ToListAsync();

            return Results.Ok(agentFlights);
        });

        // GET /flights/search/{departureCityId}/{arrivalCityId}/{directFlightsOnly}
        group.MapGet("/search/{departureCityId}/{arrivalCityId}/{directFlightsOnly:int?}", async (FlightSystemContext dbContext, int? departureCityId, int? arrivalCityId, int? directFlightsOnly) =>
{
    IQueryable<Flight> FlightsQuery = dbContext.Flights
        .Include(flight => flight.DepartureCity)
        .Include(flight => flight.ArrivalCity)
        .Where(flight => flight.Status == null && flight.AvailableSeatsCount > 0);
    if (departureCityId.HasValue)
    {
        FlightsQuery = FlightsQuery.Where(flight => flight.DepartureCityID == departureCityId.Value);
    }

    if (arrivalCityId.HasValue)
    {
        FlightsQuery = FlightsQuery.Where(flight => flight.ArrivalCityID == arrivalCityId.Value);
    }

    if (directFlightsOnly.HasValue && directFlightsOnly == 1)
    {
        FlightsQuery = FlightsQuery.Where(flight => flight.NumberOfConnections == 0);
    }

    var flights = await FlightsQuery.ToListAsync();
    return Results.Ok(flights);
});

        //POST /flights
        group.MapPost("/", async (CreateFlightDto newFlight, FlightSystemContext dbContext) =>
        {
            Flight flight = newFlight.ToEntitiy();
            flight.DepartureCity = dbContext.Cities.Find(flight.DepartureCityID);
            flight.ArrivalCity = dbContext.Cities.Find(flight.ArrivalCityID);
            flight.Agent = dbContext.Users.Find(flight.AgentID);

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

        // DELETE /flights
        group.MapDelete("/{id}", async (int id, FlightSystemContext dbContext) =>
        {
            var flightToUpdate = await dbContext.Flights.FindAsync(id);
            if (flightToUpdate == null)
            {
                return Results.NotFound();
            }

            var reservationsToUpdate = await dbContext.Reservations
                .Where(r => r.FlightId == id)
                .ToListAsync();

            foreach (var reservation in reservationsToUpdate)
            {
                reservation.Status = "Canceled";
                dbContext.Reservations.Update(reservation);
            }

            flightToUpdate.Status = "Canceled";
            dbContext.Flights.Update(flightToUpdate);

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });


        return group;
    }
}
