using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class changed_flight_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgentID",
                table: "Flights",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_AgentID",
                table: "Flights",
                column: "AgentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Users_AgentID",
                table: "Flights",
                column: "AgentID",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Users_AgentID",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_AgentID",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "AgentID",
                table: "Flights");
        }
    }
}
