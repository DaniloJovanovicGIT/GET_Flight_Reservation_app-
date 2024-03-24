using System.ComponentModel.DataAnnotations;

namespace Backend.dtos;

public record class CreateFlightDto(
    [Required] CityDto departure,
    [Required] CityDto arrival,
    [Required] DateOnly departureDate,
    [Required] int numberOfConnections,
    [Required] int availableSeatsCount
);

