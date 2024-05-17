using com.adtek.rh_inventario.br.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace com.adtek.rh_inventario.webapi.Controllers
{
    public class MainController : ControllerBase
    {
        protected Task<ObjectResult> RespuestaAsync<T>(Result<T> result)
        {

            return Task.Run(() => this.StatusCode(result.Codigo, result));
        }
    }
}
