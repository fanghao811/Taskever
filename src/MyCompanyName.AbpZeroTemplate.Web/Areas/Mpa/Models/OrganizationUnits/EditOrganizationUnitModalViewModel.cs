using Abp.AutoMapper;
using Abp.Organizations;

namespace Taskever.Web.Areas.Mpa.Models.OrganizationUnits
{
    [AutoMapFrom(typeof(OrganizationUnit))]
    public class EditOrganizationUnitModalViewModel
    {
        public long? Id { get; set; }

        public string DisplayName { get; set; }
    }
}