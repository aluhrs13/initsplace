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
    public class ItemsController : ControllerBase
    {
        private readonly APIContext _context;

        public ItemsController(APIContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItem()
        {
            return await _context.Item.Where(i=>i.Parent==null).ToListAsync();
        }

        // GET: api/Items/in/5
        // ID IS THE CONTAINER ID
        [HttpGet("in/{parentId}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsInContainer(int parentId)
        {
            var item = await _context.Item.Where(i => i.Parent.Id == parentId).ToListAsync();

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // GET: api/Items/5
        // TODO - This should be better
        [HttpGet("{id}")]
        public async Task<ActionResult> GetItem(int id)
        {
            var item = await _context.Item.Include(i=>i.Parent).FirstOrDefaultAsync(c => c.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            if (item.Parent == null)
            {
                return Ok(new
                {
                    Name = item.Name,
                    Parent = ""
                });
            }
            else
            {
                return Ok(new
                {
                    Name = item.Name,
                    Parent = new { id = item.Parent.Id, name = item.Parent.Name }
                });
            }

        }

        // PUT: api/Items/5
        // TODO - This won't remove a parent
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, string name = null, int parentId = -1)
        {
            var item = await _context.Item.Include(c => c.Parent).FirstOrDefaultAsync(c => c.Id == id);

            if (!string.IsNullOrEmpty(name))
            {
                item.Name = name;
            }

            if (parentId > 0)
            {
                var parentContainer = await _context.Container.FindAsync(parentId);
                item.Parent = parentContainer;
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(string name, int parentId)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest();
            }
 
            Container parentContainer = await _context.Container.FirstOrDefaultAsync(c => c.Id == parentId);

            Item item = new Item(name, parentContainer);

            _context.Item.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id });
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Item.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Item.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Item.Any(e => e.Id == id);
        }
    }
}
