using Abp.Domain.Repositories;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskever.Production
{
    public class ProductManager : IDomainService
    {
        private readonly IRepository<Product,long> _productRepository;

        public ProductManager(IRepository<Product,long> productRepository)
        {
            _productRepository = productRepository;
        }

        public List<Product> GetProductsInOu(long organizationUnitId)
        {
            return _productRepository.GetAllList(p => p.DepartmentOuId == organizationUnitId);
        }
    }
}
