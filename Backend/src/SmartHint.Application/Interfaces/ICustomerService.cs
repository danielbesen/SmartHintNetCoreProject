using SmartHint.Application.Dtos;
using SmartHint.Persistance.Helpers;

namespace SmartHint.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> AddCustomer(CustomerDto model);
        Task<CustomerDto> UpdateCustomer(int customerId, CustomerDto model);
        Task<bool> DeleteCustomer(int customerId);
        Task<PageList<CustomerDto>> GetAllCustomersAsync(PageParams pageParams);
        Task<CustomerDto> GetCustomerByIdAsync(int customerId);
        Task<PageList<CustomerFilterDto>> GetFilteredCustomersAsync(PageParams pageParams);
        Task<CustomerDto> GetCustomerByEmailAsync(string email);
        Task<CustomerDto> GetCustomerByIdentityDocumentAsync(string documentIdentity);
        Task<CustomerDto> GetCustomerByStateStateRegistrationAsync(string stateRegistration);
    }
}