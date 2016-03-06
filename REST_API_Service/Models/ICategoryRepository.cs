using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    interface ICategoryRepository
    {
        IQueryable<Category> GetAll();      

        Category Add(Category category);
    }
}