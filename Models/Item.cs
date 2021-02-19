using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace initsplace.Models
{
    public class Item
    {
        public int Id { get; set; }
        public Container Parent { get; set; }
        public string Name { get; set; }
        public List<ItemField> ItemFields { get; set; }

        public Item()
        {

        }

        public Item(string name, Container parent)
        {
            Parent = parent;
            Name = name;
        }
    }
}
