using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskever.Location
{
    public class Location
    {
        public virtual int TenantId { get; set; }

        public virtual long OrganizationUnitId { get; set; }

        public virtual string Name { get; set; }

        public virtual float Price { get; set; }

        public Location()
        {

        }

        public Location(int tenantId, long organizationUnitId, string name, float price)
        {
            TenantId = tenantId;
            OrganizationUnitId = organizationUnitId;
            Name = name;
            Price = price;
        }
    }
}
