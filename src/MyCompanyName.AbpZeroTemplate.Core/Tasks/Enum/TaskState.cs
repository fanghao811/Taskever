namespace Taskever.Tasks.Emun
{
    public enum TaskState : byte
    {
        待分配 = 1,
        待接收 = 2,
        进行中 = 3,
        暂停 = 4,
        完成 = 5  
    }
}
