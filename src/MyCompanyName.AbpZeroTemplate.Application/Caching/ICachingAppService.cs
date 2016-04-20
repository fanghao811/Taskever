using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Taskever.Caching.Dto;

namespace Taskever.Caching
{
    public interface ICachingAppService : IApplicationService
    {
        ListResultOutput<CacheDto> GetAllCaches();

        Task ClearCache(IdInput<string> input);

        Task ClearAllCaches();
    }
}
