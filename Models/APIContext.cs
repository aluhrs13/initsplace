using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace initsplace.Models
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options) { }
        public DbSet<Container> Container { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<ItemField> ItemField { get; set; }
        public DbSet<Field> Field { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemField>()
                .HasKey(t => new { t.ItemId, t.FieldId });

            modelBuilder.Entity<ItemField>()
                .HasOne(pt => pt.Item)
                .WithMany(p => p.ItemFields)
                .HasForeignKey(pt => pt.ItemId);

            modelBuilder.Entity<ItemField>()
                .HasOne(pt => pt.Field)
                .WithMany(t => t.ItemFields)
                .HasForeignKey(pt => pt.FieldId);
        }
    }
}
