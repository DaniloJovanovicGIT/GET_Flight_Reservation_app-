using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class FlightSystemContext : DbContext
    {
        public DbSet<City> Cities => Set<City>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Flight> Flights => Set<Flight>();
        public DbSet<Reservation> Reservations => Set<Reservation>();

        public FlightSystemContext(DbContextOptions<FlightSystemContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(
                new { CityId = 1, Name = "Beograd" },
                new { CityId = 2, Name = "Niš" },
                new { CityId = 3, Name = "Kraljevo" },
                new { CityId = 4, Name = "Priština" }
            );

            modelBuilder.Entity<User>().HasData(
                new { UserId = 1, Username = "admin", Password = "admin", Role = "admin" },
                new { UserId = 2, Username = "agent", Password = "agent", Role = "agent" },
                new { UserId = 3, Username = "visitor", Password = "visitor", Role = "visitor" },
                new { UserId = 4, Username = "agent1", Password = "agent1", Role = "agent" },
                new { UserId = 5, Username = "agent2", Password = "agent2", Role = "agent" },
                new { UserId = 6, Username = "visitor1", Password = "visitor1", Role = "visitor" },
                new { UserId = 7, Username = "visitor2", Password = "visitor2", Role = "visitor" },
                new { UserId = 8, Username = "visitor3", Password = "visitor3", Role = "visitor" },
                new { UserId = 9, Username = "visitor4", Password = "visitor4", Role = "visitor" }
            );
        }
    }
}
