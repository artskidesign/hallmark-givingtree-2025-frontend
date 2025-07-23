using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StaticFiles.Configuration;

namespace StaticFiles.Extensions
{
    public static class AddReactAppBuilder
    {
        public static void AddReactApp(this IApplicationBuilder app, IHostingEnvironment env, Settings settings)
        {
            app.Run(async context =>
            {
                //var userAgent = context.Request.Headers["User-Agent"].FirstOrDefault();
                //if (userAgent.IsScraper())
                //{
                //    context.Response.ContentType = "text/html";
                //    var ogDataResult = new OgDataResult(settings).BuildOgData();
                //    await context.Response.WriteAsync(ogDataResult);
                //}
                //else
                //{
                //    context.Response.ContentType = "text/html";
                //    await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
                //}

                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });
        }
    }
}