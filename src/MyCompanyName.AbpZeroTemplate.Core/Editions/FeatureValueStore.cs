using Abp.Application.Features;
using Taskever.Authorization.Roles;
using Taskever.Authorization.Users;
using Taskever.MultiTenancy;

namespace Taskever.Editions
{
    public class FeatureValueStore : AbpFeatureValueStore<Tenant, Role, User>
    {
        public FeatureValueStore(TenantManager tenantManager) 
            : base(tenantManager)
        {
        }
    }
}
