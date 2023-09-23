namespace SmartHint.Domain.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime? RegisterDate { get; set; }
        public string IdentityDocument { get; set; }
        public string StateRegistration { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsBlocked { get; set; }
        public string Password { get; set; }
    }
}