using System.ComponentModel.DataAnnotations;

namespace Tatsvs.Models;

public class AuthModel
{
    [Required(ErrorMessage = "Имя пользователя обязательно для заполнения.")]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Пароль обязателен для заполнения.")]
    public string? Password { get; set; }
}