using EntityFramework.DynamicFilters;
using Taskever.EntityFramework;

namespace Taskever.Migrations.Seed
{
    public class InitialDbBuilder
    {
        private readonly TaskeverDbContext _context;

        public InitialDbBuilder(TaskeverDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new DefaultTenantRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
            new DefaultPersonAndPhoneCreator(_context).Create();
            _context.SaveChanges();
        }
    }
}
