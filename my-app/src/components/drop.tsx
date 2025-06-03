import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Drop.module.css';
import Button from './Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type DropzoneProps = {
  onConversionDone?: () => void;
  jobDescription?: string;
};

enum ConversionState {
  Idle = 'idle',
  Converting = 'converting',
  Done = 'done',
}

export function Basic({ onConversionDone, jobDescription }: DropzoneProps) {
  const [conversionState, setConversionState] = useState<ConversionState>(ConversionState.Idle);
  const [progress, setProgress] = useState(0);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setConversionState(ConversionState.Converting);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    if (jobDescription) {
      formData.append('job', jobDescription);
    }

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Backend response status:', response.status);
      console.log('Backend response content-type:', response.headers.get('content-type'));

      if (!response.ok) throw new Error('Upload failed');

      const blob = await response.blob();
      console.log('Blob size:', blob.size);

      // Check if the blob is actually a PDF
      if (blob.type !== 'application/pdf') {
        const text = await blob.text();
        console.error('Expected PDF but got:', text);
        alert('Backend did not return a PDF. Check backend logs.');
        setConversionState(ConversionState.Idle);
        return;
      }

      const url = window.URL.createObjectURL(blob);
      setResumeUrl(url);

      setConversionState(ConversionState.Done);
      if (onConversionDone) onConversionDone();
    } catch (e) {
      console.error('Error during upload:', e);
      if (e instanceof Response) {
        e.text().then(text => console.error('Backend error response:', text));
      }
      alert('Failed to upload and convert PDF.');
      setConversionState(ConversionState.Idle);
    }
  }, [onConversionDone, jobDescription]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'application/pdf': [] } });

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
            {resumeUrl ? (
              <>
                {console.log("PDF ready for download:", resumeUrl)}
                <a
                  href={resumeUrl}
                  download="resume.pdf"
                  className={`${styles.btn} ${styles.secondary}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>Download Resume</span>
                  <ArrowDownTrayIcon style={{ width: 24, height: 24 }} />
                </a>
              </>
            ) : (
              <span>Preparing your download...</span>
            )}
          </div>
          <div className={styles.reservedSpace} />
        </div>
      )}
    </section>
  );
}