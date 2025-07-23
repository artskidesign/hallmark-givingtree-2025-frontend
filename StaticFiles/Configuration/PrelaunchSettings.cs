using StormIdeas.Config.Attributes;

namespace StaticFiles.Configuration
{
    [AppSettings("Prelaunch")]
    public class PrelaunchSettings
    {
        [IfExists]
        public bool Enabled { get; set; }
        [IfExists]
        public string Username { get; set; } = "admin";
        [IfExists]
        public string Password { get; set; }
    }
}