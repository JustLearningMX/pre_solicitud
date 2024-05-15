using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using com.adtek.rh_inventario.br.Dtos;
using com.adtek.rh_inventario.br.Exceptions;

namespace com.adtek.rh_inventario.br.Services
{
    public class ExceptionService
    {

        public Result<T> GeneraError<T>(Exception ex)
        {
            Result<T> result = new Result<T>();
            ApiException apiException = ex is ApiException ? (ApiException)ex : new ApiException((int)HttpStatusCode.InternalServerError, "Error en el servidor", ex.Message);
            result.Codigo = apiException.Code;
            result.Mensaje = apiException.Message;
            result.Detalles = apiException.Detalles;

            return result;
        }
    }
}
