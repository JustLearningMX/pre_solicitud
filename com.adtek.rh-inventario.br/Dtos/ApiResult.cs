namespace com.adtek.rh_inventario.br.Dtos;

public class ApiResult<T>
{
    public int Codigo { get; set; }
    public string? Mensaje { get; set; }
    public T? Resultado { get; set; }
}