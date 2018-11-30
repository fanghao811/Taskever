using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Taskever.Production
{
    public class ProducListDto : EntityDto<long>
    {
        public string ProductName { get; set; }
        public string ProductNumber { get; set; }

        public string Category{ get; set; }
        public string Department { get; set; }
        public string Location { get; set; }

        //5.指导价格
        public float Price { get; set; }

        //6.用途描述 
        public string Description { get; set; }

    }



}


