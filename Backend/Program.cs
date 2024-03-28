using System.Text;
using Backend;
using Backend.Data;
using Backend.dtos;
using Backend.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//CORS
builder.Services.AddCors();
//BAZA
var connString = builder.Configuration.GetConnectionString("FlightSystem");
builder.Services.AddSqlite<FlightSystemContext>(connString);
//AUTH
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
//CORS POLICY
var app = builder.Build();
app.UseCors(builder => 
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
);
//ENPOINT
app.MapAuthEndpoints();
app.MapFlightsEndpoints().RequireAuthorization();
app.MapCitiesEndpoints().RequireAuthorization();
//OSVEZI BAZU
await app.MigrateDbAsync();
//POKRENI
app.Run();
