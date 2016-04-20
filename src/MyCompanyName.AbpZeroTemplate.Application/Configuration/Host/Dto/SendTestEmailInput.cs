using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Taskever.Authorization.Users;

namespace Taskever.Configuration.Host.Dto
{
    public class SendTestEmailInput : IInputDto
    {
        [Required]
        [MaxLength(User.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }
    }
}