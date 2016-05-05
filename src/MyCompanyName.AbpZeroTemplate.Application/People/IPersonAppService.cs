using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Taskever.People.Dtos;
using System.Threading.Tasks;

namespace Taskever.People
{
    public interface IPersonAppService : IApplicationService
    {
        PersonEditDto GetPersonForEdit(NullableIdInput input);
        Task<PagedResultOutput<PersonListDto>> GetPeople(GetPeopleInput input);
        Task CreateOrUpdatePerson(CreateOrUpdatePersonInput input);
        void DeletePerson(DelPersonInput input);

        Task DeletePhone(IdInput<long> input);
        Task<PhoneInPersonListDto> AddPhone(AddPhoneInput input);
    }
}
