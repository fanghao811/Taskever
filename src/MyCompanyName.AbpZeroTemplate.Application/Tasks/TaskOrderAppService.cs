using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Taskever.Tasks.Dto;


namespace Taskever.Tasks
{
    public class TaskOrderAppService : TaskeverAppServiceBase, ITaskOrderAppService
    {

        private readonly IRepository<TaskOrder, long> _taskOrderRepository;

        public TaskOrderAppService(IRepository<TaskOrder, long> taskOrderRepository)
        {
            _taskOrderRepository = taskOrderRepository;
        }

        public async Task<TaskEditDto> GetTaskForEdit(NullableIdInput<long> input)
        {
            var taskOrder = await _taskOrderRepository.FirstOrDefaultAsync(input.Id.Value);

            if (taskOrder == null)
            {
                string result = string.Format("没有找到Id={0}的工单!", input.Id);
                throw new Exception(result);
            }

            return taskOrder.MapTo<TaskEditDto>();
        }

        public async Task<ListResultOutput<TaskListDto>> GetTasks()
        {
            var query = await _taskOrderRepository.GetAll().Include(t => t.Requester).Include(t => t.CrewLeader).ToListAsync();

            var taskOrders = from order in query
                             select new TaskListDto
                             {
                                 Id = order.Id,
                                 DeviceName = order.DeviceName,
                                 Department = order.Department,
                                 Description = order.Description,
                                 Location = order.Location,
                                 Type = order.Type,
                                 Priority = order.Priority,
                                 State = order.State,
                                 DueTime = order.DueTime,
                                 EndTime = order.EndTime,
                                 CreationTime = order.CreationTime,
                                 RequesterName = order.Requester != null ? order.Requester.Name : "",
                                 CrewLeaderName = order.CrewLeader != null ? order.CrewLeader.Name : ""
                             };

            //var taskOrders= list.task
            return new ListResultOutput<TaskListDto>(taskOrders.MapTo<List<TaskListDto>>());
        }

        public async Task CreateOrUpdateTask(CreateOrUpdateTaskInput input)
        {
            if (input.TaskOrder.Id.HasValue)
            {
                await UpdateTask(input);
            }
            else
            {
                await CreateTask(input);
            }
        }


        public async Task CreateTask(CreateOrUpdateTaskInput input)
        {
            //var crewLeader =await UserManager.GetUserByIdAsync(input.TaskOrder.CrewLeaderId.Value);

            var taskOrder = input.TaskOrder.MapTo<TaskOrder>();

            await _taskOrderRepository.InsertAsync(taskOrder);
        }

        public async Task UpdateTask(CreateOrUpdateTaskInput input)
        {
            var taskOrder = new TaskOrder();
            taskOrder = input.TaskOrder.MapTo<TaskOrder>();
            await _taskOrderRepository.UpdateAsync(taskOrder);
        }

        public async Task DeleteTask(IdInput<long> input)
        {
            //Retrieving a task entity with given id using standard Get method of repositories.
            var taskOrder = await _taskOrderRepository.FirstOrDefaultAsync(input.Id);

            if (taskOrder == null)
            {
                string result = string.Format("没有找到Id={0}的工单!", input.Id);
                throw new Exception(result);
            }

            //Delete entity with standard Delete method of repositories.
            _taskOrderRepository.Delete(taskOrder);
        }

    }
}
