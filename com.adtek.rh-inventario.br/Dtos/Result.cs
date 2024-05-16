using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace com.adtek.rh_inventario.br.Dtos
{
    public class Result<T>
    {

        [JsonPropertyName("codigo")]
        public int Codigo { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; }

        [JsonPropertyName("detalles")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public IEnumerable<string> Detalles { get; set; }

        [JsonPropertyName("resultado")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public T? Resultado { get; set; }

        [JsonPropertyName("resultados")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public IEnumerable<T>? Resultados { get; set; }

        public void OperacionExitosa()
        {
            this.Codigo = (int) HttpStatusCode.OK;
            this.Mensaje = "Operación exitosa";
        }

        public void CreacionExitosa()
        {
            this.Codigo = (int) HttpStatusCode.Created;
            this.Mensaje = "Creacion exitosa";
        }

        public void ActualizacionExitosa()
        {
            this.Codigo = (int)HttpStatusCode.OK;
            this.Mensaje = "Actualizacion exitosa";
        }

        public void ConsultaExitosa()
        {
            this.Codigo = (int)HttpStatusCode.OK;
            this.Mensaje = "Consulta exitosa";
        }

        public void EliminacionExitosa()
        {
            this.Codigo = (int)HttpStatusCode.NoContent;
            this.Mensaje = "Eliminacion exitosa";
        }


    }
}
