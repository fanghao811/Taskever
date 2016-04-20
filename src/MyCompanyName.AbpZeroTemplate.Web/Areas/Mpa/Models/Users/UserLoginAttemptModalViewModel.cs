using System.Collections.Generic;
using Taskever.Authorization.Users.Dto;

namespace Taskever.Web.Areas.Mpa.Models.Users
{
    public class UserLoginAttemptModalViewModel
    {
        public List<UserLoginAttemptDto> LoginAttempts { get; set; }
    }
}