/*using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepeaterASPBack.Models;
using System.Reflection.Emit;

namespace RepeaterASPBack.DataAccess;

public class RepeatInfoMapper : IEntityTypeConfiguration<RepeatInfo>
{
    public void Configure(EntityTypeBuilder<RepeatInfo> builder)
    {
        builder.ToTable("repeat_info");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(x => x.Hints).HasColumnName("hints");
        builder.Property(x => x.AddDate).HasColumnName("add_date");
        builder.Property(x => x.Stage).HasColumnName("stage");
        builder.Property(x => x.TotalChecksAmount).HasColumnName("total_checks_amount");
        builder.Property(x => x.Rate).HasColumnName("rate");
        builder.Property(x => x.LastCheck).HasColumnName("last_check");
        builder.Property(x => x.NextCheck).HasColumnName("next_check");
        
        
        builder.ToTable(t => t.HasCheckConstraint("ValidRate", "Rate > 0 AND Rate < 11"));
        *//*builder.Entity<RepeatInfo>()
           .ToTable(t => t.HasCheckConstraint("ValidRate", "Rate > 0 AND Rate < 11"));*//*
    }
}*/
//Guid id, string hints, DateTime addDate, Stage stage, int totalChecksAmount, int rate, DateTime lastCheck, DateTime nextCheck