﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using Taskever.Production.Emun;

namespace Taskever.Production
{
    [AutoMapFrom(typeof(Product))]
    public class ProducListDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string ProductNumber { get; set; }

        //3.简称
        public string Abbreviation { get; set; }

        //4.助记码
        public string MnemonicCode { get; set; }

        //6.型号
        public string ModelNumber { get; set; }

        //7.规格
        public string Specification { get; set; }

        //TODO:8.单位 enum
        public ProductUnit Unit { get; set; }

        //6.用途描述 
        public string Description { get; set; }

        public string Category { get; set; }
    }
}


