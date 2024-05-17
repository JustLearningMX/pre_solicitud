namespace com.adtek.rh_inventario.br.Dtos;

public class ApiErrorResult<T>
{
    public int Codigo { get; set; }
    public string? Mensaje { get; set; }
    public IEnumerable<string>? Detalles { get; set; }
}