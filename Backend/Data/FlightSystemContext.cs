using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class FlightSystemContext(DbContextOptions<FlightSystemContext> options)
 : DbContext(options)
{
    public DbSet<City> Cities => Set<City>();
    public DbSet<User> Users => Set<User>();

    public DbSet<Flight> Flights => Set<Flight>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>().HasData(
            new { CityId = 1, Name = "Beograd" },
            new { CityId = 2, Name = "Niš" },
            new { CityId = 3, Name = "Kraljevo" },
            new { CityId = 4, Name = "Priština" }
        );

        modelBuilder.Entity<User>().HasData(
            new { UserId = 1, Username = "admin",Password = "admin",Role = "admin"},
            new { UserId = 2, Username = "agent",Password = "agent",Role = "agent" },
            new { UserId = 3, Username = "visitor",Password = "visitor",Role = "visitor" }
             );
    }
}
