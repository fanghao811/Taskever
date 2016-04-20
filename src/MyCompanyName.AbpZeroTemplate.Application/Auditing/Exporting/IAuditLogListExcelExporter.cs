using System.Collections.Generic;
using Taskever.Auditing.Dto;
using Taskever.Dto;

namespace Taskever.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);
    }
}
