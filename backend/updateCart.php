<?php

function connectToDatabase($host, $dbname, $username, $password)
{
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        throw new Exception("Database connection failed: " . $e->getMessage());
    }
}

function fetchCartItem($pdo, $user_id, $shoe_id)
{
    $stmt = $pdo->prepare("SELECT * FROM cart_items WHERE user_id = :user_id AND shoe_id = :shoe_id LIMIT 1");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->bindParam(':shoe_id', $shoe_id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function updateCartItem($pdo, $id, $quantity)
{
    $stmt = $pdo->prepare("UPDATE cart_items SET quantity = :quantity WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
    $stmt->execute();
}

function insertCartItem($pdo, $user_id, $shoe_id, $quantity)
{
    $stmt = $pdo->prepare("INSERT INTO cart_items (user_id, shoe_id, quantity) VALUES (:user_id, :shoe_id, :quantity)");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->bindParam(':shoe_id', $shoe_id, PDO::PARAM_STR);
    $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
    $stmt->execute();
}

try {
    $host = 'localhost';
    $dbname = 'shoescart';
    $username = 'root';
    $password = 'S@ng@016';

    $pdo = connectToDatabase($host, $dbname, $username, $password);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user_id = $_POST['user_id'];
        $shoe_id = $_POST['shoe_id'];
        $quantity = $_POST['quantity'];

        $cartItem = fetchCartItem($pdo, $user_id, $shoe_id);

        if (!empty($cartItem)) {
            updateCartItem($pdo, $cartItem[0]['id'], $quantity);
        } else {
            insertCartItem($pdo, $user_id, $shoe_id, $quantity);
        }

        header("HTTP/1.1 200 OK");
        echo "success";
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo "error: " . $e->getMessage();
}
?>
