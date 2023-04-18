var word_bank = {
    "ENG":{
        salon: "Salon",
        about: "About",
        questions: "Questions",
        terms_cond: "Terms and conditions",
        policy_privacy: "Policy privacy",
        contact: "Contact",
        career: "Career",
        games: "Games",
        race: "Race",
        roulette: "Roulette",
        blackjack: "Blackjack",
        slots: "Slots",
        craps: "Craps",
        keno: "Keno",

        error: "Error",
        all_rights_reserved: "All rights reserved",   
        no_career: "No jobs available. But feel free to send us your CV.",    

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
        subtitle: "Dare catch the rabbit",

        exit_salon: "Exit salon",
        salon_subtitle: "Welcome to the salon",
        exit_game: "Exit game",

        donation: "Donations",

        all: "All",
        other: "Other",
        title: "Title",
        location: "Location",
        requirements: "Requirements",
        responsabilities: "Responsabilities",
        no_jobs: "No jobs available yet. But feel free to send us your CV.",

        under_construction: "Under construction",

        no_data: "No info",
        no_bets: "You didn't place any bets",
    },
    "RO":{
        salon: "Salon",
        about: "Despre",
        questions: "Intrebari",
        terms_cond: "Termeni si conditii",
        policy_privacy: "Politici de confidentialitate",
        contact: "Contact",
        career: "Cariera",
        games: "Jocuri",
        race: "Curse",
        roulette: "Rouleta",
        blackjack: "Blackjack",
        slots: "Sloturi",
        craps: "Craps",
        keno: "Keno",

        error: "Eroare",
        all_rights_reserved: "Toate drepturile rezervate",      
        no_career: "Nu exista joburi disponibile. Puteti totusi sa ne trimiteti CV-ul dumneavoastra.",      

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
        subtitle: "Indrazneste sa prinzi iepurele",      

        exit_salon: "Iesi din salon",
        salon_subtitle: "Salon",
        exit_game: "Iesi din joc",

        donation: "Donatii",

        all: "Tot",
        other: "Altceva",
        title: "Titlu",
        location: "Locatie",
        requirements: "Requirements",
        responsabilities: "Responsabilities",
        no_jobs: "Nu exista job-uri disponibile. Puteti sa ne trimiteti CV-ul dumneavoastra pe mail.",

        under_construction: "In constructie",

        no_data: "Nu avem informatii disponibile",
        no_bets: "Nu ai plasat niciun pariu",
    }
}

export const words = function(lang, info){
    return word_bank[lang][info]
}