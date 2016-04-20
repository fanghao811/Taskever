using Abp.Domain.Services;

namespace Taskever
{
    public abstract class TaskeverDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected TaskeverDomainServiceBase()
        {
            LocalizationSourceName = TaskeverConsts.LocalizationSourceName;
        }
    }
}
