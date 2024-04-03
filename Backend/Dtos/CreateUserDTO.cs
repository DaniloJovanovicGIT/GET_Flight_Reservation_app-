using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class CreateUserDto
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password{ get; set; }
        [Required]
        public required string Role { get; set; } 
    
    }
}