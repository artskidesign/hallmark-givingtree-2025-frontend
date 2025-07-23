using System;

namespace Hallmark.GivingTree.FrontEnd {
public class Settings
    {
       public string ApiUrl { get; set; }
       public string ApiShareUrl { get; set; }
        public string AppUrl { get; set; }
        public string FacebookAppId {get; set;}
        public bool EnableGoogleAnalytics { get; set; }
        public bool EnableOmniture { get; set; }
        public bool EnableComScore { get; set; }
        public bool EnableFreewheel { get; set; }
        public string GoogleAnalyticsWebPropertyId { get; set; }
        public string CrossDomainGoogleAnalyticsWebPropertyId { get; set; }
        public int NetworkId { get; set; }
        public string ServerUrl { get; set; }
        public string ProfileId { get; set; }
        public string SiteSectionId { get; set; }
        public string NavBarColor { get; set; }
        public string NavBarLink { get; set; }
        public string NavBarFranchise { get; set; } 
        public string TreeImage { get; set; } 

        public string TweetGeneric { get; set; } 
        public string TweetMyTree { get; set; } 
        public string PinterestGeneric { get; set; } 
        public string PinterestMyTree { get; set; } 
    }
}
 