using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Taskever.Production
{
    public class ProductAppService : TaskeverAppServiceBase, IProductAppService //Optionally, you can derive from ApplicationService as we did for TaskAppService class.
    {
        private readonly IRepository<Product, long> _productRepository;

        //ABP provides that we can directly inject IRepository<Product> (without creating any repository class)
        public ProductAppService(IRepository<Product, long> productRepository)
        {
            _productRepository = productRepository;
        }

        /// <summary>
        /// 1.增改
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateProduct(CreateOrUpdateProductInput input)
        {
            if (input.Id.HasValue)
            {
                await UpdateProduct(input);
            }
            else
            {
                await CreateProduct(input);
            }
        }


        //[AbpAuthorize("Administration.ProductManagement.CreateProduct")]
        /// <summary>
        /// 2.增加
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateProduct(CreateOrUpdateProductInput input)
        {
            //c product = new Product
            //{
            //    DepartmentOuId = input.DepartmentOuId,
            //    LocationOuId = input.LocationOuId,
            //    CategoryOuId = input.CategoryOuId,
            //    Name = input.Name,
            //};

            var product = input.MapTo<Product>();

            await _productRepository.InsertAsync(product);
        }

        public async Task UpdateProduct(CreateOrUpdateProductInput input)
        {
            Debug.Assert(input.Id != null, "input.Product.Id should be set.");

            var product = await _productRepository.GetAsync(input.Id.Value);
            product.Name = input.Name;

            await _productRepository.UpdateAsync(product);
        }

        public async Task<ListResultOutput<ProducListDto>>  GetProductsInOu(long organizationUnitId)
        {
            var query = await _productRepository.GetAll()
                                .Include(p => p.Category)
                                .Where(p=>p.CategoryOuId== organizationUnitId).ToListAsync();

            var products = from product in query
                             select new ProducListDto
                             {
                                 Id = product.Id,
                                 Name = product.Name,
                                 ProductNumber =product.ProductNumber,
                                 Abbreviation=product.Abbreviation,
                                 MnemonicCode=product.ModelNumber,
                                 ModelNumber=product.ModelNumber,
                                 Specification= product.Specification,
                                 Unit= product.Unit,
                                 Description = product.Description,

                                 Category = product.Category.DisplayName,
                             };
            return new ListResultOutput<ProducListDto>(products.MapTo<List<ProducListDto>>());
        }

    }
}
