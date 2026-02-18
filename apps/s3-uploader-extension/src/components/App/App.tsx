import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Note, Paragraph } from '@contentful/f36-components';
import {
  CloudArrowUpIcon,
  FileAudioIcon,
  TrashSimpleIcon,
} from '@contentful/f36-icons';
import { FieldAppSDK } from '@contentful/app-sdk';
import ProgressBar from '../ProgressBar';

import './app.css';

interface AppProps {
  sdk: FieldAppSDK;
}

type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; filename: string; progress: number }
  | { status: 'error'; message: string };

function extractFilename(url: string): string {
  try {
    const pathname = new URL(url).pathname;

    return decodeURIComponent(pathname.split('/').pop() || url);
  } catch {
    return url;
  }
}

const App = ({ sdk }: AppProps) => {
  const [url, setUrl] = useState<string>(sdk.field.getValue() ?? '');
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk]);

  useEffect(() => {
    const detach = sdk.field.onValueChanged((value: string | undefined) => {
      setUrl(value ?? '');
    });

    return () => detach();
  }, [sdk]);

  const presignUrl = sdk.parameters.installation.s3PresignUrl as string;
  const apiKey = sdk.parameters.installation.s3UploaderKey as string;

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.type !== 'audio/mpeg') {
        setUploadState({
          status: 'error',
          message: 'Only .mp3 files (audio/mpeg) are supported.',
        });

        return;
      }

      setUploadState({
        status: 'uploading',
        filename: file.name,
        progress: 0,
      });

      try {
        const presignRes = await fetch(presignUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
          }),
        });

        if (!presignRes.ok) {
          const err = await presignRes.json().catch(() => ({}));
          throw new Error(
            (err as { error?: string }).error ||
              `Presign failed: ${presignRes.status}`,
          );
        }

        const { uploadUrl, fileUrl } = (await presignRes.json()) as {
          uploadUrl: string;
          fileUrl: string;
        };

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhrRef.current = xhr;

          xhr.upload.addEventListener('progress', (evt) => {
            if (evt.lengthComputable) {
              const progress = Math.round((evt.loaded / evt.total) * 100);
              setUploadState((prev) =>
                prev.status === 'uploading' ? { ...prev, progress } : prev,
              );
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed: ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () =>
            reject(new Error('Upload failed')),
          );
          xhr.addEventListener('abort', () =>
            reject(new Error('Upload cancelled')),
          );

          xhr.open('PUT', uploadUrl);
          xhr.setRequestHeader('Content-Type', 'audio/mpeg');
          xhr.send(file);
        });

        xhrRef.current = null;
        await sdk.field.setValue(fileUrl);
        setUploadState({ status: 'idle' });
      } catch (err) {
        xhrRef.current = null;
        const message = (err as Error).message;

        if (message !== 'Upload cancelled') {
          setUploadState({ status: 'error', message });
        }
      }

      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [presignUrl, apiKey, sdk.field],
  );

  const handleCancel = useCallback(() => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }

    setUploadState({ status: 'idle' });
  }, []);

  const handleRemove = useCallback(async () => {
    await sdk.field.removeValue();
    setUploadState({ status: 'idle' });
  }, [sdk.field]);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="container">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/mpeg,.mp3"
        onChange={handleFileSelect}
        className="hidden-input"
      />

      {uploadState.status === 'error' && (
        <Note variant="negative">{uploadState.message}</Note>
      )}

      {uploadState.status === 'uploading' && (
        <div className="upload-row">
          <div className="upload-info">
            <FileAudioIcon className="file-icon" />
            <Paragraph className="filename" marginBottom="none">
              {uploadState.filename}
            </Paragraph>
            <Button variant="negative" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <ProgressBar value={uploadState.progress} />
        </div>
      )}

      {uploadState.status !== 'uploading' && !url && (
        <Button
          startIcon={<CloudArrowUpIcon />}
          variant="secondary"
          size="small"
          onClick={openFilePicker}
        >
          Upload audio file
        </Button>
      )}

      {uploadState.status !== 'uploading' && url && (
        <>
          <div className="file-display">
            <FileAudioIcon className="file-icon" />
            <Paragraph className="filename" marginBottom="none">
              {extractFilename(url)}
            </Paragraph>
            <div className="actions">
              <Button
                startIcon={<CloudArrowUpIcon />}
                variant="secondary"
                size="small"
                onClick={openFilePicker}
              >
                Replace
              </Button>
              <Button
                startIcon={<TrashSimpleIcon />}
                variant="negative"
                size="small"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
          <audio controls src={url} className="audio-player" />
        </>
      )}
    </div>
  );
};

export default App;
