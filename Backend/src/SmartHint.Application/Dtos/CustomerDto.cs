using System.ComponentModel.DataAnnotations;

namespace SmartHint.Application.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        [Required, MaxLength(150)]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; }
        [Required, MaxLength(11)]
        public string Phone { get; set; }
        public DateTime? Date { get; set; }
        [Required]
        public string IdentityDocument { get; set; }
        public string StateRegistration { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsBlocked { get; set; }
        [Required, MinLength(8), MaxLength(15)]
        public string Password { get; set; }
    }
}