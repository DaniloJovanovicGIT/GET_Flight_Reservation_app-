using Backend.dtos;

namespace Backend.Endpoints;

public static class CitiesEndpoints
{
    const string GetCityEndpointName = "GetCity";

    private static readonly List<CityDto> cities = [new(1, "Beograd"), new(2, "Niš"), new(3, "Kraljevo"), new(4, "Priština")];

    public static RouteGroupBuilder MapCitiesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("cities").WithParameterValidation();

        //GET /cities
        group.MapGet("/", () => cities);

        //get /cities/1
        group.MapGet("/{id}", (int id) =>
        {
            CityDto? city = cities.Find(city => city.Id == id);
            return city is null ? Results.NotFound() : Results.Ok(city);
        }).WithName(GetCityEndpointName);

        return group;
    }

}
