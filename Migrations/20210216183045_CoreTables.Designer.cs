﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using initsplace.Models;

namespace initsplace.Migrations
{
    [DbContext(typeof(APIContext))]
    [Migration("20210216183045_CoreTables")]
    partial class CoreTables
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("initsplace.Models.Container", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Container");
                });

            modelBuilder.Entity("initsplace.Models.Field", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Field");
                });

            modelBuilder.Entity("initsplace.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Item");
                });

            modelBuilder.Entity("initsplace.Models.ItemField", b =>
                {
                    b.Property<int>("ItemId")
                        .HasColumnType("integer");

                    b.Property<int>("FieldId")
                        .HasColumnType("integer");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("ItemId", "FieldId");

                    b.HasIndex("FieldId");

                    b.ToTable("ItemField");
                });

            modelBuilder.Entity("initsplace.Models.Container", b =>
                {
                    b.HasOne("initsplace.Models.Container", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("initsplace.Models.Item", b =>
                {
                    b.HasOne("initsplace.Models.Container", "Parent")
                        .WithMany("Items")
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("initsplace.Models.ItemField", b =>
                {
                    b.HasOne("initsplace.Models.Field", "Field")
                        .WithMany("ItemFields")
                        .HasForeignKey("FieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("initsplace.Models.Item", "Item")
                        .WithMany("ItemFields")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Field");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("initsplace.Models.Container", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("initsplace.Models.Field", b =>
                {
                    b.Navigation("ItemFields");
                });

            modelBuilder.Entity("initsplace.Models.Item", b =>
                {
                    b.Navigation("ItemFields");
                });
#pragma warning restore 612, 618
        }
    }
}
