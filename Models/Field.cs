using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace initsplace.Models
{
    public class Field
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<ItemField> ItemFields { get; set; }
    }
}
