using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace com.adtek.rh_inventario.br.Dtos
{
    /// <summary>
    /// DTO para la entidad DatosRecomendacion con campos de auditoria
    /// </summary>
    public class DatosRecomendacionFullDto
    {

        /// <summary>
        /// Id de la entidad
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la persona que recomienda
        /// </summary>
        public string NombreRecomendador { get; set; } = null!;

        /// <summary>
        /// Telefono de la persona que recomienda
        /// </summary>
        public string Telefono { get; set; } = null!;

        /// <summary>
        /// Tipo de carta de recomendacion
        /// </summary>
        public int TipoCarta { get; set; }

        /// <summary>
        /// Si la carta es Laboral, puesto de la persona que recomienda
        /// </summary>
        public string Puesto { get; set; }

        /// <summary>
        /// Si la carta es Laboral, empresa de la persona que recomienda
        /// </summary>
        public string Empresa { get; set; }

        /// <summary>
        /// Fecha de creacion del registro
        /// </summary>
        public DateTime FechaCreacion { get; set; }

        /// <summary>
        /// Usuario que creo el registro
        /// </summary>
        public string UsuarioCreacion { get; set; } = null!;

        /// <summary>
        /// Fecha de modificacion del registro
        /// </summary>
        public DateTime FechaModificacion { get; set; }

        /// <summary>
        /// Usuario que modifico el registro
        /// </summary>
        public string UsuarioModificacion { get; set; } = null!;
    }

}
