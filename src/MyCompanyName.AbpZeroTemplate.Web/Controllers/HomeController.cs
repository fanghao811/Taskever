using System.Web.Mvc;

namespace Taskever.Web.Controllers
{
    public class HomeController : TaskeverControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}