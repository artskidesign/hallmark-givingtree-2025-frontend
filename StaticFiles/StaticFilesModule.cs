using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using StaticFiles.Configuration;
using StaticFiles.Extensions;
using StormIdeas.Config;
using Volo.Abp;
using Volo.Abp.AspNetCore;
using Volo.Abp.Modularity;


namespace StaticFiles
{
    [DependsOn(typeof(AbpAspNetCoreModule))]
    public class StaticFilesModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.RegisterSettings(typeof(StaticFilesModule).Assembly);
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var prelaunchSettings = context.Services.BuildServiceProvider().GetService<PrelaunchSettings>();

            if (prelaunchSettings.Enabled)
            {
                context.Services.AddDbContext<IdentityDbContext>(options => options.UseInMemoryDatabase("StaticFilesDatabase"));
                context.Services.AddDefaultIdentity<IdentityUser>(options =>
                {
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 8;
                }).AddEntityFrameworkStores<IdentityDbContext>();
            }

            context.Services.AddMvc();
        }

        public override void PostConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddResponseCompression();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();

            var prelaunchSettings = context.ServiceProvider.GetService<PrelaunchSettings>();
            if (prelaunchSettings.Enabled)
            {
                app.SeedAdmin();

                app.UseRouting();
            }

            app.UseStaticFiles();
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();

            app.UseResponseCompression();

            app.UseAuthentication();
            app.UseAuthorization();

            var prelaunchSettings = context.ServiceProvider.GetService<PrelaunchSettings>();
            if (prelaunchSettings.Enabled)
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapRazorPages();
                });

                app.UsePrelaunchAuth();
            }

            context.AddConfigJs<Settings>();
        }

        public override void OnPostApplicationInitialization(ApplicationInitializationContext context)
        {
            context.GetApplicationBuilder().UseSpa(spa =>
            {
                spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
                {
                    OnPrepareResponse = ctx =>
                    {
                        var indexHtml = ctx.File.Name.Contains("index");
                        if (indexHtml)
                        {
                            var headers = ctx.Context.Response.GetTypedHeaders();
                            headers.CacheControl = new CacheControlHeaderValue
                            {
                                Public = true,
                                MaxAge = TimeSpan.FromDays(0),
                                NoCache = true
                            };
                        }
                    }
                };
            });
        }
    }
}