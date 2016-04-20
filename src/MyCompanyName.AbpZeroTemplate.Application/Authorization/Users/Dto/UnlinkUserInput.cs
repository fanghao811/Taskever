using Abp.Application.Services.Dto;

namespace Taskever.Authorization.Users.Dto
{
    public class UnlinkUserInput : IInputDto
    {
        public long UserId { get; set; }
    }
}