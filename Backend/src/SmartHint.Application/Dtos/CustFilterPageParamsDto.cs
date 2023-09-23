using SmartHint.Persistance.Helpers;

namespace SmartHint.Application.Dtos
{
    public class CustFilterPageParamsDto
    {
        public CustomerFilterDto CustomerFilterDto { get; set; }
        public PageParams PageParams { get; set; }
    }
}