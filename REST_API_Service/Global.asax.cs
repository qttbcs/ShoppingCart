using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using REST_API_Service.Models;

namespace REST_API_Service
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Formatters.Add(new SyndicationFeedFormatter());
            GlobalConfiguration.Configure(WebApiConfig.Register);
            
        }
    }
}
