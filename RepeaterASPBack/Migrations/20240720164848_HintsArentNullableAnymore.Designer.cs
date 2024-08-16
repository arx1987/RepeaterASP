﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RepeaterASPBack.DataAccess;

#nullable disable

namespace RepeaterASPBack.Migrations
{
    [DbContext(typeof(TopicDbContext))]
    [Migration("20240720164848_HintsArentNullableAnymore")]
    partial class HintsArentNullableAnymore
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RepeaterASPBack.Models.Topic", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id");

                    b.Property<DateTime>("AddDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("add_date");

                    b.Property<string>("Hints")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("hints");

                    b.Property<DateTime>("LastCheck")
                        .HasColumnType("datetime2")
                        .HasColumnName("last_check");

                    b.Property<string>("LongAnswer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("long_answer");

                    b.Property<DateTime>("NextCheck")
                        .HasColumnType("datetime2")
                        .HasColumnName("next_check");

                    b.Property<int>("Number")
                        .HasColumnType("int")
                        .HasColumnName("number");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("question");

                    b.Property<int>("Rate")
                        .HasColumnType("int")
                        .HasColumnName("rate");

                    b.Property<string>("ShortAnswer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("short_answer");

                    b.Property<int>("Stage")
                        .HasColumnType("int")
                        .HasColumnName("stage");

                    b.Property<string>("TopicName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("topic_name");

                    b.Property<int>("TotalChecksAmount")
                        .HasColumnType("int")
                        .HasColumnName("total_checks_amount");

                    b.HasKey("Id");

                    b.HasIndex("Number")
                        .IsUnique();

                    b.ToTable("topics", null, t =>
                        {
                            t.HasCheckConstraint("ValidRate", "Rate > -1 AND Rate < 11");
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
