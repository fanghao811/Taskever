using System.Linq;
using Taskever.EntityFramework;
using Abp.Organizations;

namespace Taskever.Migrations.Seed
{
    public class DefaultOrgnizatinCreator
    {
        //Seed person and pnone
        private readonly TaskeverDbContext _context;

        public DefaultOrgnizatinCreator(TaskeverDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            var ou1 = _context.OrganizationUnits.FirstOrDefault(ou => ou.Id == 1);
            if (ou1 == null)
            {
                _context.OrganizationUnits.Add(
                    new OrganizationUnit
                    {
                        ParentId = null,
                        DisplayName = "物料类型",
                        Code = "00001",
                        IsDeleted = false
                    });
                _context.SaveChanges();
            }

            var ou2 = _context.OrganizationUnits.FirstOrDefault(ou => ou.Id == 2);
            if (ou2 == null)
            {
                _context.OrganizationUnits.Add(
                    new OrganizationUnit
                    {
                        ParentId = null,
                        DisplayName = "组织机构",
                        Code = "00002",
                        IsDeleted = false
                    });
                _context.SaveChanges();
            }

            var ou3 = _context.OrganizationUnits.FirstOrDefault(ou => ou.Id == 3);
            if (ou3 == null)
            {
                _context.OrganizationUnits.Add(
                    new OrganizationUnit
                    {
                        ParentId = null,
                        DisplayName = "仓库地址",
                        Code = "00003",
                        IsDeleted = false
                    });
                _context.SaveChanges();
            }
        }
    }
}
