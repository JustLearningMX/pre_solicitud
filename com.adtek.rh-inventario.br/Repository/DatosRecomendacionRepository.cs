using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Models;

namespace com.adtek.rh_inventario.br.Repository;

/// <summary>
/// Repositorio para operaciones de BD de la entidad DatosRecomendacion
/// </summary>
public class DatosRecomendacionRepository
{

    private readonly AdtekDBContext context;

    /// <summary>
    /// Inicializa el contexto de la BD
    /// </summary>
    /// <param name="context"> Contexto de la BD </param>
    public DatosRecomendacionRepository(AdtekDBContext context)
    {
        this.context = context;
    }


    /// <summary>
    /// Crea un nuevo registro de DatosRecomendacion
    /// </summary>
    /// <param name="datosRecomendacion"> Modelo de DatosRecomendacion a crear </param>
    public void Crear(DatosRecomendacion datosRecomendacion)
    {
        context.DatosRecomendacion.Add(datosRecomendacion);
        context.SaveChanges();
    }

    /// <summary>
    /// Obtiene todos los registros de DatosRecomendacion
    /// </summary>
    /// <returns>Lista de DatosRecomendacion</returns>
    public List<DatosRecomendacion> ObtenerLista()
    {
        return context.DatosRecomendacion.ToList();
    }
}