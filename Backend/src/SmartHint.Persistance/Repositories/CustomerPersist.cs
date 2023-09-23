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

        public async Task<Customer[]> GetFilteredCustomersAsync(Customer model)
        {
            try
            {
                IQueryable<Customer> query = _context.Customers;

                query = query.AsNoTracking().OrderBy(e => e.Id).Where(e =>
                (string.IsNullOrEmpty(model.Name) || e.Name.Contains(model.Name)) &&
                (string.IsNullOrEmpty(model.Email) || e.Email.Contains(model.Email)) &&
                (string.IsNullOrEmpty(model.Phone) || e.Phone.Contains(model.Phone)) &&
                (model.RegisterDate == null || e.RegisterDate == model.RegisterDate) &&
                (e.IsBlocked == null || e.IsBlocked == model.IsBlocked)
            );
                return await query.ToArrayAsync();
            }
            catch (System.Exception ex)
            {
                throw new Exception("ERRO AQ MEMO" + ex.Message);
            }

        }
    }
}