using Backend.dtos;
using Backend.Entities;

namespace Backend.Mapping;

public static class UserMapping
{
    public static User ToEntitiy(this CreateUserDto newUser)
    {
        return new(){
            Username= newUser.Username,
            Password=newUser.Password,
            Role=newUser.Role
        };
    }

   
}
