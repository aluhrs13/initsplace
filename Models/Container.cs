using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace initsplace.Models
{
    public class Container
    {
        public int Id { get; set; }
        public Container Parent { get; set; }
        public string Name { get; set; }
    }
}
