namespace StaticFiles.Extensions
{
    public static class StringExtensions
    {
        public static bool IsScraper(this string userAgent)
        {
            if (string.IsNullOrEmpty(userAgent))
            {
                return false;
            }
            return userAgent.ToLower().Contains("facebookexternalhit")
                   || userAgent.ToLower().Contains("facebot")
                   || userAgent.ToLower().Contains("twitterbot");
        }
    }
}