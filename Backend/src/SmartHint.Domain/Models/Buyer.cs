namespace SmartHint.Domain.Models
{
    public class Buyers
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Date { get; set; }
        public bool IsBlocked { get; set; }
    }
}