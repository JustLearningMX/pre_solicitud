using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using com.adtek.rh_inventario.webapi.Models;

namespace com.adtek.rh_inventario.webapi.Controllers
{

    /// <summary>
    /// Controlador para la entidad DatosPersonales
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DatosPersonalesController : MainController
    {
        private readonly DatosPersonalesService datosPersonalesService;


        /// <summary>
        /// Constructor del controlador. Inyecta el servicio de datos personales
        /// </summary>
        /// <param name="datosPersonalesService"> Servicio de datos personales</param>
        public DatosPersonalesController(DatosPersonalesService datosPersonalesService)
        {
            this.datosPersonalesService = datosPersonalesService;
        }


        /// <summary>
        /// Crea un registro de datos personales
        /// </summary>
        /// <param name="datosPersonalesDto">Objeto DTO de Datos Personales a Crear</param>
        /// <returns>Objeto DTO de Datos Personales creado, con su ID</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResult<DatosPersonalesDto>),StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosPersonalesDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiErrorResult<DatosPersonalesDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Result<DatosPersonalesDto>>> Crear(DatosPersonalesDto datosPersonalesDto)
        {
            return await this.RespuestaAsync(datosPersonalesService.Crear(datosPersonalesDto));
        }

    }
}
