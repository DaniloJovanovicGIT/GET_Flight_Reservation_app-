using System.ComponentModel.DataAnnotations;
using Backend.dtos;

namespace Backend;

public record class UpdateFlightDto(int flightId,
[Required] CityDto departure,
[Required] CityDto arrival,
[Required] DateOnly departureDate,
[Required] int numberOfConnections,
[Required] int availableSeatsCount
);
