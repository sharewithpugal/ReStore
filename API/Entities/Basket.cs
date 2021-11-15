using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(Items => Items.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;

        }
        
        public void RemoveItem(int productId, int quantity)
        {
            var product = Items.FirstOrDefault(item => item.ProductId == productId);
            if (product == null) return;
            product.Quantity -= quantity;
            if (product.Quantity == 0) Items.Remove(product);

        }

    }
}