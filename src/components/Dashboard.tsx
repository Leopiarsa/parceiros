import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Oportunidades } from '../entities/oportunidade.entity.js';
import { Parceiros } from '../entities/parceiro.entity.js';
import { handleExportExcel } from '../shared/excel.js';
import MultiCheckbox from './MultiCheckbox.js';
import { Roles } from '../enums/roles.enum.js';
import CustomSelect from './CustomSelect.js';

interface availableValues {
  value: number | string;
  label: string;
}

const AdminDashboard = () => {
  const [filters, setFilters] = useState({ parceiroID: 0, initDate: '', endDate: '' });
  const [oportunidades, setOportunidades] = useState<Oportunidades[]>([]);
  const [parceiros, setParceiros] = useState<availableValues[]>([]);
  const [isFetching, setIsFetching] = useState({ parceiros: false, oportunidades: false });
  const [selectedPartner, setSelectedParner] = useState<availableValues>();

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value) ? value.format('MM/DD/YYYY') : '', // Converte para string no formato MM/DD/YYYY
    }));
  };

  const exportToExcel = () => {
    const table = oportunidades.map((oportunidade) => ({
      nome: oportunidade.nome,
      fonte: oportunidade.fonte,
      endereco: oportunidade.endereco,
      cpf: oportunidade.cpf,
      tipoDeContato: oportunidade.tipoDeContato,
      tipoDeAcao: oportunidade.tipoDeAcao,
    }));

    handleExportExcel(table);
  };

  const fetchParceiros = async () => {
    setIsFetching((prevState) => ({ ...prevState, parceiros: true }));
    try {
      const response = await fetch(`${process.env.DOMAIN}/admin/api/resources/Parceiros/actions/list`);
      const data = await response.json();
      if (data.records) {
        const parceiros: Parceiros[] = data.records.map((records) => records.params);
        const values: availableValues[] = parceiros.map((parceiro) => ({
          value: parceiro.userID,
          label: parceiro.nome,
        }));
        setParceiros(values);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching((prevState) => ({ ...prevState, parceiros: false }));
    }
  };

  const fetchOportunidadesByParceiro = async () => {
    setIsFetching((prevState) => ({ ...prevState, oportunidades: true }));
    try {
      const response = await fetch(`${process.env.DOMAIN}/oportunidades/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar oportunidades: ${response.status}`);
      }

      const data = await response.json();
      console.log('Oportunidades:', data);
      setOportunidades(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setIsFetching((prevState) => ({ ...prevState, oportunidades: false }));
    }
  };

  const handleSelectedParceiro = (event: SelectChangeEvent) => {
    const id = event.target.value;
    const parceiro = parceiros.find((parceiros) => parceiros.value === id);

    setSelectedParner(parceiro);
    setFilters({ ...filters, parceiroID: Number(id) });
  };

  useEffect(() => {
    fetchParceiros();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'start', alignItems: 'center' }}>
          <FormControl variant="outlined" sx={{ width: { xs: '80%', sm: '50%', md: '50%' } }}>
            <InputLabel>Parceiro</InputLabel>
            <Select value={selectedPartner?.value || ''} onChange={handleSelectedParceiro} label="Selecione o Parceiro">
              {parceiros.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data início"
              views={['year', 'month', 'day']}
              sx={{ width: '30%' }}
              onChange={(e) => handleFilterChange('initDate', e)}
            />
            <DatePicker
              label="Data Fim"
              sx={{ width: '30%' }}
              views={['year', 'month', 'day']}
              onChange={(e) => handleFilterChange('endDate', e)}
            />
          </LocalizationProvider>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            disabled={filters.endDate && filters.initDate && filters.parceiroID ? false : true}
            onClick={() => fetchOportunidadesByParceiro()}
            style={{ height: '56px', margin: 'auto' }}
          >
            {isFetching.oportunidades ? 'Buscando ...' : 'Filtrar'}
          </Button>
          <Button
            variant="outlined"
            color="success"
            size="small"
            disabled={oportunidades.length > 0 ? false : true}
            onClick={() => exportToExcel()}
            style={{ height: '56px', margin: 'auto' }}
          >
            Exportar Planilha
          </Button>
        </Box>
      </Box>

      <div style={{ padding: '16px', width: '100%', backgroundColor: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome </TableCell>
              <TableCell align="center">Endereco</TableCell>
              <TableCell align="center">Cpf</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oportunidades.map((item) => (
              <TableRow key={item.id} onClick={() => console.log('ITEM ID: ', item.id)}>
                <TableCell align="center">{item.nome}</TableCell>
                <TableCell align="center">{item.endereco}</TableCell>
                <TableCell align="center">{item.cpf}</TableCell>
                <TableCell align="center">{item.telefone}</TableCell>
                <TableCell align="center">{new Date(item.createdAt).toISOString().split('T')[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminDashboard;
