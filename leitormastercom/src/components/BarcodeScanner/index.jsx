import Quagga from 'quagga';

import React, { useRef, useEffect } from 'react';

const BarcodeScanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
        },
        decoder: {
          readers: ['ean_reader'], // Pode adicionar outros tipos de código de barras, por exemplo: ['ean_reader', 'code_128_reader']
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
    </>
  );
};

export default BarcodeScanner;
