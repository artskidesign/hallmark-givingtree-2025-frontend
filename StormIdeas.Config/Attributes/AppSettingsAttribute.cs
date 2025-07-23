using System;

namespace StormIdeas.Config.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class AppSettingsAttribute : Attribute
    {
        public string KeyPrefix { get; }
        public bool Optional { get; set; }

        public AppSettingsAttribute(string keyPrefix)
        {
            KeyPrefix = keyPrefix;
        }
    }
}