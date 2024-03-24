using System.ComponentModel.DataAnnotations;
using Backend.dtos;

namespace Backend;

public record FlightDto(
[Required] int flightId,
[Required] CityDto departure,
[Required] CityDto arrival,
[Required] DateOnly departureDate,
[Required] int numberOfConnections,
[Required] int availableSeatsCount);

