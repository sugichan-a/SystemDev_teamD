import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  // 表示名マッピング
  const displayNameMap = {
    login: 'ログイン',
    home: 'ホーム',
    orders: '受注管理',
    create: '注文書作成',
    edit: '注文書編集',
    deliveries: '納品管理',
    select: '商品選択',
    stats: '統計情報管理',
    customers: '顧客情報',
  };

  // --- 追加: 特定パスの特別表示名 ---
  const specialPathMap = {
    'deliveries/select/create': '納品書作成',
    'deliveries/select/edit': '納品書編集',
    'deliveries/select': '商品選択',
  };
  const joinedPath = paths.join('/');

  // 最初のページがloginなら「ログイン」だけ表示
  if (location.pathname === '/login' || location.pathname === '/') {
    return (
      <nav className="text-sm text-gray-700 flex items-center gap-1 mb-4">
        <span className="text-blue-600">ログイン</span>
      </nav>
    );
  }

  // パンくずリストの階層を「ログイン > ホーム > ...」に強制
  let breadcrumbItems = [];
  let accumulatedPath = '';
  // 先頭は必ずログイン
  breadcrumbItems.push(
    <span key="/login" className="flex items-center gap-1">
      <Link to="/login" className="text-blue-600 hover:underline">ログイン</Link>
      <ChevronRight className="inline w-4 h-4 text-gray-400" />
    </span>
  );
  // 2番目は必ずホーム（to="/home"に統一）
  if (paths[0] === 'home' || paths.length === 0) {
    breadcrumbItems.push(
      <span key="/home" className="text-gray-500">ホーム</span>
    );
  } else {
    breadcrumbItems.push(
      <span key="/home" className="flex items-center gap-1">
        <Link to="/home" className="text-blue-600 hover:underline">ホーム</Link>
        <ChevronRight className="inline w-4 h-4 text-gray-400" />
      </span>
    );
    // 3番目以降
    paths.forEach((segment, index) => {
      if (segment === 'home') return; // 既にホームは追加済み
      accumulatedPath += '/' + segment;
      const isLast = index === paths.length - 1;
      // --- 追加: 特別なパスの場合は特別表示名を使う ---
      let label;
      if (isLast && specialPathMap[joinedPath]) {
        label = specialPathMap[joinedPath];
      } else {
        label = displayNameMap[segment] || (segment.match(/^[0-9]+$/) ? '詳細' : segment);
      }
      breadcrumbItems.push(
        <span key={accumulatedPath} className="flex items-center gap-1">
          {isLast ? (
            <span className="text-gray-500">{label}</span>
          ) : (
            <>
              <Link to={accumulatedPath} className="text-blue-600 hover:underline">{label}</Link>
              <ChevronRight className="inline w-4 h-4 text-gray-400" />
            </>
          )}
        </span>
      );
    });
  }

  return (
    <nav className="text-sm text-gray-700 flex items-center gap-1 mb-4">
      {breadcrumbItems}
    </nav>
  );
};

export default Breadcrumbs;
