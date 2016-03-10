using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    public class BrandRepository:IBrandRepository
    {
        private List<Brand> _brands = new List<Brand>();
        private int _nextId = 0;
        private const string _linkHost = "http://localhost:35819/";

        public BrandRepository()
        {
            this.Add(new Brand("Apple", "3", "images/brand_0.jpg"));
            this.Add(new Brand("HP", "2", "images/brand_1.jpg"));
            this.Add(new Brand("Asus", "2", "images/brand_2.jpg"));
            this.Add(new Brand("Samsung", "2", "images/brand_3.jpg"));
            this.Add(new Brand("Lenovo", "2", "images/brand_4.jpg"));
            this.Add(new Brand("Adobe", "1", "images/brand_5.jpg"));
            this.Add(new Brand("Microsoft", "3", "images/brand_6.jpg"));
            this.Add(new Brand("Nikon", "1", "images/brand_7.jpg"));
            this.Add(new Brand("HTC", "2", "images/brand_8.jpg"));
            this.Add(new Brand("Sony", "3", "images/brand_9.jpg"));
            this.Add(new Brand("Adidas", "1", "images/brand_10.jpg"));
            this.Add(new Brand("Nike", "3", "images/brand_11.jpg"));
            this.Add(new Brand("PT2000", "2", "images/brand_12.jpg"));
            this.Add(new Brand("Levis", "1", "images/brand_13.jpg"));
            this.Add(new Brand("RayBan", "2", "images/brand_14.jpg"));     
        }

        public IQueryable<Brand> GetAll()
        {
            return _brands.AsQueryable();
        }

        public Brand Add(Brand brand)
        {
            brand.Id = _nextId++;
            brand.LinkImage = _linkHost + brand.LinkImage;
            _brands.Add(brand);
            return brand;
        }
    }
}