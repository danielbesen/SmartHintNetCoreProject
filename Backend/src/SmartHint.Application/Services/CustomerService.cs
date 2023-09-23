using AutoMapper;
using SmartHint.Application.Dtos;
using SmartHint.Application.Interfaces;
using SmartHint.Domain.Models;
using SmartHint.Persistance.Interfaces;

namespace SmartHint.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IGeneralPersist _generalPersist;
        private readonly ICustomerPersist _customerPersist;
        private readonly IMapper _mapper;
        public CustomerService(IGeneralPersist generalPersist, ICustomerPersist customerPersist, IMapper mapper)
        {
            _mapper = mapper;
            _customerPersist = customerPersist;
            _generalPersist = generalPersist;

        }
        public async Task<CustomerDto> AddCustomer(CustomerDto model)
        {
            try
            {
                var customer = _mapper.Map<Customer>(model);
                _generalPersist.Add<Customer>(customer);

                if (await _generalPersist.SaveChangesAsync())
                {
                    var result = await _customerPersist.GetCustomerByIdAsync(customer.Id);
                    return _mapper.Map<CustomerDto>(result);
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto> UpdateCustomer(int customerId, CustomerDto model)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByIdAsync(customerId);
                if (customer == null) return null;

                model.Id = customerId;

                _mapper.Map(model, customer);

                _generalPersist.Update<Customer>(customer);
                if (await _generalPersist.SaveChangesAsync())
                {
                    var result = await _customerPersist.GetCustomerByIdAsync(customer.Id);
                    return _mapper.Map<CustomerDto>(result);
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteCustomer(int customerId)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByIdAsync(customerId);
                if (customer == null) throw new Exception("Customer not found.");

                _generalPersist.Delete(customer);
                return await _generalPersist.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto[]> GetAllCustomersAsync()
        {
            try
            {
                var customers = await _customerPersist.GetAllCustomersAsync();
                if (customers == null) return null;
                var result = _mapper.Map<CustomerDto[]>(customers);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(int customerId)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByIdAsync(customerId);
                if (customer == null) return null;
                var result = _mapper.Map<CustomerDto>(customer);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto[]> GetFilteredCustomersAsync(string name, string email, string phone, DateTime registerDate, bool isBlocked)
        {
            try
            {
                var customers = await _customerPersist.GetFilteredCustomersAsync(name, email, phone, registerDate, isBlocked);
                if (customers == null) return null;
                var result = _mapper.Map<CustomerDto[]>(customers);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}