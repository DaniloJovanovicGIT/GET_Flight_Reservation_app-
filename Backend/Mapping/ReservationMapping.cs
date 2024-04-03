using Backend.dtos;
using Backend.Entities;

namespace Backend.Mapping;

public static class ReservationMapping
{
    public static Reservation ToEntitiy(this CreateReservationDTO reservation)
    {
        return new()
        {
            FlightId = reservation.FlightId,
            BookerId = reservation.BookerId,
            Status = "pending",
            numOfSeats = reservation.NumSeats,
            timeSubmited = reservation.timeSubmited
        };
    }
}
