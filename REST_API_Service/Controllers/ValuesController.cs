using REST_API_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace REST_API_Service.Controllers
{
    public class ValuesController : ApiController
    {
        private static readonly IProductRepository _repo = new ProductRepository();
        // GET /api/values
        public IEnumerable<Product> Get()
        {
            return _repo.GetAll();
        }

        // GET /api/getCategory/Desktops
        [Route("api/getCategory/{category}")]
        [ActionName("GetByCategory")]
        public IEnumerable<Product> Get(string category)
        {
            return _repo.Get(category);
        }

        // GET /api/getId/5
        [Route("api/getId/{id}")]
        [ActionName("GetById")]
        public Product Get(int id)
        {
            return _repo.Get(id);
        }
    }
}
