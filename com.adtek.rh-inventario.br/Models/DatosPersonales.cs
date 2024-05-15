using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace com.adtek.rh_inventario.br.Models
{

    /// <summary>
    /// Modelo para la entidad DatosPersonales
    /// </summary>
    public class DatosPersonales
    {

        /// <summary>
        /// Id de la entidad
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la persona
        /// </summary>
        public string Nombre { get; set; } = null!;

        /// <summary>
        /// Apellido paterno de la persona
        /// </summary>
        public string ApellidoPaterno { get; set; } = null!;

        /// <summary>
        /// Apellido materno de la persona
        /// </summary>
        public string ApellidoMaterno { get; set; } = null;

        /// <summary>
        /// Fecha de nacimiento de la persona
        /// </summary>
        public DateTime FechaNacimiento { get; set; }

        /// <summary>
        /// Nacionalidad de la persona
        /// </summary>
        public int Nacionalidad { get; set; }

        /// <summary>
        /// Curp de la persona
        /// </summary>
        public string Curp { get; set; } = null!;

        /// <summary>
        /// Ine de la persona
        /// </summary>
        public string Ine { get; set; } = null!;

        /// <summary>
        /// Fecha de creación del registro
        /// </summary>
        public DateTime FechaCreacion { get; set; }

        /// <summary>
        /// Usuario que creó el registro
        /// </summary>
        public string UsuarioCreacion{ get; set; } = null!;

        /// <summary>
        /// Fecha de modificación del registro
        /// </summary>
        public DateTime FechaModificacion { get; set; }

        /// <summary>
        /// Usuario que modificó el registro
        /// </summary>
        public string UsuarioModificacion { get; set; } = null!;
    }
}
