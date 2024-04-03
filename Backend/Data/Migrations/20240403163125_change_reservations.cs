using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class change_reservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_AgentId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_AgentId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "AgentId",
                table: "Reservations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgentId",
                table: "Reservations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_AgentId",
                table: "Reservations",
                column: "AgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_AgentId",
                table: "Reservations",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
