using Microsoft.AspNetCore.Builder;

namespace StaticFiles.Extensions
{
    public static class PrelaunchAuthBuilder
    {
        public static void UsePrelaunchAuth(this IApplicationBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                if (!ctx.User.Identity.IsAuthenticated && ctx.Request.Path.Value != "/prelaunch" && !IsScraper(ctx.Request.Headers["User-Agent"]))
                {
                    ctx.Response.Redirect("/prelaunch");
                    return;
                }

                await next();
            });
        }

        private static bool IsScraper(string userAgent)
        {
            if (string.IsNullOrEmpty(userAgent))
            {
                return false;
            }
            userAgent = userAgent.ToLower();
            return userAgent.Contains("facebookexternalhit") || userAgent.Contains("facebot") ||  userAgent.Contains("twitterbot");
        }
    }
}