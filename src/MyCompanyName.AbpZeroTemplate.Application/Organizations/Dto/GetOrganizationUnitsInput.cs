using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace Taskever.Organizations.Dto
{
    public class GetOrganizationUnitsInput : IInputDto
    {
        [Range(1, long.MaxValue)]
        public long Id { get; set; }
    }
}
