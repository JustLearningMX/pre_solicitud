using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Exceptions;
using com.adtek.rh_inventario.br.Models;
using com.adtek.rh_inventario.br.Repository;

namespace com.adtek.rh_inventario.br.Services;

/// <summary>
/// Servicio para la gestion de los Datos de Recomendacion
/// </summary>
public class DatosRecomendacionService: ExceptionService
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
    /// <returns> Resultado DTO con los Datos de Recomendacion creados </returns>
    /// <exception cref="Exception"> Excepcion generada si la solicitud no es valida </exception>
    public Result<DatosRecomendacionDto> Crear(DatosRecomendacionDto datosRecomendacionDto)
    {
        Result<DatosRecomendacionDto> result = new Result<DatosRecomendacionDto>();

        try
        {
            string[] errores = this.Valida(datosRecomendacionDto);
            if (errores.Length > 0)
            {
                throw new BadRequestException("La solicitud no es valida", errores);
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

            result.Resultado = ToDTO(datosRecomendacion); //Es aqui donde pasamos el DTO a Resultado
            result.CreacionExitosa(); // Setteamos los valores de Codigo y Mensaje
        }
        catch (Exception ex)
        {
            //Aqui manejamos la excepcion
            result = this.GeneraError<DatosRecomendacionDto>(ex);
        }

        return result;
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

    public Result<List<DatosRecomendacionDto>> ObtenerLista()
    {

        Result<List<DatosRecomendacionDto>> result = new Result<List<DatosRecomendacionDto>>();

        try
        {
            // Obtener los registros de DatosRecomendacion desde el repositorio
            var datosRecomendacionList = this.datosRecomendacionRepository.ObtenerLista();

            if (datosRecomendacionList == null || datosRecomendacionList.Count == 0)
            {
                throw new NotFoundException("Sin registros", ["No se encontraron registros de Datos de Recomendacion"]);
            }

            // Mapear los registros a DTOs
            var datosRecomendacionDtoList = datosRecomendacionList.Select(dr => ToDTO(dr)).ToList();

            result.Resultado = datosRecomendacionDtoList;
            result.ConsultaExitosa();
        }
        catch (Exception ex)
        {
            result = this.GeneraError<List<DatosRecomendacionDto>>(ex);
        }

        return result;
    }

    /// <summary>
    /// Elimina un registro de Datos de Recomendacion
    /// </summary>
    /// <param name="id">El id del registro a eliminar</param>
    public Result<DatosRecomendacionDto> Eliminar(int id)
    {

        Result<DatosRecomendacionDto> result = new Result<DatosRecomendacionDto>();

        try
        {

            if (id <= 0)
            {
                throw new BadRequestException("El Id es requerido", ["Se requiere el Id para eliminar un registro"]);
            }

            this.datosRecomendacionRepository.Eliminar(id);
            result.EliminacionExitosa();
        }
        catch (Exception ex)
        {
            result = this.GeneraError<DatosRecomendacionDto>(ex);
        }

        return result;
    }
}