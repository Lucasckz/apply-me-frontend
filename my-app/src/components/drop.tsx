import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Drop.module.css';
import Button from './Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type DropzoneProps = {
  onConversionDone?: () => void;
};

enum ConversionState {
  Idle = 'idle',
  Converting = 'converting',
  Done = 'done',
}

export function Basic({ onConversionDone }: DropzoneProps) {
  const [conversionState, setConversionState] = useState<ConversionState>(ConversionState.Idle);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(() => {
    setConversionState(ConversionState.Converting);
    setProgress(0);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (conversionState === ConversionState.Converting) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setConversionState(ConversionState.Done);
            if (onConversionDone) onConversionDone();
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [conversionState, onConversionDone]);

  return (
    <section className={styles.container}>
      {conversionState === ConversionState.Idle && (
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <p>Drop files here or click to select files</p>
          <div className={styles.reservedSpace} />
        </div>
      )}
      {conversionState === ConversionState.Converting && (
        <div className={styles.stateContainer}>
          <div className={styles.progressText}>
            Converting... {progress}%
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.reservedSpace} />
        </div>
      )}
      {conversionState === ConversionState.Done && (
        <div className={styles.stateContainer}>
          <div className={styles.doneMessage}>
            Conversion complete!
          </div>
          <div className={styles.buttonContainer}>
            <Button
              text="Download Resume"
              filled={true}
              type="secondary"
              href="#"
              icon={<ArrowDownTrayIcon style={{ width: 24, height: 24 }} />}
            />
          </div>
          <div className={styles.reservedSpace} />
        </div>
      )}
    </section>
  );
}