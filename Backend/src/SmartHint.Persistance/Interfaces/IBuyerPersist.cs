using SmartHint.Domain.Models;

namespace SmartHint.Persistance.Interfaces
{
    public interface IBuyerPersist
    {
        Task<Buyer[]> GetAllBuyersAsync();
        Task<Buyer> GetBuyerByIdAsync(int buyerId);
    }
}