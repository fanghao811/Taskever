using System.Web.Mvc;

namespace Taskever.Web.Controllers
{
    public class AboutController : TaskeverControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}