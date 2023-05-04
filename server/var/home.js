module.exports = Object.freeze({
    PRODUCTS: [
        {table_id: '001', table_name: "roulette", table_type: "european"},
        {table_id: '002', table_name: "roulette", table_type: "american"},
        {table_id: '003', table_name: "roulette", table_type: "european"},
        {table_id: '004', table_name: "roulette", table_type: "american"},
        {table_id: '005', table_name: "blackjack"},
        {table_id: '006', table_name: "blackjack"},
        {table_id: '007', table_name: "blackjack"},
        {table_id: '008', table_name: "slots", table_type: "type1"},
        {table_id: '009', table_name: "slots", table_type: "type2"},
        {table_id: '010', table_name: "slots", table_type: "type1"},
        {table_id: '011', table_name: "slots", table_type: "type2"},
        {table_id: '012', table_name: "slots", table_type: "type1"},
        {table_id: '013', table_name: "craps"},
        {table_id: '014', table_name: "craps"},
        {table_id: '015', table_name: "craps"},
        {table_id: '016', table_name: "craps"},
        {table_id: '017', table_name: "craps"},
    ],
    MARKET: [        
        {id: "garlic", name_eng: "garlic", name_ro: "usturoi", price:0.1},
        {id: "onion", name_eng: "onion", name_ro: "ceapa", price:0.2},
        {id: "radish", name_eng: "radish", name_ro: "ridiche", price:0.5},
        {id: "carrot", name_eng: "carrot", name_ro: "morcov", price:1},
        {id: "turnip", name_eng: "turnip", name_ro: "nap", price:2},
        {id: "potato", name_eng: "potato", name_ro: "cartof", price:5},
        {id: "cabbage", name_eng: "cabbage", name_ro: "varza", price:10},
    ],
    CURRENCIES: [
        {id: "garlic", name_eng: "garlic", name_ro: "usturoi", price:0.1},
        {id: "onion", name_eng: "onion", name_ro: "ceapa", price:0.2},
        {id: "radish", name_eng: "radish", name_ro: "ridiche", price:0.5},
        {id: "carrot", name_eng: "carrot", name_ro: "morcov", price:1},
        {id: "turnip", name_eng: "turnip", name_ro: "nap", price:2},
        {id: "potato", name_eng: "potato", name_ro: "cartof", price:5},
        {id: "cabbage", name_eng: "cabbage", name_ro: "varza", price:10},
    ],
    PROFILES: [        
        {id: 1, name_eng: "weasel", name_ro: "nevastuica", free: true},
        {id: 2, name_eng: "fox", name_ro: "vulpe", free: false},
        {id: 3, name_eng: "wolf", name_ro: "lup", free: false},
        {id: 4, name_eng: "lynx", name_ro: "ras", free: false},
        {id: 5, name_eng: "ferret", name_ro: "dihor", free: true},
        {id: 6, name_eng: "martin", name_ro: "jder", free: true},
    ],
    DONATIONS: [        
        {type: "crypto", title: "Bitcoin", text: "-", link: "bitcoin:-"},
        {type: "crypto", title: "Ethereum", text: "-"},
        {type: "crypto", title: "Litecoin", text: "-"},
        {type: "crypto", title: "Bitcoin Cash", text: "-"},
        {type: "crypto", title: "Dogecoin", text: "-"},
        {type: "paypal", title: "Paypal", link: "https://paypal.me/oanapopescu93?country.x=RO&locale.x=en_US"},
    ],
    SLOT_PRIZES: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    RACE_RABBITS: [        
        {id: 1, participating: false, name: "Bunny_01", breed: "American Fuzzy Lop", img: "/img/rabbit_list/american_fuzzy_lop.png"},
        {id: 2, participating: false, name: "Bunny_02", breed: "American", img: "/img/rabbit_list/american.png"},
        {id: 3, participating: false, name: "Bunny_03", breed: "Belgian Hare", img: "/img/rabbit_list/belgian_hare.png"},
        {id: 4, participating: false, name: "Bunny_04", breed: "Dutch", img: "/img/rabbit_list/dutch.png"},
        {id: 5, participating: false, name: "Bunny_05", breed: "Dwarf Hotot", img: "/img/rabbit_list/dwarf_hotot.png"},
        {id: 6, participating: false, name: "Bunny_06", breed: "English angora", img: "/img/rabbit_list/english_angora.png"},
        {id: 7, participating: false, name: "Bunny_07", breed: "English Lop", img: "/img/rabbit_list/english_lop.png"},
        {id: 8, participating: false, name: "Bunny_08", breed: "English Spot", img: "/img/rabbit_list/english_spot.png"},
        {id: 9, participating: false, name: "Bunny_09", breed: "Flemish giant", img: "/img/rabbit_list/flemish_giant.png"},
        {id: 10, participating: false, name: "Bunny_10", breed: "Florida White", img: "/img/rabbit_list/florida_white.png"},
        {id: 11, participating: false, name: "Bunny_11", breed: "French Angora", img: "/img/rabbit_list/french_angora.png"},
        {id: 12, participating: false, name: "Bunny_12", breed: "Harlequin", img: "/img/rabbit_list/harlequin.png"},
        {id: 13, participating: false, name: "Bunny_13", breed: "Havana", img: "/img/rabbit_list/havana.png"},
        {id: 14, participating: false, name: "Bunny_14", breed: "Himalayan", img: "/img/rabbit_list/himalayan.png"},
        {id: 15, participating: false, name: "Bunny_15", breed: "Holland Lop", img: "/img/rabbit_list/holland_lop.png"},
        {id: 16, participating: false, name: "Bunny_16", breed: "Jersey Wooly", img: "/img/rabbit_list/jersey_wooly.png"},
        {id: 17, participating: false, name: "Bunny_17", breed: "Lionhead", img: "/img/rabbit_list/lionhead.png"},
        {id: 18, participating: false, name: "Bunny_18", breed: "Mini Lop", img: "/img/rabbit_list/mini_lop.png"},
        {id: 19, participating: false, name: "Bunny_19", breed: "Mini Rex", img: "/img/rabbit_list/mini_rex.png"},
        {id: 20, participating: false, name: "Bunny_20", breed: "Neatherland", img: "/img/rabbit_list/neatherland.png"},
    ],
    CONTACT: [
        {country: "Romania", city: "Bucharest", email: "oanapopescu93@gmail.com", phone: "+40 711 111 111"},
        {country: "USA", city: "New York", email: "oanapopescu93@gmail.com", phone: "+1 111-111-1111"},
        {country: "Germany", city: "Berlin", email: "oanapopescu93@gmail.com", phone: "+49 111 11111111"}
    ]
})