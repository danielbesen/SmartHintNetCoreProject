using SmartHint.Domain.Models;
using SmartHint.Persistance.Helpers;

namespace SmartHint.Persistance.Interfaces
{
    public interface ICustomerPersist
    {
        Task<PageList<Customer>> GetAllCustomersAsync(PageParams pageParams);
        Task<PageList<Customer>> GetFilteredCustomersAsync(Customer model, PageParams pageParams);
        Task<Customer> GetCustomerByIdAsync(int customerId);

        Task<Customer> GetCustomerByEmailAsync(string email);
        Task<Customer> GetCustomerByIdentityDocumentAsync(string identityDocument);
        Task<Customer> GetCustomerByStateStateRegistrationAsync(string stateRegistration);
    }
}