using Abp.Runtime.Validation;

namespace Taskever.Configuration.Host.Dto
{
    public class TenantManagementSettingsEditDto: IValidate
    {
        public bool AllowSelfRegistration { get; set; }

        public bool IsNewRegisteredTenantActiveByDefault { get; set; }

        public bool UseCaptchaOnRegistration { get; set; }

        public int? DefaultEditionId { get; set; }
    }
}