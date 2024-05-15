
using com.adtek.rh_inventario.br.Models;
using com.adtek.rh_inventario.br.Repository;
using com.adtek.rh_inventario.br.Services;
using com.adtek.rh_inventario.webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace com.adtek.rh_inventario.webapi
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
            // builder.Services.AddDbContext<AdtekDBContext>(opt => opt.UseInMemoryDatabase("AdtekDB"));
            builder.Services.AddDbContext<AdtekDBContext>(opt => opt.UseSqlServer( builder.Configuration.GetConnectionString("DefaultConnection"),
                builder =>
                {

                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);

                }));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            builder.Services.AddTransient(typeof(DatosPersonalesService));
            builder.Services.AddTransient(typeof(DatosPersonalesRepository));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
