using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Organizations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Taskever.Production.Emun;

namespace Taskever.Production
{
    [Table("Product", Schema = "Production")]
    public class Product : Entity<long>, IHasCreationTime
    {
        public const int MaxNameLength = 30;
        public const int MaxProductNumberLength = 30;
        public const int MaxDescriptionLength = 100;

        //1.物料编号
        public string ProductNumber { get; set; }

        //2.物料名称
        [Required]
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        //3.简称
        public string Abbreviation { get; set; }

        //4.助记码
        public string MnemonicCode { get; set; }

        //5.物料类型
        [ForeignKey("Category")]
        public long? CategoryOuId { get; set; }
        public virtual OrganizationUnit Category { get; set; }

        //6.型号
        [Required]
        [MaxLength(MaxProductNumberLength)]
        public string ModelNumber { get; set; }

        //7.规格
        public string Specification { get; set; }

        //TODO:8.单位 enum
        public ProductUnit Unit { get; set; }

        //9.物料描述
        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        //10.备注
        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Comment { get; set; }

        //11.组织机构----备用
        [ForeignKey("Department")]
        public long? DepartmentOuId { get; set; }
        public virtual OrganizationUnit Department { get; set; }

        //12.放置地点
        [ForeignKey("Location")]
        public long? LocationOuId { get; set; }
        public virtual OrganizationUnit Location { get; set; }

        //13.录入日期
        public DateTime CreationTime { get; set; }

        //构造函数
        public Product()
        {
            CreationTime = DateTime.Now;
        }
    }
}
