using com.adtek.rh_inventario.br.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using com.adtek.rh_inventario.br.Exceptions;
using com.adtek.rh_inventario.br.Models;
using com.adtek.rh_inventario.br.Repository;

namespace com.adtek.rh_inventario.br.Services
{

    /// <summary>
    /// Servicio para la entidad DatosPersonales
    /// </summary>
    public class DatosPersonalesService: ExceptionService
    {

        private readonly DatosPersonalesRepository datosPersonalesRepository;


        /// <summary>
        /// Constructor del servicio. Inyecta el repositorio de datos personales
        /// </summary>
        /// <param name="datosPersonalesRepository">Repositorio de datos personales</param>
        public DatosPersonalesService(DatosPersonalesRepository datosPersonalesRepository)
        {
            this.datosPersonalesRepository = datosPersonalesRepository;
        }

        /// <summary>
        /// Crea un registro de datos personales
        /// </summary>
        /// <param name="datosPersonalesDto"> Recibe un DTO de datos personales </param>
        /// <returns> Retorna un DTO de datos personales</returns>
        /// <exception cref="Exception">Exceptiones de validaciones </exception>
        public Result<DatosPersonalesDto> Crear(DatosPersonalesDto datosPersonalesDto)
        {

            Result<DatosPersonalesDto> result = new Result<DatosPersonalesDto>();

            try
            {

                string[] errores = this.Valida(datosPersonalesDto);
                Console.WriteLine("errores 1");

                if (errores.Length > 0)
                {
                    Console.WriteLine("errores 2");
                    throw new BadRequestException("La solicitud no es valida", errores);
                }

                DatosPersonales datosPersonales = new DatosPersonales();
                datosPersonales.Nombre = datosPersonalesDto.Nombre;
                datosPersonales.ApellidoPaterno = datosPersonalesDto.ApellidoPaterno;
                datosPersonales.ApellidoMaterno = datosPersonalesDto.ApellidoMaterno;
                datosPersonales.FechaNacimiento = datosPersonalesDto.FechaNacimiento;
                datosPersonales.Nacionalidad = datosPersonalesDto.Nacionalidad;
                datosPersonales.Curp = datosPersonalesDto.Curp;
                datosPersonales.Ine = datosPersonalesDto.Ine;
                datosPersonales.FechaCreacion = DateTime.Now;
                datosPersonales.UsuarioCreacion = "admin";
                datosPersonales.FechaModificacion = DateTime.Now;
                datosPersonales.UsuarioModificacion = "admin";

                this.datosPersonalesRepository.Crear(datosPersonales);

                result.Resultado = ToDTO(datosPersonales);
                result.CreacionExitosa();

                return result;

            }
            catch (Exception e)
            {
                result = this.GeneraError<DatosPersonalesDto>(e);
            }

            return result;
            
        }

        public string[] Valida(DatosPersonalesDto datosPersonalesDto)
        {

            List<string> errores = new List<string>();

            if (datosPersonalesDto == null)
            {
                errores.Add("Los datos personales son requeridos.");
            }

            if (string.IsNullOrEmpty(datosPersonalesDto.Nombre))
            {
                errores.Add("El campo Nombre es obligatorio");
            }

            if (string.IsNullOrEmpty(datosPersonalesDto.ApellidoPaterno))
            {
                errores.Add("El campo Apellido Paterno es obligatorio");
            }

            if (datosPersonalesDto.FechaNacimiento == DateTime.MinValue)
            {
                errores.Add("El campo Fecha de Nacimiento es obligatorio");
            }

            if (datosPersonalesDto.Nacionalidad == 0)
            {
                errores.Add("El campo Nacionalidad es obligatorio");
            }

            if (string.IsNullOrEmpty(datosPersonalesDto.Curp))
            {
                errores.Add("El campo CURP es obligatorio");
            }

            if (string.IsNullOrEmpty(datosPersonalesDto.Ine))
            {
                errores.Add("El campo INE es obligatorio");
            }

            return errores.ToArray();

        }

        private static DatosPersonalesDto ToDTO(DatosPersonales datosPersonales)
        {
            return new DatosPersonalesDto
            {
                Id = datosPersonales.Id,
                Nombre = datosPersonales.Nombre,
                ApellidoPaterno = datosPersonales.ApellidoPaterno,
                ApellidoMaterno = datosPersonales.ApellidoMaterno,
                FechaNacimiento = datosPersonales.FechaNacimiento,
                Nacionalidad = datosPersonales.Nacionalidad,
                Curp = datosPersonales.Curp,
                Ine = datosPersonales.Ine
            };

        }
    }
}
