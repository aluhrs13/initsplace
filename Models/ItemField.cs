using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace initsplace.Models
{
    public class ItemField
    {

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public int FieldId{ get; set; }
        public Field Field { get; set; }

        public string Value { get; set; }
    }
}
