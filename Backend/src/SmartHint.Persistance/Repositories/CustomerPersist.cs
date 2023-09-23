using Microsoft.EntityFrameworkCore;
using SmartHint.Domain.Models;
using SmartHint.Persistance.Context;
using SmartHint.Persistance.Interfaces;

namespace SmartHint.Persistance.Repositories
{
    public class CustomerPersist : ICustomerPersist
    {
        private readonly SmartHintContext _context;
        public CustomerPersist(SmartHintContext context)
        {
            _context = context;
        }
        public async Task<Customer[]> GetAllCustomersAsync()
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(int customerId)
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().Where(e => e.Id == customerId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Customer[]> GetFilteredCustomersAsync(string name, string email, string phone, DateTime registerDate, bool isBlocked)
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().OrderBy(e => e.Id).Where(e =>
            (string.IsNullOrEmpty(name) || e.Name.Contains(name)) &&
            (string.IsNullOrEmpty(email) || e.Email.Contains(email)) &&
            (string.IsNullOrEmpty(phone) || e.Phone.Contains(phone)) &&
            (registerDate == null || e.RegisterDate == registerDate) &&
            (e.IsBlocked == isBlocked)
        );
            return await query.ToArrayAsync();
        }
    }
}