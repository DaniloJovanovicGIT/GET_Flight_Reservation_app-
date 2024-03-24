using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class DataExtensions
{
    public static async Task MigrateDbAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var DbContext = scope.ServiceProvider.GetRequiredService<FlightSystemContext>();
        await DbContext.Database.MigrateAsync();
    }
}
