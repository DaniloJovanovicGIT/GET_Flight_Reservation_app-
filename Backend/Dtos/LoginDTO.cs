using System.ComponentModel.DataAnnotations;

namespace Backend;

public record class LoginDTO(
    [Required] string Username,
    [Required] string Password
);

