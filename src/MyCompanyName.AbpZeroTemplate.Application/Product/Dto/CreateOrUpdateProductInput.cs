using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Taskever.Production.Emun;

namespace Taskever.Production
{
    [AutoMapFrom(typeof(Product))]
    public class CreateOrUpdateProductInput : IInputDto
    {
        public const int MaxNameLength = 30;
        public const int MaxProductNumberLength = 30;
        public const int MaxDescriptionLength = 100;

        public long? Id { get; set; }
        public long? CategoryOuId { get; set; }

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

        //6.型号
        [Required]
        [MaxLength(MaxProductNumberLength)]
        public string ModelNumber { get; set; }

        //7.规格
        public string Specification { get; set; }

        //8.单位 enum
        public ProductUnit Unit { get; set; }

        //9.物料描述
        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        //10.备注
        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Comment { get; set; }

    }
}