<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$host = 'localhost';
$db = 'my_database';
$user = 'nuit';
$pass = 'your_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Retrieve the question ID from the request
$questionId = isset($_GET['questionId']) ? $_GET['questionId'] : null;
// For POST request, use $questionId = isset($_POST['questionId']) ? $_POST['questionId'] : null;


if (!$questionId) {
    echo json_encode(['error' => 'No question ID provided']);
    exit;
}

$questionSql = 'SELECT id, text FROM questions WHERE id = :questionId';
$responseSql = 'SELECT id, text, pts, image_link FROM answers WHERE question_id = :questionId';



// Prepare and execute question query
$questionStmt = $pdo->prepare($questionSql);
$questionStmt->execute(['questionId' => $questionId]);
$question = $questionStmt->fetch();


$result = ['question' => null, 'reponses' => []];

if ($question) {
    $result['question'] = [
        'texteQuestion' => $question['text'],
        'id' => $question['id']
    ];

    // Prepare and execute responses query
    $responseStmt = $pdo->prepare($responseSql);
    $responseStmt->execute(['questionId' => $question['id']]);
    while ($response = $responseStmt->fetch()) {
        $result['reponses'][] = [
            'idReponse' => $response['id'],
            'txt' => $response['text'],
            'image_link' => $response['image_link'],
            'pts' => $response['pts']
        ];
    }
}

echo json_encode($result);
?>