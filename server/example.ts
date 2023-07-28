// Função para inserir um novo sinal e atualizar a tabela de status

async function inserirSinal(data: Date) {
	try {

		await db.transaction(async (trx) => {
			// Obter a data do último sinal recebido
			const ultimoSinal = await trx("sinais").max("data as ultimo_sinal").first();

			// Calcular a diferença em minutos entre o último sinal e o novo sinal
			const diffMinutos = Math.floor((data.getTime() - ultimoSinal.ultimo_sinal.getTime()) / (1000 * 60));

			let status = "";

			if (diffMinutos > 5) {
				status = "desligado";
			} else {
				status = "ligado";
			}

			// Inserir o novo sinal
			await trx("sinais").insert({ data });

			// Atualizar a tabela de status
			await trx("status").insert({ status });

			// Confirmar a transação
			await trx.commit();
		});
		
	} catch (error) {
		// Lidar com erros
		console.error(error);
	}
}

// Exemplo de uso
const novoSinal = new Date();
inserirSinal(novoSinal);
