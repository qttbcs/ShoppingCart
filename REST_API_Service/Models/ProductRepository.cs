using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace REST_API_Service.Models
{
    public class ProductRepository : IProductRepository
    {
        private List<Product> _products = new List<Product>();
        private int _nextId = 0;
        private const string _linkHost = "http://localhost:35819/";

        public ProductRepository()
        {
            this.Add(new Product("Build your own computer", "1200", "Desktops", "New", "Asus", "4", "images/product_0.jpeg"));
            this.Add(new Product("Digital Storm VANQUISH 3 Custom Performance PC", "1259", "Desktops", "Sale", "Samsung", "0", "images/product_1.jpeg"));
            this.Add(new Product("Lenovo IdeaCentre 600 All-in-One PC", "500", "Desktops", "New", "Lenovo", "3", "images/product_2.jpeg"));
            this.Add(new Product("Apple MacBook Pro 13-inch", "1800", "Notebooks", "New", "Apple", "5", "images/product_3.jpeg"));
            this.Add(new Product("Asus N551JK-XO076H Laptop", "1500", "Notebooks", "New", "Asus", "4", "images/product_4.jpeg"));
            this.Add(new Product("HP Envy 6-1180ca 15.6-Inch Sleekbook", "1460", "Notebooks", "Sale", "HP", "0", "images/product_5.jpeg"));
            this.Add(new Product("HP Spectre XT Pro UltraBook", "1350", "Notebooks", "New", "HP", "0", "images/product_6.jpeg"));
            this.Add(new Product("Lenovo Thinkpad X1 Carbon Laptop", "1360", "Notebooks", "Sale", "Lenovo", "4", "images/product_7.jpeg"));
            this.Add(new Product("Samsung Series 9 NP900X4C Premium Ultrabook", "1590", "Notebooks", "New", "Samsung", "5", "images/product_8.jpeg"));
            this.Add(new Product("Adobe Photoshop CS4", "75", "Software", "Sale", "Adobe", "3", "images/product_9.jpeg"));
            this.Add(new Product("Sound Forge Pro 11", "54", "Software", "Sale", "Microsoft", "2", "images/product_10.jpeg"));
            this.Add(new Product("Windows 8 Pro", "65", "Software", "Sale", "Microsoft", "5", "images/product_11.jpeg"));
            this.Add(new Product("Nikon D5500 DSLR", "630", "Camera", "Sale", "Nikon", "0", "images/product_12.jpeg"));
            this.Add(new Product("Apple iCam", "1300", "Camera", "New", "Apple", "4", "images/product_13.jpeg"));
            this.Add(new Product("Leica T Mirrorless Digital Camera", "530", "Camera", "New", "Apple", "5", "images/product_14.jpeg"));
            this.Add(new Product("HTC One M8 Android L 5.0 Lollipop", "245", "CellPhones", "New", "HTC", "0", "images/product_15.jpeg"));
            this.Add(new Product("HTC One Mini Blue", "100", "CellPhones", "New", "HTC", "4", "images/product_16.jpeg"));
            this.Add(new Product("Nokia Lumia 1020", "349", "CellPhones", "New", "Microsoft", "0", "images/product_17.jpeg"));
            this.Add(new Product("Beats Pill 2.0 Wireless Speaker", "15", "Others", "New", "Sony", "2", "images/product_18.jpeg"));
            this.Add(new Product("Portable Sound Speakers", "37", "Others", "New", "Sony", "4", "images/product_19.jpeg"));
            this.Add(new Product("Universal 7-8 Inch Tablet Cover", "39", "Others", "New", "Sony", "4", "images/product_20.jpeg"));
            this.Add(new Product("adidas Consortium Campus 80s Running Shoes", "28", "Shoes", "New", "Adidas", "4", "images/product_21.jpg"));
            this.Add(new Product("Nike Floral Roshe Customized Running Shoes", "40", "Shoes", "New", "Nike", "5", "images/product_22.jpg"));
            this.Add(new Product("Nike SB Zoom Stefan Janoski “Medium Mint”", "30", "Shoes", "New", "Nike", "4", "images/product_23.jpg"));
            this.Add(new Product("Custom T-Shirt", "15", "Clothing", "New", "PT2000", "4", "images/product_24.jpeg"));
            this.Add(new Product("Levi's 511 Jeans", "35", "Clothing", "New", "Levis", "4", "images/product_25.jpg"));
            this.Add(new Product("Nike Tailwind Loose Short-Sleeve Running Shirt", "15", "Clothing", "New", "Nike", "4", "images/product_26.jpg"));
            this.Add(new Product("Oversized Women T-Shirt", "16", "Clothing", "New", "PT2000", "4", "images/product_27.jpg"));
            this.Add(new Product("Obey Propaganda Hat", "30", "Accessories", "New", "Obey", "4", "images/product_28.jpg"));
            this.Add(new Product("Ray Ban Aviator Sunglasses", "25", "Accessories", "New", "RayBan", "5", "images/product_29.jpg"));
            this.Add(new Product("Reversible Horseferry Check Belt", "45", "Accessories", "New", "RayBan", "4", "images/product_30.jpeg"));
            this.Add(new Product("If You Wait", "3", "Digital", "New", "LondonGrammar", "4", "images/product_31.jpeg"));
            this.Add(new Product("Night Visions", "3", "Digital", "New", "ImagineDragons", "4", "images/product_32.jpeg"));
            this.Add(new Product("Science & Faith", "4", "Digital", "New", "TheScript", "4", "images/product_33.jpeg"));
            this.Add(new Product("Fahrenheit 451 by Ray Bradbury", "27", "Books", "New", "None", "0", "images/product_34.jpeg"));
            this.Add(new Product("First Prize Pies", "51", "Books", "New", "None", "4", "images/product_35.jpeg"));
            this.Add(new Product("Pride and Prejudice", "24", "Books", "New", "None", "4", "images/product_36.jpeg"));
            this.Add(new Product("Elegant Gemstone Necklace", "569", "Jewelry", "New", "P&G", "3", "images/product_37.jpg"));
            this.Add(new Product("Flower Girl Bracelet", "360", "Jewelry", "New", "P&G", "0", "images/product_38.jpg"));
            this.Add(new Product("Vintage Style Engagement Ring", "2100", "Jewelry", "New", "P&G", "4", "images/product_39.jpg"));
            this.Add(new Product("$25 Virtual Gift Card", "25", "GiftCards", "New", "None", "4", "images/product_40.jpeg"));
            this.Add(new Product("$50 Physical Gift Card", "50", "GiftCards", "New", "None", "4", "images/product_41.jpeg"));
            this.Add(new Product("$100 Physical Gift Card", "100", "GiftCards", "New", "None", "4", "images/product_42.jpeg"));

        }

        public IQueryable<Product> GetAll()
        {
            return _products.AsQueryable();
        }

        public IQueryable<Product> Get(string category)
        {
            return _products.FindAll(i => i.Category == category).AsQueryable();
        }
        public Product Get(int id)
        {
            return _products.Find(i => i.Id == id);
        }
        public Product Add(Product product)
        {
            product.Id = _nextId++;
            product.Description = "Integer congue orci enim, vitae sagittis odio gravida et. Ut volutpat quam et turpis gravida posuere. In accumsan efficitur diam.";
            product.LinkImage = _linkHost + product.LinkImage;
            product.CreatedAt = DateTime.Today;
            product.CreatedBy = "PhanThanhTuan";
            product.Availability = "In stock";
            _products.Add(product);
            return product;
        }
    }
}