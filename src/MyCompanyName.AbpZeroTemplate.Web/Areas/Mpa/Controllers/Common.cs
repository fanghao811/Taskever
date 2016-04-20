using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using Taskever.Web.Areas.Mpa.Models.Common.Modals;
using Taskever.Web.Controllers;

namespace Taskever.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class CommonController : TaskeverControllerBase
    {
        public PartialViewResult LookupModal(LookupModalViewModel model)
        {
            return PartialView("Modals/_LookupModal", model);
        }
    }
}