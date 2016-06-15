using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using System;
using Abp.AutoMapper;

namespace Taskever.Production
{
    [AutoMapFrom(typeof(Product))]
    public class CreateOrUpdateProductInput : IInputDto
    {
        public long? ProductId { get; set; }
        public long? DepartmentOuId { get; set; }
        public long? LocationOuId { get; set; }
        public long? CategoryOuId { get; set; }

        [Required]
        [MaxLength(Product.MaxNameLength)]
        public string Name { get; set; }

        public float Price { get; set; }

        //产品编号 R
        [Required]
        [MaxLength(Product.MaxProductNumberLength)]
        public string ProductNumber { get; set; }

        //用途描述 R
        [Required]
        [MaxLength(Product.MaxDescriptionLength)]
        public string Description { get; set; }

        //启用状态
        public bool UsingFlag { get; set; }

        //启用日期
        public DateTime StartDate { get; set; }

        //报废日期
        public DateTime DiscontinuedDate { get; set; }
    }
}