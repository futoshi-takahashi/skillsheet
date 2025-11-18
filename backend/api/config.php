<?php
declare(strict_types=1);

// ====== CORS設定（開発中だけ localhost を許可） ======
$allowedOrigins = [
    'http://localhost:5173',          // Vite dev server
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
    // 必要ならクッキーなどを使うとき
    // header('Access-Control-Allow-Credentials: true');
}

// Preflight(OPTIONS)への対応（POST JSON 用）
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

// エラー表示（本番ではOFF）
ini_set('display_errors', '1');
error_reporting(E_ALL);

// JSON返却用ヘルパー
function json_response(array $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// シンプルな入力取得（POST JSON用）
function get_json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        json_response(['error' => 'Invalid JSON'], 400);
    }
    return $decoded;
}
