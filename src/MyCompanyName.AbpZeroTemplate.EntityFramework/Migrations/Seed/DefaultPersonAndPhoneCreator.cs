using System.Linq;
using Taskever.EntityFramework;
using Taskever.People;
using Taskever.People.Emun;
using System.Collections.Generic;

namespace Taskever.Migrations.Seed
{
    public class DefaultPersonAndPhoneCreator
    {
        //Seed person and pnone
        private readonly TaskeverDbContext _context;

        public DefaultPersonAndPhoneCreator(TaskeverDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            var douglas = _context.People.FirstOrDefault(p => p.Name == "Douglas");
            if (douglas == null)
            {
                _context.People.Add(
                    new Person
                    {
                        Name = "Douglas",
                        Gender = Gender.F,
                        NationalIDNumber = "330724",
                        PhoneList = new List<PersonPhone>
                                    {
                                    new PersonPhone {PhoneNumberType = PhoneNumberType.手机, PhoneNumber = "138***"},
                                    new PersonPhone {PhoneNumberType = PhoneNumberType.公司, PhoneNumber = "2223342"}
                                    }
                    });
            }

            var asimov = _context.People.FirstOrDefault(p => p.Name == "Isaac");
            if (asimov == null)
            {
                _context.People.Add(
                    new Person
                    {
                        Name = "Isaac",
                        Gender = Gender.M,
                        NationalIDNumber = "330724",
                        PhoneList = new List<PersonPhone>
                                    {
                                    new PersonPhone {PhoneNumberType = PhoneNumberType.手机, PhoneNumber = "137***"},
                                    new PersonPhone {PhoneNumberType = PhoneNumberType.公司, PhoneNumber = "1123345"}
                                    }
                    });
            }
        }
    }
}
