using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    public class CategoryRepository:ICategoryRepository
    {
        private List<Category> _categories = new List<Category>();
        private int _nextId = 0;
        private const string _linkHost = "http://localhost:35819/";

        public CategoryRepository()
        {
            this.Add(new Category("Desktops", "images/category_0.jpg"));
            this.Add(new Category("Notebooks", "images/category_1.jpg"));
            this.Add(new Category("Software", "images/category_2.jpg"));
            this.Add(new Category("Camera", "images/category_3.jpeg"));
            this.Add(new Category("CellPhones", "images/category_4.jpeg"));
            this.Add(new Category("Others", "images/category_5.jpeg"));
            this.Add(new Category("Shoes", "images/category_6.jpeg"));
            this.Add(new Category("Clothing", "images/category_7.jpeg"));
            this.Add(new Category("Accessories", "images/category_8.jpg"));
            this.Add(new Category("Digital", "images/category_9.jpeg"));
            this.Add(new Category("Books", "images/category_10.jpeg"));
            this.Add(new Category("Jewelry", "images/category_11.jpeg"));
            this.Add(new Category("GiftCards", "images/category_12.jpeg"));
        }

        public IQueryable<Category> GetAll()
        {
            return _categories.AsQueryable();
        }

        public Category Add(Category category)
        {
            category.Id = _nextId++;
            category.Description = "Integer congue orci enim, vitae sagittis odio gravida et. Ut volutpat quam et turpis gravida posuere. In accumsan efficitur diam.";
            category.LinkImage = _linkHost + category.LinkImage;
            _categories.Add(category);
            return category;
        }
      
    }
}