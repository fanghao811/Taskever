using Abp.AutoMapper;
using System;

namespace Taskever.Tasks.Dtos
{
    [AutoMapFrom(typeof(TaskOrder))]
    public class TaskDto
    {
        public long? Id { get; set; }
        public string DeviceName { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int? CrewLeaderId { get; set; }
        public string CrewLeaderName { get; set; }
        public int? RequesterId { get; set; }
        public string RequesterName { get; set; }
        public DateTime CreationTime { get; set; }

        public byte Type { get; set; }
        public byte Priority { get; set; }
        public byte State { get; set; }

        public DateTime? DueTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
