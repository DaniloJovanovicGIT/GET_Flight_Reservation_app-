using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Entities;

public class ReservationHub : Hub
{
    private readonly FlightSystemContext _context;

    public ReservationHub(FlightSystemContext context)
    {
        _context = context;
    }

    public async Task AddReservation(Reservation reservation)
    {
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();
        await Clients.All.SendAsync("ReservationAdded", reservation);
    }

    public async Task<Reservation[]> GetReservations()
    {
        return await _context.Reservations.ToArrayAsync();
    }

    public async Task<Reservation[]> GetReservationsByUserId(int userId)
    {
        return await _context.Reservations.Where(r => r.BookerId == userId).ToArrayAsync();
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
