using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dtos
{
    [AutoMapFrom(typeof(TaskOrder))]
    public class CreateOrUpdateTaskInput : IInputDto
    {
        public long? Id { get; set; }
        public string DeviceName { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public long CrewLeaderId { get; set; }
        public long RequesterId { get; set; }
        public DateTime CreationTime { get; set; }

        //public byte Type { get; set; }
        //public byte Priority { get; set; }
        //public byte State { get; set; }

        public DateTime? DueTime { get; set; }
        public DateTime? EndTime { get; set; }

    }
}
