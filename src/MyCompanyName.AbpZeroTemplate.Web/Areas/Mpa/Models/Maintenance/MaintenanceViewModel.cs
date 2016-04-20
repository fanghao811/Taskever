using System.Collections.Generic;
using Taskever.Caching.Dto;

namespace Taskever.Web.Areas.Mpa.Models.Maintenance
{
    public class MaintenanceViewModel
    {
        public IReadOnlyList<CacheDto> Caches { get; set; }
    }
}