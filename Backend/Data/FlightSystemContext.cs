using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class FlightSystemContext(DbContextOptions<FlightSystemContext> options)
 : DbContext(options)
{
    public DbSet<City> Cities => Set<City>();
    public DbSet<Flight> Flights =>Set<Flight>();
}
