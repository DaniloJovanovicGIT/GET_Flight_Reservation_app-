using System.ComponentModel.DataAnnotations;
using Backend.Entities;

namespace Backend.dtos
{
    public record class CreateReservationDTO
    {
        [Required]
        public int FlightId { get; init; }
        [Required]
        public int BookerId { get; init; }

        [Required]
        public int NumSeats { get; init; }

        [Required]
        public DateTime timeSubmited { get; init; }
    }
}