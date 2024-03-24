using Backend;
using Backend.Data;
using Backend.dtos;
using Backend.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("FlightSystem");
builder.Services.AddSqlite<FlightSystemContext>(connString);

var app = builder.Build();

app.MapFlightsEndpoints();
app.MapCitiesEndpoints();

await app.MigrateDbAsync();

app.Run();
