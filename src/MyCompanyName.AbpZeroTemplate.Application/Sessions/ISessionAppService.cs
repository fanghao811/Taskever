using System.Threading.Tasks;
using Abp.Application.Services;
using Taskever.Sessions.Dto;

namespace Taskever.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
