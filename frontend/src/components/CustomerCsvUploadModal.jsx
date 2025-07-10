import React, { useRef, useState } from 'react';

const CustomerCsvUploadModal = ({ visible, onClose, onUpload }) => {
  const fileInputRef = useRef();
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setError('CSVファイルを選択してください');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      onUpload && onUpload(text);
      setError('');
      onClose && onClose();
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // ドラッグ&ドロップ
  const [dragActive, setDragActive] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div
        style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #e57d9420', textAlign: 'center', border: dragActive ? '2px solid #7ec6ee' : '2px solid transparent', transition: 'border 0.2s' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h2 style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 18 }}>顧客CSVアップロード</h2>
        <div
          style={{
            border: '2px dashed #e57d94', borderRadius: 10, padding: 24, marginBottom: 16,
            background: '#f9f9fa', cursor: 'pointer', color: '#e57d94', fontWeight: 500,
          }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          ここにCSVファイルをドラッグ＆ドロップ、またはクリックして選択
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <div style={{ marginTop: 16 }}>
          <button onClick={onClose} style={{ background: '#e57d94', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', fontSize: 15 }}>閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCsvUploadModal;
