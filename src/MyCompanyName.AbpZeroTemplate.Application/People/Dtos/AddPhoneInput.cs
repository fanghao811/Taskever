using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;
using Taskever.People.Emun;

namespace Taskever.People.Dtos
{
    [AutoMapTo(typeof(PersonPhone))]
    public class AddPhoneInput : IInputDto
    {
        [Range(1, int.MaxValue)]
        public int PersonId { get; set; }

        [Required]
        public PhoneNumberType PhoneNumberType { get; set; }

        [Required]
        [MaxLength(PersonPhone.MaxNumberLength)]
        public string PhoneNumber { get; set; }
    }
}
