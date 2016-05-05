using Abp.Domain.Repositories;

namespace Taskever.People
{
    /// <summary>
    /// Defines a repository to perform database operations for <see cref="PersonPhone"/> Entities.
    /// 
    /// Extends <see cref="IRepository{TEntity}"/> to inherit base repository functionality.
    /// </summary>
    public interface IPersonPhoneRepository : IRepository<PersonPhone,long>
    {
        //We can add methods here those are specific to Person entities. Currently, we don't need it, base methods enough.
    }
}
