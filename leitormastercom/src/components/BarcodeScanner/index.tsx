import React, { useEffect, useState } from 'react';
import { Html5QrcodeResult, Html5QrcodeScanner } from 'html5-qrcode';
import './styles.css';
import { postProductByCode } from '../../services/scanner';
import { useParams } from 'react-router-dom';

const QRCodeScanner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<string | null>(null);

  const onScanSuccess = async (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setResult(decodedText);
    // if (id) {
    //   try {
    //     await postProductByCode({ ID: id, valor: decodedText });
    //   } catch (error) {
    //     console.warn('Error ao salvar o produto: ', error);
    //   }
    // }
    window.close();
  };

  const onScanFailure = (error: string) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: 250,
        formatsToSupport: [0, 2, 3, 4, 5, 8, 9, 10, 13, 14, 15, 16],
      },
      false
    );
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, []);

  return (
    <div>
      <div id="reader" />
      <div id="">Resultado: {result}</div>
    </div>
  );
};

export default QRCodeScanner;
