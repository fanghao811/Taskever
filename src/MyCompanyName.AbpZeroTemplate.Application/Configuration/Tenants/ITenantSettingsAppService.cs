using System.Threading.Tasks;
using Abp.Application.Services;
using Taskever.Configuration.Tenants.Dto;

namespace Taskever.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);
    }
}
