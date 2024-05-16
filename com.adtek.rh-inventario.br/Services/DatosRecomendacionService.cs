using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Models;
using com.adtek.rh_inventario.br.Repository;

namespace com.adtek.rh_inventario.br.Services;

/// <summary>
/// Servicio para la gestion de los Datos de Recomendacion
/// </summary>
public class DatosRecomendacionService
{

    private readonly DatosRecomendacionRepository datosRecomendacionRepository;


    /// <summary>
    /// Inicializa el servicio de Datos de Recomendacion
    /// </summary>
    /// <param name="datosRecomendacionRepository"> Repositorio de Datos de Recomendacion </param>
    public DatosRecomendacionService(DatosRecomendacionRepository datosRecomendacionRepository)
    {
        this.datosRecomendacionRepository = datosRecomendacionRepository;
    }


    /// <summary>
    /// Crea un nuevo registro de Datos de Recomendacion
    /// </summary>
    /// <param name="datosRecomendacionDto"> Objetos DTO con los Datos de Recomendacion a crear </param>
    /// <returns> Objeto DTO con los Datos de Recomendacion creados </returns>
    /// <exception cref="Exception"> Excepcion generada si la solicitud no es valida </exception>
    public DatosRecomendacionDto Crear(DatosRecomendacionDto datosRecomendacionDto)
    {

        string[] errores = this.Valida(datosRecomendacionDto);
        if (errores.Length > 0)
        {
            throw new Exception("400 - La solicitud no es valida");
        }

        DatosRecomendacion datosRecomendacion = new()
        {
            NombreRecomendador = datosRecomendacionDto.NombreRecomendador,
            Telefono = datosRecomendacionDto.Telefono,
            TipoCarta = datosRecomendacionDto.TipoCarta,
            Puesto = datosRecomendacionDto.Puesto,
            Empresa = datosRecomendacionDto.Empresa,
            FechaCreacion = DateTime.Now,
            UsuarioCreacion = "Admin",
            FechaModificacion = DateTime.Now,
            UsuarioModificacion = "Admin"
        };

        this.datosRecomendacionRepository.Crear(datosRecomendacion);
        return ToDTO(datosRecomendacion);
    }

    private string[] Valida(DatosRecomendacionDto datosRecomendacionDto)
    {
        List<string> listaValidaciones = new List<string>();

        if (datosRecomendacionDto == null)
        {
            listaValidaciones.Add("Los Datos de Recomendacion son requeridos");
        }
        else
        {
            if (string.IsNullOrEmpty(datosRecomendacionDto.NombreRecomendador))
            {
                listaValidaciones.Add("El Nombre del Recomendador es requerido");
            }

            if (string.IsNullOrEmpty(datosRecomendacionDto.Telefono))
            {
                listaValidaciones.Add("El Telefono es requerido");
            }

            if (datosRecomendacionDto.TipoCarta == 0)
            {
                listaValidaciones.Add("El Tipo de Carta es requerido");
            }

            if (datosRecomendacionDto.TipoCarta == 2 && string.IsNullOrEmpty(datosRecomendacionDto.Puesto))
            {
                listaValidaciones.Add("El Puesto es requerido");
            }

            if (datosRecomendacionDto.TipoCarta == 2 && string.IsNullOrEmpty(datosRecomendacionDto.Empresa))
            {
                listaValidaciones.Add("La Empresa es requerida");
            }
        }

        return listaValidaciones.ToArray();
    }

    private static DatosRecomendacionDto ToDTO(DatosRecomendacion datosRecomendacion)
    {
        return new DatosRecomendacionDto
        {
            Id = datosRecomendacion.Id,
            NombreRecomendador = datosRecomendacion.NombreRecomendador,
            Telefono = datosRecomendacion.Telefono,
            TipoCarta = datosRecomendacion.TipoCarta,
            Puesto = datosRecomendacion.Puesto,
            Empresa = datosRecomendacion.Empresa
        };
    }
}