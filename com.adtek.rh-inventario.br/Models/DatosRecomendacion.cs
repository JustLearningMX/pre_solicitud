namespace com.adtek.rh_inventario.br.Models;

/// <summary>
/// Es un modelo que representa los Datos de Recomendacion
/// </summary>
public class DatosRecomendacion
{

    /// <summary>
    /// Id de la persona
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nombre del recomendador
    /// </summary>
    public string NombreRecomendador { get; set; } = null!;

    /// <summary>
    /// Telefono del recomendador
    /// </summary>
    public string Telefono { get; set; } = null!;

    /// <summary>
    /// Tipo de carta de recomendacion
    /// </summary>
    public int TipoCarta { get; set; }

    /// <summary>
    /// Puesto del recomendador
    /// </summary>
    public string Puesto { get; set; }

    /// <summary>
    /// Empresa del recomendador
    /// </summary>
    public string Empresa { get; set; }

    /// <summary>
    /// Fecha de creacion del registro
    /// </summary>
    public DateTime FechaCreacion { get; set; }

    /// <summary>
    /// Usuario que creo el registro
    /// </summary>
    public string UsuarioCreacion { get; set; } = null!;

    /// <summary>
    /// Fecha de modificacion del registro
    /// </summary>
    public DateTime FechaModificacion { get; set; }

    /// <summary>
    /// Usuario que modifico el registro
    /// </summary>
    public string UsuarioModificacion { get; set; } = null!;
}