﻿using System.ComponentModel.DataAnnotations;

namespace Lienophino.Core.Entities;

public class Meal
{
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    
    public Guid? ImageId { get; set; }
    
    public List<MealHistoryItem> MealHistoryItems { get; set; }
    public List<Meal2MealTag> Meal2MealTags { get; set; }
    public List<Meal2Ingredient> Meal2Ingredients { get; set; }
}