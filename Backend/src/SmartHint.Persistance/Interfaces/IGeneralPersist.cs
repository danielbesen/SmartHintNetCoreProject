namespace SmartHint.Persistance.Interfaces
{
    public interface IGeneralPersist
    {
        void Add<T>(T Entity) where T : class;
        void Update<T>(T Entity) where T : class;
        void Delete<T>(T Entity) where T : class;
        Task<bool> SaveChangesAsync();
    }
}