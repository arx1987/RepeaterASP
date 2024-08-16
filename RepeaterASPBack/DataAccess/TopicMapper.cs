using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepeaterASPBack.Models;
using System.Reflection.Emit;

namespace RepeaterASPBack.DataAccess;

public class TopicMapper : IEntityTypeConfiguration<Topic>
{
    public void Configure(EntityTypeBuilder<Topic> builder)
    {
        builder.ToTable("topics");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(x => x.Number).HasColumnName("number");
        builder.HasIndex(x => x.Number).IsUnique();
        builder.Property(x => x.TopicName).HasColumnName("topic_name");
        builder.Property(x => x.Question).HasColumnName("question");
        builder.Property(x => x.ShortAnswer).HasColumnName("short_answer");
        builder.Property(x => x.LongAnswer).HasColumnName("long_answer");
        builder.Property(x => x.Hints).HasColumnName("hints");
        builder.Property(x => x.AddDate).HasColumnName("add_date");
        builder.Property(x => x.Stage).HasColumnName("stage");
        builder.Property(x => x.TotalChecksAmount).HasColumnName("total_checks_amount");
        builder.Property(x => x.Rate).HasColumnName("rate");
        builder.Property(x => x.LastCheck).HasColumnName("last_check");
        builder.Property(x => x.NextCheck).HasColumnName("next_check");
        builder.ToTable(t => t.HasCheckConstraint("ValidRate", "Rate > -1 AND Rate < 11"));
    }
}
//int number, string topicName, string question, string shortAnswer, string longAnswer
