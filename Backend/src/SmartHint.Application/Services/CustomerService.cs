using System.Globalization;
using AutoMapper;
using SmartHint.Application.Dtos;
using SmartHint.Application.Interfaces;
using SmartHint.Domain.Models;
using SmartHint.Persistance.Helpers;
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

        public async Task<PageList<CustomerDto>> GetAllCustomersAsync(PageParams pageParams)
        {
            try
            {
                var customers = await _customerPersist.GetAllCustomersAsync(pageParams);
                if (customers == null) return null;
                var result = _mapper.Map<PageList<CustomerDto>>(customers);

                result.CurrentPage = customers.CurrentPage;
                result.TotalPages = customers.TotalPages;
                result.TotalCount = customers.TotalCount;
                result.PageSize = customers.PageSize;

                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PageList<CustomerFilterDto>> GetFilteredCustomersAsync(PageParams pageParams)
        {
            try
            {
                DateTime? formatedDate = null;

                if (pageParams.RegisterDate != null && pageParams.RegisterDate != "null")
                {
                    string format = "dd/MM/yyyy";
                    if (DateTime.TryParseExact(pageParams.RegisterDate, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDateTime))
                    {
                        formatedDate = parsedDateTime;
                    }
                }

                var customerPersistanceModel = new Customer()
                {
                    Email = pageParams.Email == "null" ? null : pageParams.Email,
                    IsBlocked = pageParams.IsBlocked == null ? null : pageParams.IsBlocked == "null" ? null : pageParams.IsBlocked == "true" ? true : false,
                    Name = pageParams.Name == "null" ? null : pageParams.Name,
                    Phone = pageParams.Phone == "null" ? null : pageParams.Phone,
                    RegisterDate = formatedDate
                };

                var customers = await _customerPersist.GetFilteredCustomersAsync(customerPersistanceModel, pageParams);
                if (customers == null) return null;
                var result = _mapper.Map<PageList<CustomerFilterDto>>(customers);

                result.CurrentPage = customers.CurrentPage;
                result.TotalPages = customers.TotalPages;
                result.TotalCount = customers.TotalCount;
                result.PageSize = customers.PageSize;

                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto> GetCustomerByEmailAsync(string email)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByEmailAsync(email);
                if (customer == null) return null;
                var result = _mapper.Map<CustomerDto>(customer);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto> GetCustomerByIdentityDocumentAsync(string documentIdentity)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByIdentityDocumentAsync(documentIdentity);
                if (customer == null) return null;
                var result = _mapper.Map<CustomerDto>(customer);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDto> GetCustomerByStateStateRegistrationAsync(string stateRegistration)
        {
            try
            {
                var customer = await _customerPersist.GetCustomerByStateStateRegistrationAsync(stateRegistration);
                if (customer == null) return null;
                var result = _mapper.Map<CustomerDto>(customer);
                return result;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}