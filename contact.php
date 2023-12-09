<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recoge los datos del formulario
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Procesa y envía el correo electrónico (debes configurar esto según tus necesidades)
    $to = "ggcode04@gmail.com";
    $subject = "Mensaje de contacto desde el sitio web";
    $message_body = "
        Nombre: $firstname\n
        Segundo Nombre: $lastname\n
        Número Telefónico: $phone\n
        Correo Electrónico: $email\n
        Titulo: $subject\n
        Mensaje:\n$message";

    if (mail($to, $subject, $message_body)) {
        echo "The form was submitted successfully!";
    } else {
        echo "There was a problem submitting the form. Please try again later.";
    }
} else {
    echo "Unauthorized access";
}
?>