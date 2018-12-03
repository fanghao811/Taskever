using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Taskever.Production
{
    public interface IProductAppService : IApplicationService
    {
        //PersonEditDto GetPersonForEdit(NullableIdInput input);
        //Task<PagedResultOutput<PersonListDto>> GetPeople(GetPeopleInput input);
        CreateOrUpdateProductInput GetProductForEdit(NullableIdInput input);

        Task CreateOrUpdateProduct(CreateOrUpdateProductInput input);

        Task<ListResultOutput<ProducListDto>> GetProductsInOu(long organizationUnitId);

        Task<PagedResultOutput<ProducListDto>> GetProductsFOP(GetProductInput input);

        void DeleteProduct(IdInput<long> input);
    }
}
