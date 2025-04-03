import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Link } from '@mui/material';
import { Buffer } from 'buffer';
import CustomLink from './Link.js';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ record, onChange, property }) {
  const [fileUrl, setFileUrl] = useState(record?.params.arquivo || '');
  const [isFething, setIsFetching] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');

  const extractFileNameAndExtension = (url) => {
    const match = url.match(/\/([^\/]+)\/\/[^\/]+$/);
    if (!match) return { fileName: null, extension: null };

    const fileNameWithExt = match[1];
    const parts = fileNameWithExt.split('.');
    const extension = parts.pop();
    const fileName = parts.join('.'); // Para lidar com nomes que tenham pontos

    return { fileName, extension };
  };

  const handleFileChange = async (event) => {
    debugger;
    const file = event.target.files[0];
    if (!file) return;

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString('base64');
    const formData = {
      fileName: file.name,
      mimeType: file.type,
      fileBuffer: base64File,
    };

    setFileName(`${formData.fileName}.${formData.mimeType}`);

    onChange(property.name, formData);
  };

  useEffect(() => {
    if (fileUrl) {
      const { fileName: currentFileName, extension } = extractFileNameAndExtension(fileUrl);
      setFileName(`${currentFileName}.${extension}`);
    }
  }, [fileUrl]);

  return (
    <div
      style={{
        width: '100%',
        display: 'block',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Button component="label" variant="contained" style={{ marginRight: '10rem' }}>
        Anexar Arquivo
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
      </Button>

      {(fileUrl || fileName) && (
        <Link href={fileUrl} underline="hover" download={fileName ?? 'arquivo'}>
          {fileName ?? 'Baixar Arquivo'}
        </Link>
      )}
    </div>
  );
}
