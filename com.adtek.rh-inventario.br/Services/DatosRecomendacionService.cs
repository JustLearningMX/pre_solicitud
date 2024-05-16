using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Models;
using com.adtek.rh_inventario.br.Repository;

namespace com.adtek.rh_inventario.br.Services;

public class DatosRecomendacionService
{

    private readonly DatosRecomendacionRepository datosRecomendacionRepository;

    public DatosRecomendacionService(DatosRecomendacionRepository datosRecomendacionRepository)
    {
        this.datosRecomendacionRepository = datosRecomendacionRepository;
    }

    public DatosRecomendacionDto crear(DatosRecomendacionDto datosRecomendacionDto)
    {

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

        return datosRecomendacionDto;
    }
}