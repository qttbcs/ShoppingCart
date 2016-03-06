using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string LinkImage { get; set; }

        public Category(string name, string linkImage)
        {
            Name = name;
            LinkImage = linkImage;
        }

    }
}