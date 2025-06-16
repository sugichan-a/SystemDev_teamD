import { useLocation, useNavigate } from 'react-router-dom';

function NavButton({ to, children, style = {}, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();
  // 完全一致 or startsWith でアクティブ判定
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  let baseStyle = {
    width: 300,
    height: 70,
    borderRadius: 45,
    border: '1px solid #D9D9D9',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 4,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
    ...style,
  };
  if (isActive) {
    baseStyle.background = '#fff';
    baseStyle.color = '#E57D94';
    baseStyle.border = '2px solid #E57D94';
  } else {
    baseStyle.background = '#E57D94';
    baseStyle.color = '#fff';
    baseStyle.border = '1px solid #D9D9D9';
  }
  return (
    <button onClick={() => navigate(to)} style={baseStyle} {...props}>
      {children}
    </button>
  );
}

export default NavButton;