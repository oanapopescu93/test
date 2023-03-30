var word_bank = {
    "ENG":{
        title: "Tutorial",
        subtitle: "This is a simple tutorial with a NodeJS server and a ReactJS frontend",
        description: "Here you can find: Socket.io, saga-middleware, redux, and other things",
        language_chosen: "Language chosen",
        page_chosen: "Page chosen",
        error: "Error",
        all_rights_reserved: "All rights reserved",
    },
    "RO":{
        title: "Tutorial",
        subtitle: "Acesta este un tutorial simplu cu un server NodeJS si ReactJS pentru frontend",
        description: "Aici vei gasi: Socket.io, saga-middleware, redux si alte lucruri",
        language_chosen: "Limba aleasa",
        page_chosen: "Pagina aleasa",
        error: "Eroare",
        all_rights_reserved: "Toate drepturile rezervate",
    }
}

export const words = function(lang, info){
    return word_bank[lang][info]
}