using Microsoft.EntityFrameworkCore;
using SmartHint.Domain.Models;

namespace SmartHint.Persistance.Context
{
    public class SmartHintContext : DbContext
    {
        public SmartHintContext(DbContextOptions<SmartHintContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
    }
}