using SmartHint.Domain.Models;

namespace SmartHint.Persistance.Interfaces
{
    public interface ICustomerPersist
    {
        Task<Customer[]> GetAllCustomersAsync();
        Task<Customer[]> GetFilteredCustomersAsync(string name, string email, string phone, DateTime registerDate, bool isBlocked);
        Task<Customer> GetCustomerByIdAsync(int customerId);
    }
}