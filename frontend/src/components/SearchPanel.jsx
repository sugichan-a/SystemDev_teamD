import React from 'react';

/**
 * 共通の検索条件パネル。幅・高さ・角丸・枠線・背景色・中央寄せをデフォルトで適用。
 * 子要素は自由に配置可能。styleで上書きも可。
 */
const SearchPanel = ({ children, style }) => {
  return (
    <div
      style={{
        width: 1100,
        height: 400,
        background: '#fff',
        border: '1px solid #D9D9D9',
        borderRadius: 15,
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SearchPanel;
