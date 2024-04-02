using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Added_Reservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Users_UserId",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_UserId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Flights");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Flights",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_UserId",
                table: "Flights",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Users_UserId",
                table: "Flights",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
