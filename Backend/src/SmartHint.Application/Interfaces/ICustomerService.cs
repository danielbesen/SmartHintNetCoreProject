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
        Task<CustomerDto[]> GetFilteredCustomersAsync(string name, string email, string phone, DateTime registerDate, bool isBlocked);
    }
}