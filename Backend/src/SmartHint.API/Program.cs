using Microsoft.EntityFrameworkCore;
using SmartHint.Application.Interfaces;
using SmartHint.Application.Services;
using SmartHint.Persistance.Context;
using SmartHint.Persistance.Interfaces;
using SmartHint.Persistance.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IGeneralPersist, GeneralPersist>();
builder.Services.AddScoped<ICustomerPersist, CustomerPersist>();

builder.Services.AddCors();

var connectionString = builder.Configuration.GetConnectionString("DbConnection");
builder.Services.AddDbContext<SmartHintContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(access => access.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
