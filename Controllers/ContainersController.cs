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
        //TODO - Doesn't handle a container nested in itself
        //TODO - Just returns too much data in general, make this a manual tree traversal.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Container>>> GetContainer()
        {
            return await _context.Container.Include(c=>c.Parent).Where(c=>c.Parent==null).ToListAsync();
        }

        // GET: api/Containers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Container>>> GetContainer(int id)
        {
            var container = await _context.Container.Include(c => c.Parent).Where(c => c.Parent.Id == id).ToListAsync();

            if (container == null)
            {
                return NotFound();
            }

            return container;
        }

        // GET: api/Containers/details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetContainerDetails(int id)
        {
            var currentContainer = await _context.Container.Include(c => c.Parent).FirstOrDefaultAsync(c => c.Id == id);

            if (currentContainer.Parent == null)
            {
                return Ok(new
                {
                    Name = currentContainer.Name,
                    Parent = ""
                });
            }
            else
            {
                return Ok(new
                {
                    Name = currentContainer.Name,
                    Parent = new { id = currentContainer.Parent.Id, name = currentContainer.Parent.Name }
                });
            }

        }

        // PUT: api/Containers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContainer(int id, string name=null, int parentId=-1)
        {
            var container = await _context.Container.Include(c=>c.Parent).FirstOrDefaultAsync(c=>c.Id==id);

            if (!string.IsNullOrEmpty(name))
            {
                container.Name = name;
            }

            if(parentId >0)
            {
                var parentContainer = await _context.Container.FindAsync(parentId);
                container.Parent = parentContainer;
            }
            else
            {
                container.Parent = null;
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
        [HttpPost]
        public async Task<ActionResult<Container>> PostContainer(string name, int parentId = -1)
        {
            if(string.IsNullOrEmpty(name))
            {
                return BadRequest();
            }

            Container container;

            if (parentId > 0)
            {
                Container parentContainer = await _context.Container.FindAsync(parentId);
                container = new Container(name, parentContainer);
            }
            else
            {
                container = new Container(name);
            }

            _context.Container.Add(container);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContainer", new { id = container.Id }, container);
        }

        // DELETE: api/Containers/5
        //TODO - Need to empty a container before deleting
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
