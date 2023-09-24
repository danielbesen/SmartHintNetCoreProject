using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using SmartHint.API.Extensions;
using SmartHint.Application.Dtos;
using SmartHint.Application.Interfaces;
using SmartHint.Persistance.Helpers;

namespace SmartHint.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;
    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
    {
        try
        {
            var customers = await _customerService.GetAllCustomersAsync(pageParams);
            if (customers == null) return NoContent();

            Response.AddPagination(customers.CurrentPage, customers.PageSize, customers.TotalCount, customers.TotalPages);
            return Ok(customers);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Get customers error: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("filter")]
    public async Task<IActionResult> GetByFilter([FromQuery] PageParams pageParams)
    {
        try
        {
            var customers = await _customerService.GetFilteredCustomersAsync(pageParams);
            if (customers == null) return NoContent();

            Response.AddPagination(customers.CurrentPage, customers.PageSize, customers.TotalCount, customers.TotalPages);
            return Ok(customers);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Get customers by filter error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        try
        {
            var customers = await _customerService.GetCustomerByIdAsync(id);
            if (customers == null) return NoContent();

            return Ok(customers);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Get customers by id error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(CustomerModelDto model)
    {
        try
        {
            var newModel = new CustomerDto()
            {
                DateOfBirth = formatDate(model.DateOfBirth),
                RegisterDate = formatDate(model.RegisterDate),
                Email = model.Email,
                Gender = model.Gender,
                IdentityDocument = model.IdentityDocument,
                IsBlocked = model.IsBlocked,
                Name = model.Name,
                Password = model.Password,
                Phone = model.Phone,
                StateRegistration = model.StateRegistration,
                Type = model.Type
            };

            var customer = await _customerService.AddCustomer(newModel);
            if (customer == null) return BadRequest("Error adding new customer.");

            return Ok(customer);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error adding new customer: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, CustomerModelDto model)
    {
        try
        {
            var newModel = new CustomerDto()
            {
                DateOfBirth = formatDate(model.DateOfBirth),
                RegisterDate = formatDate(model.RegisterDate),
                Email = model.Email,
                Gender = model.Gender,
                IdentityDocument = model.IdentityDocument,
                IsBlocked = model.IsBlocked,
                Name = model.Name,
                Password = model.Password,
                Phone = model.Phone,
                StateRegistration = model.StateRegistration,
                Type = model.Type
            };

            var customer = await _customerService.UpdateCustomer(id, newModel);
            if (customer == null) return BadRequest("Error updating customer.");

            return Ok(customer);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error updating customer: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            return await _customerService.DeleteCustomer(id) ?
             Ok("Customer deleted.") : BadRequest("Error deleting customer.");
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error deleting customer: {ex.Message}");
        }
    }

    public DateTime? formatDate(string date)
    {
        DateTime? formatedDate = null;

        if (date != null && date != "null")
        {
            string format = "dd/MM/yyyy";
            if (DateTime.TryParseExact(date, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDateTime))
            {
                formatedDate = parsedDateTime;
            }
            return formatedDate;
        }
        return formatedDate;
    }

}
