using Backend.dtos;
using Backend.Entities;

namespace Backend.Mapping;

public static class CityMapping
{
    public static City ToEntitiy(this CityDto city)
    {
        return new(){
            CityId= city.Id,
            Name = city.Name
        };
    }

    public static CityDto toDto(this City city)
    {
        return new(
               city.CityId,
               city.Name
           );
    }
}
