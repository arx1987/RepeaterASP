using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RepeaterASPBack.Models;

namespace RepeaterASPBack.DataAccess;

public class TopicDbContext : DbContext
{
    private readonly IConfiguration _configuration;
    public DbSet<Topic> Topics { get ; set; }
 /*   public DbSet<RepeatInfo> RepeatInfos => Set<RepeatInfo>();*/
    public TopicDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        optionsBuilder.LogTo(Console.WriteLine, new[] { RelationalEventId.CommandExecuted });
        optionsBuilder.LogTo(message => System.Diagnostics.Debug.WriteLine(message), new[] {DbLoggerCategory.Migrations.Name, DbLoggerCategory.Database.Command.Name, });
        //base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AssemblyMark).Assembly);
        /*modelBuilder.Entity<RepeatInfo>()
            .ToTable(t => t.HasCheckConstraint("ValidRate", "Rate > 0 AND Rate < 11"));*/
    }
}
