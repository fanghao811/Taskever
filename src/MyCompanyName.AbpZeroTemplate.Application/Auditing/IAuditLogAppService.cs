using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Taskever.Auditing.Dto;
using Taskever.Dto;

namespace Taskever.Auditing
{
    public interface IAuditLogAppService : IApplicationService
    {
        Task<PagedResultOutput<AuditLogListDto>> GetAuditLogs(GetAuditLogsInput input);

        Task<FileDto> GetAuditLogsToExcel(GetAuditLogsInput input);
    }
}