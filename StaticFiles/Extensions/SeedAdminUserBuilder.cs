using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using StaticFiles.Configuration;

namespace StaticFiles.Extensions
{
    public static class SeedAdminUserBuilder
    {
        public static void SeedAdmin(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
                var settings = scope.ServiceProvider.GetRequiredService<PrelaunchSettings>();

                var user = new IdentityUser(settings.Username);
                var result = userManager.CreateAsync(user, settings.Password).Result;
                if (!result.Succeeded)
                {
                    var errors = string.Join(',', result.Errors.Select(x => $"{x.Code}: {x.Description}"));
                    throw new Exception($"Failed to create admin user with errors: {errors}");
                }
            }
        }
    }
}