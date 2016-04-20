using Abp.WebApi.Controllers;

namespace Taskever.WebApi
{
    public abstract class TaskeverApiControllerBase : AbpApiController
    {
        protected TaskeverApiControllerBase()
        {
            LocalizationSourceName = TaskeverConsts.LocalizationSourceName;
        }
    }
}