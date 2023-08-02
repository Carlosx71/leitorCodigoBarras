import Quagga from 'quagga';

import React, { useRef, useEffect, useState } from 'react';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
        },
        decoder: {
          readers: [
            'code_128',
            'ean',
            'upc',
            'code_39',
            'codabar',
            'itf',
            'code_93',
            'qr_code',
            'pdf417',
          ],
        },
      },
      (err) => {
        if (err) {
          console.error('Erro ao iniciar o leitor de código de barras:', err);
        } else {
          console.log('Leitor de código de barras iniciado com sucesso');
          Quagga.start();
        }
      }
    );

    Quagga.onDetected((result) => {
      console.log('Código de barras detectado:', result.codeResult.code);
      setCode(result.codeResult.code);
      console.log('Vou testar aqui');
      // Faça algo com o código de barras detectado aqui, por exemplo, enviar para o servidor, exibir na tela, etc.
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <>
      <h1>Leitor de código de barras</h1>
      <video ref={videoRef} />
      <h2>{code}</h2>
    </>
  );
};

export default BarcodeScanner;
