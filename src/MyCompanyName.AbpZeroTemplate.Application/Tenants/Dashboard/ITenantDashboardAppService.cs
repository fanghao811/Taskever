using Abp.Application.Services;
using Taskever.Tenants.Dashboard.Dto;

namespace Taskever.Tenants.Dashboard
{
    public interface ITenantDashboardAppService : IApplicationService
    {
        GetMemberActivityOutput GetMemberActivity();
    }
}
