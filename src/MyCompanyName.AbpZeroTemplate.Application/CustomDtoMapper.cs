using AutoMapper;
using Taskever.Authorization.Users;
using Taskever.Authorization.Users.Dto;
using Taskever.Production;
using Taskever.Tasks;
using Taskever.Tasks.Dto;

namespace Taskever
{
    internal static class CustomDtoMapper
    {
        private static volatile bool _mappedBefore;
        private static readonly object SyncObj = new object();

        public static void CreateMappings()
        {
            lock (SyncObj)
            {
                if (_mappedBefore)
                {
                    return;
                }

                CreateMappingsInternal();

                _mappedBefore = true;
            }
        }

        private static void CreateMappingsInternal()
        {
            Mapper.CreateMap<User, UserEditDto>()
                .ForMember(dto => dto.Password, options => options.Ignore())
                .ReverseMap()
                .ForMember(user => user.Password, options => options.Ignore());

            Mapper.CreateMap<Product, CreateOrUpdateProductInput>()
                .ReverseMap()
                .ForMember(product => product.Department, options => options.Ignore())
                .ForMember(product => product.Location, options => options.Ignore())
                .ForMember(product => product.Category, options => options.Ignore());

            Mapper.CreateMap<Product, ProducListDto>()
                .ForMember(dto => dto.Category, opt => opt.MapFrom(src => src.Category.DisplayName));


            Mapper.CreateMap<TaskOrder, TaskEditDto>()
                .ReverseMap();
            //.ForMember(taskOrder => taskOrder.Department, options => options.Ignore())
            //.ForMember(taskOrder => taskOrder.Location, options => options.Ignore())
            //.ForMember(taskOrder => taskOrder.Category, options => options.Ignore());
        }
    }
}