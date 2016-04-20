using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Taskever.Editions.Dto;

namespace Taskever.Web.Areas.Mpa.Models.Common
{
    public interface IFeatureEditViewModel
    {
        List<NameValueDto> FeatureValues { get; set; }

        List<FlatFeatureDto> Features { get; set; }
    }
}