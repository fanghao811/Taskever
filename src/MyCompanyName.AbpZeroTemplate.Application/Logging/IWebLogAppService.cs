using Abp.Application.Services;
using Taskever.Dto;
using Taskever.Logging.Dto;

namespace Taskever.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
