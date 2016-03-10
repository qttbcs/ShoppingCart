using REST_API_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace REST_API_Service.Controllers
{
    public class BrandController : ApiController
    {
        private static readonly IBrandRepository _repo = new BrandRepository();
        // GET /api/brand
        public IEnumerable<Brand> Get()
        {
            return _repo.GetAll();
        }
    }
}
