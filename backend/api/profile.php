<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

$profileJsonPath = __DIR__ . '/profile.json';


try {
    if (!file_exists($profileJsonPath)) {
        throw new RuntimeException('profile.json not found.');
    }

    $json = file_get_contents($profileJsonPath);
    if ($json === false) {
        throw new RuntimeException('Failed to read profile.json.');
    }

    // JSONとしてパース（連想配列にしたいのでtrue）
    $profile = json_decode($json, true, 512, JSON_THROW_ON_ERROR);

    // 正常系レスポンス
    json_response($profile);
} catch (Throwable $e) {
    // 簡易エラーレスポンス（必要ならフォーマット変更OK）
    http_response_code(500);
    json_response([
        'error' => 'Failed to load profile.',
        'message' => $e->getMessage(),
    ]);
}