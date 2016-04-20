using Abp.Modules;
using Abp.Zero.Configuration;

namespace Taskever.Tests
{
    [DependsOn(
        typeof(TaskeverApplicationModule),
        typeof(TaskeverDataModule))]
    public class TaskeverTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Use database as language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();
        }
    }
}
