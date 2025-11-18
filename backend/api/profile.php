<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

// 仮データ：あとで実際のスキルシート内容に寄せる
$profile = [
    'name' => 'futoshi takahashi',
    'summary' => 'React／TypeScriptを中心にWebアプリケーション開発に10年以上従事。',
    'headline' => 'フロントエンドエンジニア（React／TypeScript）',
    'location' => '沖縄県那覇市',
    'remote' => true,
    'skills' => [
        'TypeScript',
        'React',
        'Next.js',
        'Vite',
        'GraphQL',
        'Node.js',
        'C#',
        'WPF',
        'HALCON',
    ],
    'recentProject' => [
        'title' => '病院のオンライン予約システム フロントエンド',
        'period' => '2022-06 〜 2025-08',
        'techStack' => [
            'TypeScript',
            'React',
            'Next.js',
            'Vite',
            'GraphQL',
            'Cognito',
            'Heroku',
            'GitHub Actions',
        ],
    ],
];

json_response($profile);
