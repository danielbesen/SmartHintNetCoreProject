using SmartHint.Domain.Models;

namespace SmartHint.Persistance.Interfaces
{
    public interface ICustomerPersist
    {
        Task<Customer[]> GetAllCustomersAsync();
        Task<Customer> GetCustomerByIdAsync(int customerId);
    }
}