using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Category { get; set; }
        public string Condition { get; set; }
        public string Brand { get; set; }
        public string Rating { get; set; }
        public string Description { get; set; }
        public string LinkImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string Availability { get; set; }

        public Product(string name, string price, string category, string condition, string brand, string rating, string linkImage)
        {
            Name = name;
            Price = price;
            Category = category;
            Condition = condition;
            Brand = brand;
            Rating = rating;
            LinkImage = linkImage;
        }
       
    }
}