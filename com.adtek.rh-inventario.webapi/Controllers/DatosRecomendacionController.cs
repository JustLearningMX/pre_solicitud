using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace com.adtek.rh_inventario.webapi.Controllers
{
    /// <summary>
    /// Controlador de datos de recomendacion
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DatosRecomendacionController : ControllerBase
    {

        private readonly DatosRecomendacionService datosRecomendacionService;

        /// <summary>
        /// Inicializa el controlador para la entidad de datos de recomendacion
        /// </summary>
        /// <param name="datosRecomendacionService">Servicio de datos de recomendacion</param>
        public DatosRecomendacionController(DatosRecomendacionService datosRecomendacionService)
        {
            this.datosRecomendacionService = datosRecomendacionService;
        }

        /// <summary>
        /// Crea un nuevo registro de datos de recomendacion
        /// </summary>
        /// <param name="datosRecomendacionDto">Objeto DTO de datos de recomendacion</param>
        /// <returns>Objeto DTO de datos de recomendacion creado</returns>
        [HttpPost]
        public async Task<ActionResult<DatosRecomendacionDto>> Crear(DatosRecomendacionDto datosRecomendacionDto)
        {

            return datosRecomendacionService.Crear(datosRecomendacionDto);
        }

    }
}
