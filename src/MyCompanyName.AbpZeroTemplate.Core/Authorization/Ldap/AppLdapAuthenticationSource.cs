using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using Taskever.Authorization.Users;
using Taskever.MultiTenancy;

namespace Taskever.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}
