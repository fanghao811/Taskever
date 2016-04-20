using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using Taskever.Web.Controllers;

namespace Taskever.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class WelcomeController : TaskeverControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}