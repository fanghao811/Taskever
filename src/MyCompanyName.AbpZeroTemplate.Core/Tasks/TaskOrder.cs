using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Taskever.Tasks.Emun;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using Taskever.Authorization.Users;

namespace Taskever.Tasks
{
    [Table("TaskOrder", Schema = "Tasks")]
    public class TaskOrder : Entity<long>, IHasCreationTime
    {
        public const int Max30 = 30;
        public const int Max100 = 100;
        
        [Required]
        [MaxLength(Max30)]
        public string DeviceName { get; set; }

        //Todo:关联科室
        [MaxLength(Max30)]
        public string Department { get; set; }

        //报修地址
        [MaxLength(Max100)]
        public string Location { get; set; }

        //故障描述
        [Required]
        [MaxLength(Max100)]
        public string Description { get; set; }

        //报修员工 QA:存在级联或者重复
        [ForeignKey("RequesterId")] 
        public virtual User Requester { get; set; }
        public virtual long? RequesterId { get; set; }

        //负责人
        [ForeignKey("CrewLeaderId")]
        public virtual User CrewLeader { get; set; }
        public virtual long? CrewLeaderId { get; set; }

        public virtual ICollection<User> Members { get; set; }

        public TaskType Type { get; set; }
        public TaskPriority Priority { get; set; }
        public TaskState State { get; set; }

        public DateTime? DueTime { get; set; }
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// Creation date of this entity.
        /// </summary>
        public DateTime CreationTime { get; set; }

        //构造函数
        public TaskOrder()
        {
            Type = TaskType.Others;
            Priority = TaskPriority.中;
            State = TaskState.待分配;
            CreationTime = DateTime.Now;
        }

    }
}
