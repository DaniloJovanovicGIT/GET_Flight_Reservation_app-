using Backend.dtos;
using Backend.Entities;

namespace Backend.Mapping;

public static class FlightMapping
{
    public static Flight ToEntitiy(this CreateFlightDto flight)
    {
        return new()
        {
            DepartureCityID = flight.DepartureCityID,
            ArrivalCityID = flight.ArrivalCityID,
            DepartureDate = flight.departureDate,
            NumberOfConnections = flight.numberOfConnections,
            AvailableSeatsCount = flight.availableSeatsCount,
            AgentID = flight.AgentID
        };
    }

    public static Flight ToEntitiy(this UpdateFlightDto flight, int id)
    {
        return new()
        {
            FlightId = id,
            DepartureCityID = flight.departureCityId,
            ArrivalCityID = flight.arrivalCityId,
            DepartureDate = flight.departureDate,
            NumberOfConnections = flight.numberOfConnections,
            AvailableSeatsCount = flight.availableSeatsCount
        };
    }

    public static FlightDto toDto(this Flight flight){
         return new(
                flight.FlightId,
                flight.DepartureCity!.toDto(),
                flight.ArrivalCity!.toDto(),
                flight.DepartureDate,
                flight.NumberOfConnections,
                flight.AvailableSeatsCount
            );
    }
}
