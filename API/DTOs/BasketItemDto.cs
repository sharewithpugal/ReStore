namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string Picture { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
    }
}