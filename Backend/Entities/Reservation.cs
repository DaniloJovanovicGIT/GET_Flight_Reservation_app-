using System;

namespace Backend.Entities
{
    public class Reservation
    {
        public int ReservationId { get; set; }

        public int FlightId { get; set; }

        public Flight? Flight { get; set; }

        public int BookerId { get; set; }

        public User? Booker { get; set; }

        public int numOfSeats { get; set; }
        public string Status { get; set; }

        public DateTime timeSubmited { get; set; }
    }
}
