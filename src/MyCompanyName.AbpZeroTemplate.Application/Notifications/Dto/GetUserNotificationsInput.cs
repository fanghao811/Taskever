using Abp.Notifications;
using Taskever.Dto;

namespace Taskever.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }
    }
}