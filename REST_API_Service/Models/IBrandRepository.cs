using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REST_API_Service.Models
{
    interface IBrandRepository
    {
        IQueryable<Brand> GetAll();

        Brand Add(Brand brand);
    }
}