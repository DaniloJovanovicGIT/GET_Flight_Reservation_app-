using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var DbContext = scope.ServiceProvider.GetRequiredService<FlightSystemContext>();
        DbContext.Database.Migrate();
    }
}
