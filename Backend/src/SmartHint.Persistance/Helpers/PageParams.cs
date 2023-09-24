namespace SmartHint.Persistance.Helpers
{
    public class PageParams
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RegisterDate { get; set; }
        public string IsBlocked { get; set; }

    }
}