var word_bank = {
    "ENG":{
        title: "Tutorial",
        subtitle: "This is a simple tutorial with a NodeJS server and a ReactJS frontend",
        description: "Here you can find: Socket.io, saga-middleware, redux, and other things",
        error: "Error",
        all_rights_reserved: "All rights reserved",
        sign_in: "Sign in",
        sign_up: "Sign up",
        signin_error: "The user doesn't exist",
        signup_error: "The user already exists",
        email: "Email",
        user: "User",
        password: "Password",
        cookies_modal_title: "Cookies Notification",
        cookies_modal_text: "In order to offer you the most relevant information and for optimal system performance, we use cookies that collect information from your game activity.",
        exit: "Exit",
    },
    "RO":{
        title: "Tutorial",
        subtitle: "Acesta este un tutorial simplu cu un server NodeJS si ReactJS pentru frontend",
        description: "Aici vei gasi: Socket.io, saga-middleware, redux si alte lucruri",
        error: "Eroare",
        all_rights_reserved: "Toate drepturile rezervate",
        sign_in: "Logare",
        sign_up: "Registrare",
        signin_error: "User-ul nu exista",
        signup_error: "User-ul deja exista",
        email: "Email",
        user: "Utilizator",
        password: "Parola",
        cookies_modal_title: "Notificari de cookies",
        cookies_modal_text: "Pentru a va oferi cele mai relevante informatii si pentru o performanta optima a sistemul, noi folosim cookies pentru a colecta informatii din activitatea dumneavoatra.",
        exit: "Iesi",
    }
}

export const words = function(lang, info){
    return word_bank[lang][info]
}