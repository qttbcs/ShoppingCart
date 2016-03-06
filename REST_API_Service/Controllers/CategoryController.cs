using REST_API_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace REST_API_Service.Controllers
{
    public class CategoryController : ApiController
    {
        private static readonly ICategoryRepository _repo = new CategoryRepository();
        // GET /api/category
        public IEnumerable<Category> Get()
        {
            return _repo.GetAll();
        }
    }
}
