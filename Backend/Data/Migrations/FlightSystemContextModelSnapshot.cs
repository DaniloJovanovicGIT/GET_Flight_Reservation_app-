﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Data.Migrations
{
    [DbContext(typeof(FlightSystemContext))]
    partial class FlightSystemContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("Backend.Entities.City", b =>
                {
                    b.Property<int>("CityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CityId");

                    b.ToTable("Cities");

                    b.HasData(
                        new
                        {
                            CityId = 1,
                            Name = "Beograd"
                        },
                        new
                        {
                            CityId = 2,
                            Name = "Niš"
                        },
                        new
                        {
                            CityId = 3,
                            Name = "Kraljevo"
                        },
                        new
                        {
                            CityId = 4,
                            Name = "Priština"
                        });
                });

            modelBuilder.Entity("Backend.Entities.Flight", b =>
                {
                    b.Property<int>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArrivalCityID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AvailableSeatsCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DepartureCityID")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DepartureDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("NumberOfConnections")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("FlightId");

                    b.HasIndex("ArrivalCityID");

                    b.HasIndex("DepartureCityID");

                    b.HasIndex("UserId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("Backend.Entities.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Password = "admin",
                            Role = "admin",
                            Username = "admin"
                        },
                        new
                        {
                            UserId = 2,
                            Password = "agent",
                            Role = "agent",
                            Username = "agent"
                        },
                        new
                        {
                            UserId = 3,
                            Password = "visitor",
                            Role = "visitor",
                            Username = "visitor"
                        });
                });

            modelBuilder.Entity("Backend.Entities.Flight", b =>
                {
                    b.HasOne("Backend.Entities.City", "ArrivalCity")
                        .WithMany()
                        .HasForeignKey("ArrivalCityID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Entities.City", "DepartureCity")
                        .WithMany()
                        .HasForeignKey("DepartureCityID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Entities.User", null)
                        .WithMany("Flights")
                        .HasForeignKey("UserId");

                    b.Navigation("ArrivalCity");

                    b.Navigation("DepartureCity");
                });

            modelBuilder.Entity("Backend.Entities.User", b =>
                {
                    b.Navigation("Flights");
                });
#pragma warning restore 612, 618
        }
    }
}
