using System.Threading.Tasks;
using Abp.Application.Services;
using Taskever.Configuration.Host.Dto;

namespace Taskever.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
