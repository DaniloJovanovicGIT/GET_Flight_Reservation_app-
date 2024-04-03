using Backend.Entities;

namespace Backend.Entities;

public class Flight
{
    public int FlightId { get; set; }

    public int DepartureCityID { get; set; }

    public City? DepartureCity { get; set; }

    public int ArrivalCityID { get; set; }

    public City? ArrivalCity { get; set; }

    public int AgentID { get; set; }

    public User? Agent { get; set; }

    public DateOnly DepartureDate { get; set; }

    public int NumberOfConnections { get; set; }

    public int AvailableSeatsCount { get; set; }
}
