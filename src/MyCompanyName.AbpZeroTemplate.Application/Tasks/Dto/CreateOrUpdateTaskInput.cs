using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dto
{
    public class CreateOrUpdateTaskInput : IInputDto
    {
        [Required]
        public TaskEditDto TaskOrder { get; set; }
    }
}
