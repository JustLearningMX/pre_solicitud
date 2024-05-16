using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace com.adtek.rh_inventario.br.Dtos
{
    public class DatosRecomendacionDto
    {
        public int Id { get; set; }
        public string NombreRecomendador { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public int TipoCarta { get; set; }
        public string Puesto { get; set; }
        public string Empresa { get; set; }
    }

}
