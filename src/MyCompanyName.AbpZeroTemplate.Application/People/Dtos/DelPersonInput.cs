using Abp.Application.Services.Dto;

namespace Taskever.People
{
    public class DelPersonInput: IInputDto
    {
        public int PersonId { get; set; }
    }
}
