using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Entities;
using Backend.dtos;
using Backend.Mapping;

public class ReservationHub : Hub
{
    private readonly FlightSystemContext _context;

    public ReservationHub(FlightSystemContext context)
    {
        _context = context;
    }

    public override async Task OnConnectedAsync()
    {
        await SendInitialReservationsToClient();
        await base.OnConnectedAsync();
    }

    private async Task SendInitialReservationsToClient()
    {
        List<Reservation> initialReservations = await _context.Reservations.ToListAsync();
        await Clients.Caller.SendAsync("InitialReservations", initialReservations);
    }

    public async Task AddReservation(CreateReservationDTO newReservation)
    {
        try
        {
            Reservation reservation = newReservation.ToEntitiy();

            User booker = await _context.Users.FindAsync(reservation.BookerId);
            Flight flight = await _context.Flights.FindAsync(reservation.FlightId);
            flight.ArrivalCity = await _context.Cities.FindAsync(flight.ArrivalCityID);
            flight.DepartureCity = await _context.Cities.FindAsync(flight.DepartureCityID);

            if (booker == null || flight == null)
            {
                return;
            }
            reservation.Booker = booker;
            reservation.Flight = flight;

            _context.Reservations.Add(reservation);

            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("ReservationAdded", reservation);

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding reservation: {ex.Message}");
            throw;
        }
    }



    public async Task<List<Reservation>> GetReservationsForAgent(int agentId)
    {
        var reservationsForAgent = await _context.Reservations
            .Include(r => r.Booker)
            .Include(r => r.Flight)
                .ThenInclude(f => f.DepartureCity)
            .Include(r => r.Flight)
                .ThenInclude(f => f.ArrivalCity)
            .Where(r => _context.Flights.Any(f => f.AgentID == agentId && f.FlightId == r.FlightId))
            .ToListAsync();

        return reservationsForAgent;
    }


    public async Task<List<Reservation>> GetReservationsByUserId(int userId)
    {
        var reservations = await _context.Reservations
            .Include(r => r.Booker)
            .Include(r => r.Flight)
                .ThenInclude(f => f.DepartureCity)
            .Include(r => r.Flight)
                .ThenInclude(f => f.ArrivalCity)
            .Where(r => r.BookerId == userId)
            .ToListAsync();

        return reservations;
    }



    public async Task ConfirmReservation(int reservationId)
{
    var existingReservation = await _context.Reservations
        .Include(r => r.Flight)
            .ThenInclude(f => f.DepartureCity)
        .Include(r => r.Flight)
            .ThenInclude(f => f.ArrivalCity)
        .Include(r => r.Booker)
        .FirstOrDefaultAsync(r => r.ReservationId == reservationId);

    if (existingReservation != null)
    {
        existingReservation.Status = "Confirmed";
        _context.Reservations.Update(existingReservation);
        await _context.SaveChangesAsync();
        await Clients.All.SendAsync("ReservationUpdated", existingReservation);
    }
}


}
