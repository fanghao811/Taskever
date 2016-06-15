using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Organizations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Taskever.Production
{
    [Table("Product", Schema = "Production")]
    public class Product : Entity<long>, IHasCreationTime
    {

        public const int MaxNameLength = 30;
        public const int MaxProductNumberLength = 30;
        public const int MaxDescriptionLength = 100;

        //使用科室
        [ForeignKey("Department")]
        public long? DepartmentOuId { get; set; }
        public virtual OrganizationUnit Department { get; set; }

        //放置地点
        [ForeignKey("Location")]
        public long? LocationOuId { get; set; }
        public virtual OrganizationUnit Location { get; set; }

        //产品类型
        [ForeignKey("Category")]
        public long? CategoryOuId { get; set; }
        public virtual OrganizationUnit Category { get; set; }

        //产品名称 R
        [Required]
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        public float Price { get; set; }

        //产品编号 R
        [Required]
        [MaxLength(MaxProductNumberLength)]
        public string ProductNumber { get; set; }

        //用途描述 R
        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        //启用状态
        public bool UsingFlag { get; set; }

        //启用日期
        public DateTime StartDate { get; set; }

        //报废日期
        public DateTime DiscontinuedDate { get; set; }

        //录入日期
        public DateTime CreationTime { get; set; }


        //构造函数
        public Product()
        {
            StartDate= DateTime.Now;
            CreationTime = DateTime.Now;
        }
    }
}
