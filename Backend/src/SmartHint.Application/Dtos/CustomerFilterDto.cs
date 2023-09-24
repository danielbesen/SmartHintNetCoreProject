namespace SmartHint.Application.Dtos
{
    public class CustomerFilterDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime? RegisterDate { get; set; }
        public bool? IsBlocked { get; set; }
    }
}