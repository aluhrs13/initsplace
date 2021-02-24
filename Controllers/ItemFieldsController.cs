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
    public class ItemFieldsController : ControllerBase
    {
        private readonly APIContext _context;

        public ItemFieldsController(APIContext context)
        {
            _context = context;
        }

        // GET: api/ItemFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Field>>> GetItemField()
        {
            return await _context.Field.ToListAsync();
        }

        // GET: api/ItemFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetItemField(int id)
        {
            var itemField = await _context.ItemField.Where(i=>i.ItemId==id).Include(i=>i.Field).ToListAsync();

            var trimmed = itemField.Select(i => new { FieldId=i.FieldId, Name = i.Field.Name, Value = i.Value }).ToList();

            if (itemField == null)
            {
                return NotFound();
            }

            return Ok(trimmed);
        }

        // PUT: api/ItemFields/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemField(int id, ItemField itemField)
        {
            if (id != itemField.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(itemField).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemFieldExists(id))
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

        // POST: api/ItemFields
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemField>> PostItemField(int fieldId, int itemId, string value)
        {
            ItemField newItemField = new ItemField(fieldId, itemId, value);

            _context.ItemField.Add(newItemField);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemFieldExists(newItemField.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemField", new { value = newItemField.Value });
        }

        // DELETE: api/ItemFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemField(int id)
        {
            var itemField = await _context.ItemField.FindAsync(id);
            if (itemField == null)
            {
                return NotFound();
            }

            _context.ItemField.Remove(itemField);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemFieldExists(int id)
        {
            return _context.ItemField.Any(e => e.ItemId == id);
        }
    }
}
