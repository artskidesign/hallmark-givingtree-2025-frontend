using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using StaticFiles.Configuration;

namespace StaticFiles.Extensions
{
    public static class AddConfigJsBuilder
    {
        public static void AddConfigJs(this IApplicationBuilder app, Settings settings)
        {
            app.Map("/config.js", builder =>
            {

                builder.Run(async context =>
                {
                   
                    var serializedSettings = JsonConvert.SerializeObject(settings, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        Converters = new List<JsonConverter> { new StringEnumConverter() },
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    });
                    await context.Response.WriteAsync($"window.config = {serializedSettings};");
                });
            });
        }
    }
}