import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  // 表示名マッピング
  const displayNameMap = {
    orders: '受注管理',
    create: '注文書作成',
    edit: '注文書編集',
    deliveries: '納品管理',
    stats: '統計情報管理',
    customers: '顧客情報',
  };

  const breadcrumbItems = paths.map((segment, index) => {
    const isLast = index === paths.length - 1;
    const pathSlice = paths.slice(0, index + 1);
    const routePath = '/' + pathSlice.join('/');

    // ID部分は除外（edit/:id など）
    const label = displayNameMap[segment] || (segment.match(/^\d+$/) ? '詳細' : segment);

    return (
      <span key={routePath} className="flex items-center gap-1">
        {!isLast ? (
          <>
            <Link to={routePath} className="text-blue-600 hover:underline">{label}</Link>
            <ChevronRight className="inline w-4 h-4 text-gray-400" />
          </>
        ) : (
          <span className="text-gray-500">{label}</span>
        )}
      </span>
    );
  });

  return (
    <nav className="text-sm text-gray-700 flex items-center gap-1 mb-4">
      <Link to="/" className="text-blue-600 hover:underline">ホーム</Link>
      {paths.length > 0 && <ChevronRight className="inline w-4 h-4 text-gray-400" />}
      {breadcrumbItems}
    </nav>
  );
};

export default Breadcrumbs;
