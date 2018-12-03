using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Extensions;
using Taskever.People.Dtos;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using Taskever.People.Emun;
using Taskever.Dto;

namespace Taskever.People
{
    public class PersonAppService : TaskeverAppServiceBase, IPersonAppService //Optionally, you can derive from ApplicationService as we did for TaskAppService class.
    {
        private readonly IRepository<Person> _personRepository;
        private readonly IRepository<PersonPhone,long> _personPhoneRepository;

        //ABP provides that we can directly inject IRepository<Person> (without creating any repository class)
        public PersonAppService(IRepository<Person> personRepository, IRepository<PersonPhone, long> personPhoneRepository)
        {
            _personRepository = personRepository;
            _personPhoneRepository = personPhoneRepository;
        }

        public PersonEditDto GetPersonForEdit(NullableIdInput input)
        {
            var person = new Person();

            if (input.Id.HasValue)
            {
                //Editing an existing person
                person = _personRepository.Get(input.Id.Value);
            }

            var output = new PersonEditDto();

            //Person
            output = person != null
                ? person.MapTo<PersonEditDto>()
                : new PersonEditDto();
            var typelist = new List<EnumDto>();

            foreach (var val in Enum.GetValues(typeof(PhoneNumberType)))
            {
                var enumDto = new EnumDto();
                var name = Enum.GetName(typeof(PhoneNumberType), val);
                enumDto.Name = name;
                enumDto.Id = (int)val;
                typelist.Add(enumDto);
            }
            output.PhoneTypeList = typelist;

            return output; 
        }

        //This method uses async pattern that is supported by ASP.NET Boilerplate
        public async Task<PagedResultOutput<PersonListDto>> GetPeople(GetPeopleInput input)
        {
            var query = _personRepository
                .GetAll()
                .Include(p=>p.PhoneList)
                .WhereIf(
                 !input.Filter.IsNullOrWhiteSpace(),
                  p =>
                        p.Name.Contains(input.Filter) ||
                        p.NationalIDNumber.Contains(input.Filter)
                );

            var peopleCount = await query.CountAsync();

            var people = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            var personListDtos = people.MapTo<List<PersonListDto>>();

            return new PagedResultOutput<PersonListDto>(
                peopleCount,
                personListDtos
                );
        }

        public async Task CreateOrUpdatePerson(CreateOrUpdatePersonInput input)
        {
            if (input.person.Id.HasValue)
            {
                await UpdatePerson(input);
            }
            else
            {
                await CreatePerson(input);
            }
        }

        //[AbpAuthorize("Administration.PersonManagement.CreatePerson")]
        public async Task CreatePerson(CreateOrUpdatePersonInput input)
        {
          Person person = new Person
            {
                Name = input.person.Name,
                Gender = input.person.Gender,
                BirthDate = input.person.BirthDate,
                NationalIDNumber = input.person.NationalIDNumber
            };

            await _personRepository.InsertAsync(person);
        }

        public async Task UpdatePerson(CreateOrUpdatePersonInput input)
        {
            Debug.Assert(input.person.Id != null, "input.Person.Id should be set.");

            var person = await _personRepository.GetAsync(input.person.Id.Value);
            person.Name = input.person.Name;
            person.NationalIDNumber = input.person.NationalIDNumber;
            person.BirthDate = input.person.BirthDate;
            person.Gender = input.person.Gender;
            await _personRepository.UpdateAsync(person);
        }

        public void DeletePerson(DelPersonInput input)
        {
            //Retrieving a task entity with given id using standard Get method of repositories.
            var person = _personRepository.Get(input.PersonId);

            if (person == null)
            {
                throw new Exception("Can not found the person!");
            }

            //Delete entity with standard Delete method of repositories.
            _personRepository.Delete(person);
        }

        //Add PersonPhone
        public async Task<PhoneInPersonListDto> AddPhone(AddPhoneInput input)
        {
            var person = _personRepository.Get(input.PersonId);

            var phone = input.MapTo<PersonPhone>();
            person.PhoneList.Add(phone);

            await CurrentUnitOfWork.SaveChangesAsync();

            return phone.MapTo<PhoneInPersonListDto>();
        }

        //Delete PersonPhone
        public async Task DeletePhone(IdInput<long> input)
        {
            await _personPhoneRepository.DeleteAsync(input.Id);
        }


    }
}
