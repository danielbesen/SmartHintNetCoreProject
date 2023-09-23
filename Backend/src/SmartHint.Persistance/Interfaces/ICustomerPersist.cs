using SmartHint.Domain.Models;

namespace SmartHint.Persistance.Interfaces
{
    public interface ICustomerPersist
    {
        Task<Customer[]> GetAllCustomersAsync();
        Task<Customer[]> GetFilteredCustomersAsync(Customer model);
        Task<Customer> GetCustomerByIdAsync(int customerId);
    }
}