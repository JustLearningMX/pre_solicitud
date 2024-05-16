using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace com.adtek.rh_inventario.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosRecomendacionController : ControllerBase
    {

        private readonly DatosRecomendacionService datosRecomendacionService;

        public DatosRecomendacionController(DatosRecomendacionService datosRecomendacionService)
        {
            this.datosRecomendacionService = datosRecomendacionService;
        }

        [HttpPost]
        public async Task<ActionResult<DatosRecomendacionDto>> Crear(DatosRecomendacionDto datosRecomendacionDto)
        {

            return datosRecomendacionService.crear(datosRecomendacionDto);
        }

    }
}
