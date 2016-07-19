using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dto
{
    [AutoMapFrom(typeof(TaskOrder))]
    public class TaskEditDto
    {
        /// <summary>
        /// Set null to create a new taskOrder. Set taskOrder's Id to update a taskOrder
        /// </summary>
        public long? Id { get; set; }

        [Required]
        [MaxLength(TaskOrder.Max30)]
        public string DeviceName { get; set; }

        [MaxLength(TaskOrder.Max30)]
        public string Department { get; set; }

        [MaxLength(TaskOrder.Max100)]
        public string Description { get; set; }

        [Required]
        [MaxLength(TaskOrder.Max100)]
        public string Location { get; set; }

        public long? CrewLeaderId { get; set; }
        public string CrewLeaderName { get; set; }

        public long? RequesterId { get; set; }
        public string RequesterName { get; set; }


        public TaskType Type { get; set; }
        public TaskPriority Priority { get; set; }
        public TaskState State { get; set; }

        public DateTime? DueTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
