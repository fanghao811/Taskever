using System.Threading.Tasks;
using Abp.Notifications;
using Taskever.Authorization.Users;
using Taskever.MultiTenancy;

namespace Taskever.Notifications
{
    public interface IAppNotifier
    {
        Task WelcomeToTheApplicationAsync(User user);

        Task NewUserRegisteredAsync(User user);

        Task NewTenantRegisteredAsync(Tenant tenant);

        Task SendMessageAsync(long userId, string message, NotificationSeverity severity = NotificationSeverity.Info);
    }
}
