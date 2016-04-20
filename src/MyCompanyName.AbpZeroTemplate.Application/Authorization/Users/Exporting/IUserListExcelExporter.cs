using System.Collections.Generic;
using Taskever.Authorization.Users.Dto;
using Taskever.Dto;

namespace Taskever.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}