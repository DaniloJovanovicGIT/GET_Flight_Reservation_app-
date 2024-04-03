using System.ComponentModel.DataAnnotations;

namespace Backend.dtos;

public record class CreateFlightDto(
    [Required] int DepartureCityID,
    [Required] int ArrivalCityID,
    [Required] DateOnly departureDate,
    [Required] int AgentID,
    [Required] int numberOfConnections,
    [Required] int availableSeatsCount
);

