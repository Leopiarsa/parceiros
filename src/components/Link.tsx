import { Link, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomLink = ({ property, record }) => {
  const value = record.params[property.path] || '';
  const [fileName, setFileName] = useState('');

  const extractFileNameAndExtension = (url) => {
    const match = url.match(/\/([^\/]+)\/\/[^\/]+$/);
    if (!match) return { fileName: null, extension: null };

    const fileNameWithExt = match[1];
    const parts = fileNameWithExt.split('.');
    const extension = parts.pop();
    const fileName = parts.join('.'); // Para lidar com nomes que tenham pontos

    return { fileName, extension };
  };

  useEffect(() => {
    if (record.params[property.path]) {
      const { fileName: currentFileName, extension } = extractFileNameAndExtension(record.params[property.path]);
      setFileName(`${currentFileName}.${extension}`);
    }
  }, [record]);

  return (
    fileName && (
      <Box>
        <p style={{ color: '#898A9A', fontSize: '12px', font: 'Roboto' }}>Arquivos</p>
        <Link href={value} underline="hover">
          {fileName}
        </Link>
      </Box>
    )
  );
};

export default CustomLink;
