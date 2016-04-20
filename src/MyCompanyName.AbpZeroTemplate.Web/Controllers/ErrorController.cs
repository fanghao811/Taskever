using System.Web.Mvc;
using Abp.Auditing;

namespace Taskever.Web.Controllers
{
    public class ErrorController : TaskeverControllerBase
    {
        [DisableAuditing]
        public ActionResult E404()
        {
            return View();
        }
    }
}