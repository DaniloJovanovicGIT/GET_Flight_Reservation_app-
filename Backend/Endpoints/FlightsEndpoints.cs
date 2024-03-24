using Backend.dtos;

namespace Backend;

public static class FlightsEndpoints
{
    const string GetFlightEndpointName = "GetFlight";
    static readonly List<FlightDto> flights = [new(1, new(1,"Beograd"), new(4,"Pristina"), new DateOnly(2024, 3, 24), 0, 42)];

    public static RouteGroupBuilder MapFlightsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("flights").WithParameterValidation();
        //GET /flights
        group.MapGet("/", () => flights);

        //GET /flights
        group.MapGet("/{id}", (int id) =>
        {
            FlightDto? flight = flights.Find(flight => flight.flightId == id);
            return flight is null ? Results.NotFound() : Results.Ok(flight);
        }).WithName(GetFlightEndpointName);

        //POST /flights
        group.MapPost("/", (CreateFlightDto newFlight) =>
        {
            FlightDto flight = new(
                flights.Count + 1,
                newFlight.departure,
                newFlight.arrival,
                newFlight.departureDate,
                newFlight.numberOfConnections,
                newFlight.availableSeatsCount
            );
            flights.Add(flight);

            return Results.CreatedAtRoute(GetFlightEndpointName, new { id = flight.flightId }, flight);
        });
        

        //PUT /flights
        group.MapPut("/{id}", (int id, UpdateFlightDto updatedFlight) =>
        {
            var index = flights.FindIndex(flight => flight.flightId == id);
            if (index == -1) { return Results.NotFound(); }
            flights[index] = new FlightDto(id, updatedFlight.departure, updatedFlight.arrival, updatedFlight.departureDate, updatedFlight.numberOfConnections, updatedFlight.availableSeatsCount);

            return Results.NoContent();
        });
    

        //DELETE /flights
        group.MapDelete("/{id}", (int id) =>
        {
            flights.RemoveAll(flight => flight.flightId == id);
            return Results.NoContent();
        });

        return group;
    }
}
