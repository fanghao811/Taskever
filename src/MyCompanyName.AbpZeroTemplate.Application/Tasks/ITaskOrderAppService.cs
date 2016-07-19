using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using Taskever.Tasks.Dto;


namespace Taskever.Tasks
{
    public interface ITaskOrderAppService : IApplicationService
    {
        Task<TaskEditDto> GetTaskForEdit(NullableIdInput<long> input);

        Task<ListResultOutput<TaskListDto>> GetTasks();

        Task CreateOrUpdateTask(CreateOrUpdateTaskInput input);

        Task DeleteTask(IdInput<long> input);

        //role
        //Task<ListResultOutput<RoleListDto>> GetRoles();

        //Task<GetRoleForEditOutput> GetRoleForEdit(NullableIdInput input);

        //Task CreateOrUpdateRole(CreateOrUpdateRoleInput input);

        //Task DeleteRole(EntityRequestInput input);
    }
}
