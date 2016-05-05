using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace Taskever.People
{
    public class DelPersonInput: IInputDto
    {
        [Range(1, int.MaxValue)]
        public int PersonId { get; set; }
    }
}
