using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dto
{
    public class TaskListDto : EntityDto<long>, IHasCreationTime
    {
        public string DeviceName { get; set; }

        public string Department { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public string CrewLeaderName { get; set; }

        public string RequesterName { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskType Type { get; set; }
        public TaskPriority Priority { get; set; }
        public TaskState State { get; set; }

        public DateTime? DueTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
