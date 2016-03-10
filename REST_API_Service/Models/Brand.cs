using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Stock { get; set; }
        public string LinkImage { get; set; }

        public Brand(string name, string stock, string linkImage)
        {
            Name = name;
            Stock = stock;
            LinkImage = linkImage;
        }
    }
}