using SmartHint.Persistance.Context;
using SmartHint.Persistance.Interfaces;

namespace SmartHint.Persistance.Repositories
{
    public class GeneralPersist : IGeneralPersist
    {
        private readonly SmartHintContext _context;
        public GeneralPersist(SmartHintContext context)
        {
            _context = context;
        }

        public void Add<T>(T Entity) where T : class
        {
            _context.Add(Entity);
        }

        public void Update<T>(T Entity) where T : class
        {
            _context.Update(Entity);
        }
        public void Delete<T>(T Entity) where T : class
        {
            _context.Remove(Entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}