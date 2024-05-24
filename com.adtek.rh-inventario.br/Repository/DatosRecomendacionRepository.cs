using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Exceptions;
using com.adtek.rh_inventario.br.Models;
using Microsoft.EntityFrameworkCore;

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

    /// <summary>
    /// Elimina un registro de DatosRecomendacion
    /// </summary>
    public void Eliminar(int id)
    {
        DatosRecomendacion datosRecomendacion = context.DatosRecomendacion.Find(id);

        if (datosRecomendacion == null)
        {
            string[] errors = [$"No se encontro un registro acerca de ese documento con id {id}"];
            throw new NotFoundException("Sin registro del documento", errors);
        }

        context.DatosRecomendacion.Remove(datosRecomendacion);
        context.SaveChanges();
    }

    /// <summary>
    /// Obtiene un registro de DatosRecomendacion por su ID
    /// </summary>
    /// <returns>DTO de DatosRecomendacion</returns>
    /// <param name="id"> ID del documento a buscar </param>
    public DatosRecomendacion ObtenerPorId(int id)
    {
        var datosRecomendacion = context.DatosRecomendacion.Find(id);

        if (datosRecomendacion == null)
        {
            string[] errors = [$"No se encontro un registro acerca del documento con id {id}"];
            throw new NotFoundException("Sin registro del documento", errors);
        }

        return datosRecomendacion;
    }
}