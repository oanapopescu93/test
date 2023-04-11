var word_bank = {
    "ENG":{
        salon: "Salon",
        about: "About",
        questions: "Questions",
        terms_cond: "Terms and conditions",
        policy_privacy: "Policy privacy",
        contact: "Contact",

        error: "Error",
        all_rights_reserved: "All rights reserved",        

        cookies_modal_title: "Cookies Notification",
        cookies_modal_text: "In order to offer you the most relevant information and for optimal system performance, we use cookies that collect information from your game activity.",

        sign_in: "Sign in",
        sign_up: "Sign up",
        signin_error: "The user doesn't exist",
        signup_error: "The user already exists",
        email: "Email",
        user: "User",
        password: "Password",
        sign_in_email_empty: "Email is empty",
        sign_in_user_empty: "User is empty",
        sign_in_pass_empty: "Password is empty",
        sign_in_email_error: "Email is incorrect",
        sign_in_pass_error: "Password is incorrect",
        signin_forgot_password: "I forgot password",

        exit_salon: "Exit salon",
        salon_title: "Salon",
        salon_subtitle: "Welcome to the salon"
    },
    "RO":{
        salon: "Salon",
        about: "Despre",
        questions: "Intrebari",
        terms_cond: "Termeni si conditii",
        policy_privacy: "Politici de confidentialitate",
        contact: "Contact",

        error: "Eroare",
        all_rights_reserved: "Toate drepturile rezervate",        

        cookies_modal_title: "Notificari de cookies",
        cookies_modal_text: "Pentru a va oferi cele mai relevante informatii si pentru o performanta optima a sistemul, noi folosim cookies pentru a colecta informatii din activitatea dumneavoatra.",
        
        sign_in: "Logare",
        sign_up: "Registrare",
        signin_error: "User-ul nu exista",
        signup_error: "User-ul deja exista",
        email: "Email",
        user: "Utilizator",
        password: "Parola",
        sign_in_email_empty: "Email-ul este gol",
        sign_in_user_empty: "Nume utilizator este gol",
        sign_in_pass_empty: "Parola este goala",
        sign_in_email_error: "Email-ul este incorect",
        sign_in_pass_error: "Parola este incorecta",
        signin_forgot_password: "Am uitat parola",        

        exit_salon: "Iesi din salon",
        salon_title: "Salon",
        salon_subtitle: "Welcome to the salon"
    }
}

export const words = function(lang, info){
    return word_bank[lang][info]
}