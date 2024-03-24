using System.ComponentModel.DataAnnotations;
using Backend.dtos;

namespace Backend;

public record class UpdateFlightDto(int flightId,
[Required] int departureCityId,
[Required] int arrivalCityId,
[Required] DateOnly departureDate,
[Required] int numberOfConnections,
[Required] int availableSeatsCount
);
