<?php
declare(strict_types=1);

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
