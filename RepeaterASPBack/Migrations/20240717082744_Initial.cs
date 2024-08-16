using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RepeaterASPBack.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "topics",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    number = table.Column<int>(type: "int", nullable: false),
                    topic_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    short_answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    long_answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hints = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    add_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    stage = table.Column<int>(type: "int", nullable: false),
                    total_checks_amount = table.Column<int>(type: "int", nullable: false),
                    rate = table.Column<int>(type: "int", nullable: false),
                    last_check = table.Column<DateTime>(type: "datetime2", nullable: false),
                    next_check = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_topics", x => x.id);
                    table.CheckConstraint("ValidRate", "Rate > -1 AND Rate < 11");
                });

            migrationBuilder.CreateIndex(
                name: "IX_topics_number",
                table: "topics",
                column: "number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "topics");
        }
    }
}
