import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Drop.module.css';
import Button from './Button';
import { ServerStackIcon } from '@heroicons/react/24/outline';

export function Basic(props) {
  const [conversionState, setConversionState] = useState<'idle' | 'converting' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setConversionState('converting');
      setProgress(0);
    }
  });

  // Simulate conversion progress
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (conversionState === 'converting') {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setConversionState('done');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [conversionState]);

  return (
    <section className={styles.container}>
      {conversionState === 'idle' && (
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <p>Drop files here or click to select files</p>
          <div className={styles.reservedSpace} />
        </div>
      )}
      {conversionState === 'converting' && (
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
      {conversionState === 'done' && (
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
              icon={<ServerStackIcon style={{ width: 24, height: 24 }} />}
            />
          </div>
          <div className={styles.reservedSpace} />
        </div>
      )}
    </section>
  );
}