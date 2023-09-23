using AutoMapper;
using SmartHint.Application.Dtos;
using SmartHint.Domain.Models;

namespace SmartHint.Application.Helpers
{
    public class SmartHintProfile : Profile
    {
        public SmartHintProfile()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}