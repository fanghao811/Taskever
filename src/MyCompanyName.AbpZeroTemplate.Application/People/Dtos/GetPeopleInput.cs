using Abp.Application.Services.Dto;
using Abp.Runtime.Validation;
using Taskever.Dto;

namespace Taskever.People.Dtos
{
    public class GetPeopleInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public string Filter { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Name";
            }
        }
    }
}
