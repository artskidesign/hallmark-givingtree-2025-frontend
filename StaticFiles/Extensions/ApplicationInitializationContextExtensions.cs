using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Volo.Abp;

namespace StaticFiles.Extensions
{
    public static class ApplicationInitializationContextExtensions
    {
        public static void AddConfigJs<TSettings>(this ApplicationInitializationContext context)
        {
            var appSettings = context.ServiceProvider.GetService<TSettings>();

            var app = context.GetApplicationBuilder();

            app.Map("/config.js", builder =>
            {
                builder.Run(async ctx =>
                {
                    var serializedSettings = JsonConvert.SerializeObject(appSettings, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        Converters = new List<JsonConverter> { new StringEnumConverter() },
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    });
                    ctx.Response.ContentType = "text/javascript";
                    await ctx.Response.WriteAsync($"window.config = {serializedSettings};");
                });
            });
        }
    }
}