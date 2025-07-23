using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using StormIdeas.Config.Attributes;

namespace StormIdeas.Config
{
    public static class RegisterSettingsExtension
    {
        public static void RegisterSettings(this IServiceCollection services)
        {
            services.RegisterSettings(AppDomain.CurrentDomain.GetAssemblies().Where(x => !x.IsDynamic).ToArray());
        }

        public static void RegisterSettings<T>(this IServiceCollection services)
        {
            services.RegisterSettings(typeof(T).Assembly);
        }

        public static void RegisterSettings(this IServiceCollection services, params Assembly[] assemblies)
        {
            var configuration = services.GetConfiguration();

            var logger = Log.ForContext<StormIdeasConfigModule>();

            logger.Information("Registering Settings: ");

            foreach (var assembly in assemblies.Where(x => !x.IsDynamic))
            {
                var settings = assembly.GetExportedTypes()
                    .Where(x => x.GetCustomAttributes(typeof(AppSettingsAttribute), true).Any())
                    .ToList();

                foreach (var settingType in settings)
                {
                    var attribute = settingType.GetCustomAttribute<AppSettingsAttribute>(true);
                    var keyPrefix = attribute.KeyPrefix;

                    var instance = Activator.CreateInstance(settingType);
                    var configurationSection = configuration.GetSection(keyPrefix);

                    if (configurationSection.Exists() || !attribute.Optional)
                    {
                        configurationSection.Bind(instance);

                        foreach (var property in settingType.GetProperties())
                        {
                            var propertyValue = property.GetValue(instance);
                            var optionalProperty = property.GetCustomAttribute<IfExistsAttribute>() != null;
                            if (!optionalProperty && propertyValue == null)
                            {
                                throw new ArgumentNullException(property.Name,
                                    $"No value for {property.Name} defined in settings {settingType.Name} was found in any configuration.");
                            }
                        }
                    }

                    logger.Information($"- {settingType.FullName}");
                    services.AddSingleton(settingType, instance);

                    RegisterInterface(services, settingType, instance);
                }
            }

            logger.Information("Successfully registered Settings.");
        }

        private static void RegisterInterface(IServiceCollection services, Type settingType, object settings)
        {
            var interfaces = settingType.GetInterfaces();

            foreach (var @interface in interfaces)
            {
                services.AddSingleton(@interface, settings);
            }
        }
    }
}