using EntityFramework.DynamicFilters;
using Taskever.EntityFramework;

namespace Taskever.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly TaskeverDbContext _context;

        public TestDataBuilder(TaskeverDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new TestOrganizationUnitsBuilder(_context).Create();

            _context.SaveChanges();
        }
    }
}
