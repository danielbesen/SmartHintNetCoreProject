using SmartHint.Application.Dtos;

namespace SmartHint.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> AddCustomer(CustomerDto model);
        Task<CustomerDto> UpdateCustomer(int customerId, CustomerDto model);
        Task<bool> DeleteCustomer(int customerId);
        Task<CustomerDto[]> GetAllCustomersAsync();
        Task<CustomerDto> GetCustomerByIdAsync(int customerId);
    }
}