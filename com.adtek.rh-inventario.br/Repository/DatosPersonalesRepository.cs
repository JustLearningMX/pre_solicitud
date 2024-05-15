using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using com.adtek.rh_inventario.br.Models;

namespace com.adtek.rh_inventario.br.Repository
{

    /// <summary>
    /// Repositorio para la entidad DatosPersonales
    /// </summary>
    public class DatosPersonalesRepository
    {

        private readonly AdtekDBContext context;

        /// <summary>
        /// Constructor del repositorio. Inyecta el contexto de la base de datos
        /// </summary>
        /// <param name="context"> Contexto </param>
        public DatosPersonalesRepository(AdtekDBContext context)
        {
            this.context = context;
        }


        /// <summary>
        /// Crea un registro de datos personales
        /// </summary>
        /// <param name="datosPersonales">Modelo de de la tabla para Datos Personales</param>
        public void Crear(DatosPersonales datosPersonales)
        {
            context.DatosPersonales.Add(datosPersonales);
            context.SaveChanges();
            // return;
        }
    }
}
