using Abp.Application.Services;
using System.Threading.Tasks;

namespace Taskever.Production
{
    public interface IProductAppService : IApplicationService
    {
        //PersonEditDto GetPersonForEdit(NullableIdInput input);
        //Task<PagedResultOutput<PersonListDto>> GetPeople(GetPeopleInput input);
        Task CreateOrUpdateProduct(CreateOrUpdateProductInput input);
        //void DeletePerson(DelPersonInput input);

        //Task DeletePhone(IdInput<long> input);
        //Task<PhoneInPersonListDto> AddPhone(AddPhoneInput input);
    }
}
