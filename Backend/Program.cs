using System.Text;
using Backend;
using Backend.Data;
using Backend.dtos;
using Backend.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//ADD CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});
//ADD BAZA
var connString = builder.Configuration.GetConnectionString("FlightSystem");
builder.Services.AddSqlite<FlightSystemContext>(connString);

//ADD SIGNALR
builder.Services.AddSignalR();

//ADD AUTH
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Authentication:Schemes:Bearer:ValidIssuer"],
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Authentication:Schemes:Bearer:IssuerSigningKey"]))
        };
    });
builder.Services.AddAuthorization();
//BUILD
var app = builder.Build();
//CORS POLICY

app.UseCors("AllowFrontend");

//MIDDLE SIGNAL R
app.MapHub<ReservationHub>("/reservationhub");

//ENPOINT
app.MapAuthEndpoints();
app.MapFlightsEndpoints().RequireAuthorization();
app.MapCitiesEndpoints().RequireAuthorization();
app.MapUsersEndpoints().RequireAuthorization();
//OSVEZI BAZU
await app.MigrateDbAsync();
//POKRENI
app.Run();
