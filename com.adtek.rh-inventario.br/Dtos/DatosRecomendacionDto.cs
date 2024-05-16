using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace com.adtek.rh_inventario.br.Dtos
{
    /// <summary>
    /// DTO para la entidad DatosRecomendacion
    /// </summary>
    public class DatosRecomendacionDto
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
    }

}
