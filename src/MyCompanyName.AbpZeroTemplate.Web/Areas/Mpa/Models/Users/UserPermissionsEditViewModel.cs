using Abp.AutoMapper;
using Taskever.Authorization.Users;
using Taskever.Authorization.Users.Dto;
using Taskever.Web.Areas.Mpa.Models.Common;

namespace Taskever.Web.Areas.Mpa.Models.Users
{
    [AutoMapFrom(typeof(GetUserPermissionsForEditOutput))]
    public class UserPermissionsEditViewModel : GetUserPermissionsForEditOutput, IPermissionsEditViewModel
    {
        public User User { get; private set; }

        public UserPermissionsEditViewModel(GetUserPermissionsForEditOutput output, User user)
        {
            User = user;
            output.MapTo(this);
        }
    }
}