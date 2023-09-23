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
        Task<PageList<CustomerDto>> GetFilteredCustomersAsync(CustomerFilterDto model, PageParams pageParams);
    }
}