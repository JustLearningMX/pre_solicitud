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
    public class DatosRecomendacionController : MainController
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
        [ProducesResponseType(typeof(ApiResult<DatosPersonalesDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosPersonalesDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosPersonalesDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Result<DatosRecomendacionDto>>> Crear(DatosRecomendacionDto datosRecomendacionDto)
        {
            return await this.RespuestaAsync(datosRecomendacionService.Crear(datosRecomendacionDto));
        }

        /// <summary>
        /// Obtiene los registros de datos de recomendacion
        /// </summary>
        /// <returns>Listado de datos de recomendacion obtenido</returns>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResult<List<DatosRecomendacionDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiErrorResult<List<DatosRecomendacionDto>>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiErrorResult<List<DatosRecomendacionDto>>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Result<List<DatosRecomendacionDto>>>> ObtenerLista()
        {
            return await this.RespuestaAsync(datosRecomendacionService.ObtenerLista());
        }

        /// <summary>
        /// Elimina un registro de datos de recomendacion
        /// </summary>
        /// <param name="id">El id del registro a eliminar</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResult<DatosRecomendacionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Result<DatosRecomendacionDto>>> Eliminar(int id)
        {
            return await this.RespuestaAsync(datosRecomendacionService.Eliminar(id));
        }

        /// <summary>
        /// Obtiene un registro de DatosRecomendacion por su ID
        /// </summary>
        /// <returns>DTO de DatosRecomendacion</returns>
        /// <param name="id"> ID del documento a buscar </param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResult<DatosRecomendacionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosRecomendacionDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Result<DatosRecomendacionDto>>> ObtenerPorId(int id)
        {
            return await this.RespuestaAsync(datosRecomendacionService.ObtenerPorId(id));
        }


    }
}
