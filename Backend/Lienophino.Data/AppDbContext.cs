﻿using Lienophino.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Lienophino.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Meal>();

        modelBuilder.Entity<MealHistoryItem>()
            .HasKey(x => new {x.MealId, x.Date});

        modelBuilder.Entity<MealTag>();
        modelBuilder.Entity<Meal2MealTag>()
            .HasKey(x => new {x.MealId, x.MealTagId});

        modelBuilder.Entity<Ingredient>();
        modelBuilder.Entity<Meal2Ingredient>()
            .HasKey(x => new {x.MealId, x.IngredientId});

        base.OnModelCreating(modelBuilder);
    }
}