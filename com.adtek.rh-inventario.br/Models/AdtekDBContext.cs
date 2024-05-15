using Microsoft.EntityFrameworkCore;

namespace com.adtek.rh_inventario.br.Models;


/// <summary>
/// Contexto de la base de datos
/// </summary>
public class AdtekDBContext : DbContext
{

    /// <summary>
    /// Constructor sin parámetros
    /// </summary>
    public AdtekDBContext()
    {
    }

    /// <summary>
    /// Constructor que crea un contexto de la base de datos Adtek
    /// </summary>
    /// <param name="options"></param>
    public AdtekDBContext(DbContextOptions<AdtekDBContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost; Database=AdtekDB; User ID=capacitacion; Password=Passw0rd; Trusted_Connection=true; TrustServerCertificate=true");
    }

    /// <summary>
    /// Entidad de datos personalese en la BD
    /// </summary>
    public DbSet<DatosPersonales> DatosPersonales { get; set; } = null!;
    
}