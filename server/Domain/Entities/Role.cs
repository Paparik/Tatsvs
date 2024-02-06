using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class Role : IdentityRole
{

    public Role()
    {

    }

    public Role(string role)
    {
        Name = role;
    }
}