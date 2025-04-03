import { Oportunidades } from '../entities/oportunidade.entity.js';
import * as XLSX from 'xlsx';

const formatHeader = (header: string) => {
  return header
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Adiciona espaço entre palavras no camelCase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
};

export const handleExportExcel = async (filteredOPortunities: any[]) => {
  const formattedData = filteredOPortunities.map((item) => ({
    Nome: item.nome ? item.nome.toUpperCase() : '',
    Fonte: item.fonte ? item.fonte.toUpperCase() : '',
    Endereço: item.endereco ? item.endereco.toUpperCase() : '',
    CPF: item.cpf || '',
    'Tipo De Contato': item.tipoDeContato ? item.tipoDeContato.toUpperCase() : '',
    'Tipo De Ação': item.tipoDeAcao ? item.tipoDeAcao.toUpperCase() : '',
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);

  const wscols = [{ wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }];
  ws['!cols'] = wscols;

  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      if (ws[cellAddress]) {
        ws[cellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };
      }
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados Filtrados');

  XLSX.writeFile(wb, 'dados_filtrados.xlsx');
};
