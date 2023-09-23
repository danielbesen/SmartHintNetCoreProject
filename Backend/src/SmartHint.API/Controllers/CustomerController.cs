using Microsoft.AspNetCore.Mvc;
using SmartHint.Application.Dtos;
using SmartHint.Application.Interfaces;

namespace SmartHint.API.Controllers;

[ApiController]
[Route("[api/controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;
    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;

    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var customers = await _customerService.GetAllCustomersAsync();
            if (customers == null) return NoContent();

            return Ok(customers);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Get customers error: {ex.Message}");
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
    public async Task<IActionResult> Post(CustomerDto model)
    {
        try
        {
            var customer = await _customerService.AddCustomer(model);
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
    public async Task<IActionResult> Put(int id, CustomerDto model)
    {
        try
        {
            var customer = await _customerService.UpdateCustomer(id, model);
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
}