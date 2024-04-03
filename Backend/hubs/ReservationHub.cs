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
        var agentFlights = await _context.Flights
            .Where(f => f.AgentID == agentId)
            .ToListAsync();

        var agentFlightIds = agentFlights.Select(f => f.FlightId).ToList();

        var reservationsForAgent = await _context.Reservations
            .Where(r => agentFlightIds.Contains(r.FlightId))
            .ToListAsync();

        return reservationsForAgent;
    }

    public async Task<List<Reservation>> GetReservationsByUserId(int userId)
    {
        var reservations = await _context.Reservations
            .Include(r => r.Booker)
            .Include(r => r.Flight)
            .Where(r => r.BookerId == userId)
            .ToListAsync();

        return reservations;
    }


    public async Task UpdateReservation(Reservation updatedReservation)
    {
        var existingReservation = await _context.Reservations.FindAsync(updatedReservation.ReservationId);
        if (existingReservation != null)
        {
            existingReservation.FlightId = updatedReservation.FlightId;

            _context.Reservations.Update(existingReservation);
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("ReservationUpdated", existingReservation);
        }
    }
}
