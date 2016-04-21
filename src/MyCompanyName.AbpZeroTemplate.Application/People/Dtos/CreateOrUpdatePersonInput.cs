using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace Taskever.People.Dtos
{
    public class CreateOrUpdatePersonInput : IInputDto
    {
        [Required]
        public PersonEditDto person { get; set; }
    }
}
