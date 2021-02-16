using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using initsplace.Models;

namespace initsplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContainersController : ControllerBase
    {
        private readonly APIContext _context;

        public ContainersController(APIContext context)
        {
            _context = context;
        }

        // GET: api/Containers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Container>>> GetContainer()
        {
            return await _context.Container.ToListAsync();
        }

        // GET: api/Containers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Container>> GetContainer(int id)
        {
            var container = await _context.Container.FindAsync(id);

            if (container == null)
            {
                return NotFound();
            }

            return container;
        }

        // PUT: api/Containers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContainer(int id, Container container)
        {
            if (id != container.Id)
            {
                return BadRequest();
            }

            _context.Entry(container).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContainerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Containers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Container>> PostContainer(Container container)
        {
            _context.Container.Add(container);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContainer", new { id = container.Id }, container);
        }

        // DELETE: api/Containers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContainer(int id)
        {
            var container = await _context.Container.FindAsync(id);
            if (container == null)
            {
                return NotFound();
            }

            _context.Container.Remove(container);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContainerExists(int id)
        {
            return _context.Container.Any(e => e.Id == id);
        }
    }
}
