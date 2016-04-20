using Abp.Authorization;
using Taskever.Authorization.Roles;
using Taskever.Authorization.Users;
using Taskever.MultiTenancy;

namespace Taskever.Authorization
{
    /// <summary>
    /// Implements <see cref="PermissionChecker"/>.
    /// </summary>
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
