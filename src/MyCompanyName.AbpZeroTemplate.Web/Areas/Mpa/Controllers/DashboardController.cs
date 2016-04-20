using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using Taskever.Authorization;
using Taskever.Web.Controllers;

namespace Taskever.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Tenant_Dashboard)]
    public class DashboardController : TaskeverControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}