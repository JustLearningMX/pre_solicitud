namespace com.adtek.rh_inventario.br.Models;

public class DatosRecomendacion
{
    public int Id { get; set; }
    public string NombreRecomendador { get; set; } = null!;
    public string Telefono { get; set; } = null!;
    public int TipoCarta { get; set; }
    public string Puesto { get; set; }
    public string Empresa { get; set; }
    public DateTime FechaCreacion { get; set; }
    public string UsuarioCreacion { get; set; } = null!;
    public DateTime FechaModificacion { get; set; }
    public string UsuarioModificacion { get; set; } = null!;
}