using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REST_API_Service.Models
{
    interface IProductRepository
    {
        IQueryable<Product> GetAll();
        IQueryable<Product> GetSale();
        IQueryable<Product> GetBrand(string brand);
        IQueryable<Product> GetCategory(string category);
        Product Get(int id);
        Product Add(Product product);
    }
}
