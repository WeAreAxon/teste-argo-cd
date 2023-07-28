import { mysql } from "../../_config/database";

export default class Table {

	static async tableExists(): Promise<void> {

		await mysql.schema.hasTable("SIGNALS")
			.then(async (exists) => {

				if (!exists) {
					await mysql.schema.createTable("SIGNALS", (tbl) => {
						tbl.increments("ID");
						tbl.integer("device_fk").unsigned();
						tbl.foreign("device_fk",).references("DEVICE.ID");
						tbl.specificType("signals", "varchar(15)").defaultTo("0000");
						tbl.specificType("status", "varchar(60)").defaultTo("Pendente");
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
					});
				}
			});

		await mysql.schema.hasTable("LOOKUP_CATEGORIA_MAQUINA")
			.then(async (exists) => {
				if (!exists) {
					await mysql.schema.createTable("LOOKUP_CATEGORIA_MAQUINA", (tbl) => {
						tbl.increments("ID");
						tbl.specificType("unidade", "varchar(15)");
						tbl.specificType("categoria", "varchar(15)");
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
					});
				}
			});

		await mysql.schema.hasTable("CATEGORIA_MAQUINA")
			.then(async (exists) => {
				if (!exists) {
					await mysql.schema.createTable("CATEGORIA_MAQUINA", (tbl) => {
						tbl.increments("ID");
						tbl.integer("unidade_fk").unsigned();
						tbl.foreign("unidade_fk",).references("LOOKUP_CATEGORIA_MAQUINA.ID");
						tbl.specificType("signals", "varchar(15)");
						tbl.specificType("estagio", "tinyint(1)");
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
					});
				}
			});

		await mysql.schema.hasTable("DASHBOARD")
			.then(async (exists) => {
				if (!exists) {
					await mysql.schema.createTable("DASHBOARD", (tbl) => {
						tbl.increments("ID");
						tbl.integer("device_fk").unsigned();
						tbl.foreign("device_fk",).references("DEVICE.ID");
						tbl.integer("unidade_fk").unsigned();
						tbl.foreign("unidade_fk").references("LOOKUP_CATEGORIA_MAQUINA.ID");
						tbl.specificType("quantidade", "integer");
						tbl.specificType("status", "varchar(60)").defaultTo("Pendente");
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
						tbl.specificType("shift", "int");
					});
				}
			});

		await mysql.schema.hasTable("DEVICE")
			.then(async (exists) => {
				if (!exists) {
					await mysql.schema.createTable("DEVICE", (tbl) => {
						tbl.increments("ID");
						tbl.integer("categoria_fk").unsigned();
						tbl.foreign("categoria_fk",).references("LOOKUP_CATEGORIA_MAQUINA.ID");
						tbl.specificType("numero_serie", "varchar(30)");
						tbl.specificType("email_proprietaria", "varchar(60)");
						tbl.specificType("apelido", "varchar(60)").defaultTo(null);
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
					});
				}
			});

		await mysql.schema.hasTable("STATUS")
			.then(async (exists) => {
				if (!exists) {
					await mysql.schema.createTable("STATUS", (tbl) => {
						tbl.increments("ID");
						tbl.integer("device_fk").unsigned();
						tbl.foreign("device_fk",).references("DEVICE.ID");
						tbl.specificType("status", "varchar(60)");
						tbl.specificType("tempo_milisegundos", "decimal(10,0)");
						tbl.specificType("data_criacao", "timestamp(3)").defaultTo(mysql.fn.now(3));
						tbl.specificType("shift", "int");
					});
				}
			});

	}
}