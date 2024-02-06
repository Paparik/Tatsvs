using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using Domain.Entities;

namespace Tatsvs;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();

            var roles = new List<string> { "Пользователь", "Доверенный пользователь", "Модератор", "Администратор" };

            foreach (var roleName in roles)
            {
                if (!context.Roles.Any(r => r.Name == roleName))
                {
                    var result = roleManager.CreateAsync(new Role(roleName)).Result;
                }
            }
        }
    }
}