using Abp.Web.Mvc.Views;

namespace Taskever.Web.Views
{
    public abstract class TaskeverWebViewPageBase : TaskeverWebViewPageBase<dynamic>
    {

    }

    public abstract class TaskeverWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected TaskeverWebViewPageBase()
        {
            LocalizationSourceName = TaskeverConsts.LocalizationSourceName;
        }
    }
}