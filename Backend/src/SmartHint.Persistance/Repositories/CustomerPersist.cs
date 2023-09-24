using Microsoft.EntityFrameworkCore;
using SmartHint.Domain.Models;
using SmartHint.Persistance.Context;
using SmartHint.Persistance.Helpers;
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

        public async Task<Customer> GetCustomerByIdAsync(int customerId)
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().Where(e => e.Id == customerId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<PageList<Customer>> GetAllCustomersAsync(PageParams pageParams)
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await PageList<Customer>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<PageList<Customer>> GetFilteredCustomersAsync(Customer model, PageParams pageParams)
        {
            IQueryable<Customer> query = _context.Customers;

            query = query.AsNoTracking().OrderBy(e => e.Id).Where(e =>
            (string.IsNullOrEmpty(model.Name) || e.Name.Contains(model.Name)) &&
            (string.IsNullOrEmpty(model.Email) || e.Email.Contains(model.Email)) &&
            (string.IsNullOrEmpty(model.Phone) || e.Phone.Contains(model.Phone)) &&
            (model.RegisterDate == null || EF.Functions.DateDiffDay(model.RegisterDate, e.RegisterDate) == 0) &&
            (model.IsBlocked == null || e.IsBlocked == model.IsBlocked)
        );
            return await PageList<Customer>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }
    }
}