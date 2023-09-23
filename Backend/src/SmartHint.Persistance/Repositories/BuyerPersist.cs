using Microsoft.EntityFrameworkCore;
using SmartHint.Domain.Models;
using SmartHint.Persistance.Context;
using SmartHint.Persistance.Interfaces;

namespace SmartHint.Persistance.Repositories
{
    public class BuyerPersist : IBuyerPersist
    {
        private readonly SmartHintContext _context;
        public BuyerPersist(SmartHintContext context)
        {
            _context = context;
        }
        public async Task<Buyer[]> GetAllBuyersAsync()
        {
            IQueryable<Buyer> query = _context.Buyers;

            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Buyer> GetBuyerByIdAsync(int buyerId)
        {
            IQueryable<Buyer> query = _context.Buyers;

            query = query.AsNoTracking().Where(e => e.Id == buyerId);

            return await query.FirstOrDefaultAsync();
        }
    }
}