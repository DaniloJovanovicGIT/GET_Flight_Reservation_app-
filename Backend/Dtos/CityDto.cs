using System.ComponentModel.DataAnnotations;

namespace Backend.dtos;

public record class CityDto(
    [Required] int Id,
    [Required] string Name
);

