using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Taskever.Authorization.Dto;

namespace Taskever.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput : IOutputDto
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}