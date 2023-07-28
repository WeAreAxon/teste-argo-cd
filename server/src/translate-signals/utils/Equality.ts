
export default class Equality {
	static async check(sinaisParaInterpretar: Record<string, any>[], catalogoDeSinaisBase: Record<string, any>[]) {
		const estagiosFinalizados: any[] = [];
		const estagiosPossiveis: any = [];
		let somaUnidadeDeContagem = 0;
		let id = 0;
		catalogoDeSinaisBase.forEach((sinal) => {
			estagiosPossiveis.push(sinal.estagio);
		});

		for (let i = 0; i < sinaisParaInterpretar.length; i++) {
			const sinalList = sinaisParaInterpretar[i];
			for (let j = 0; j < catalogoDeSinaisBase.length; j++) {
				const catalogoList = catalogoDeSinaisBase[j];
				if (catalogoList?.signals === sinalList?.signals) {
					estagiosFinalizados.push(catalogoList?.estagio);
				}
				if (estagiosFinalizados.length === catalogoDeSinaisBase.length) {
					let estaCompleto = true;
					estagiosPossiveis.forEach((estagio: number) => {
						if (!estagiosFinalizados.includes(estagio)) {
							estaCompleto = false;
						}
					});

					if (estaCompleto) {
						id = sinalList?.id;
						somaUnidadeDeContagem++;
					}

					estagiosFinalizados.length = 0;
				}
			}
		}
		return { actionCount: somaUnidadeDeContagem, id, };
	}
}