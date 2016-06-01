using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Taskever.Tasks.Dtos;


namespace Taskever.Tasks
{
    public class TaskOrderAppService : TaskeverAppServiceBase, ITaskOrderAppService
    {

        private readonly IRepository<TaskOrder,long> _taskOrderRepository;

        public TaskOrderAppService(IRepository<TaskOrder, long> taskOrderRepository)
        {
            _taskOrderRepository = taskOrderRepository;
        }


        public GetTasksOutput GetTasks(GetTasksInput input)
        {
            var query= _taskOrderRepository.GetAll().MapTo<List<TaskDto>>();


            return new GetTasksOutput { Tasks= query };
        }

        public async Task CreateOrUpdateTask(CreateOrUpdateTaskInput input)
        {
            if (input.Id.HasValue)
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
            var crewLeader =await UserManager.GetUserByIdAsync(input.CrewLeaderId);
            var requester =await UserManager.GetUserByIdAsync(input.RequesterId);
            var taskOrder = new TaskOrder
            {
                DeviceName = input.DeviceName,
                Department = input.Department,
                Location = input.Location,
                Description = input.Description,
                CrewLeaderId = input.CrewLeaderId,
                RequesterId = input.RequesterId
            };
            //var taskOrder = new TaskOrder();
            //taskOrder = input.MapTo<TaskOrder>();
            //taskOrder.CrewLeader = crewLeader;
            //taskOrder.Requester = requester;

            await _taskOrderRepository.InsertAsync(taskOrder);
        }

        public async Task UpdateTask(CreateOrUpdateTaskInput input)
        {
            var taskOrder = new TaskOrder();
            taskOrder = input.MapTo<TaskOrder>();
            await _taskOrderRepository.UpdateAsync(taskOrder);
        }

        public void DeleteTask(IdInput<long> input)
        {
            //Retrieving a task entity with given id using standard Get method of repositories.
            var task = _taskOrderRepository.Get(input.Id);

            if (task == null)
            {
                throw new Exception("Can not found the taskOrder!");
            }

            //Delete entity with standard Delete method of repositories.
            _taskOrderRepository.Delete(task);
        }

    }
}
