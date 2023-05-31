import { capitalizeFirstLetter } from '../utils/utils'
import { wordsEng } from './eng/words'
import { wordsRo } from './ro/words'

export const translate = function (data){
    if(!data) return
    let lang = data.lang ? data.lang : "ENG"
    let info = data.info
    let capitalize_first_fetter = data.capitalize_first_fetter ? data.capitalize_first_fetter : false
    let word = wordsEng(info)
    switch(lang){
        case "RO":
            word = wordsRo(info)
            break
        case "ENG":
        default:
            word = wordsEng(info)
            break
    }
    if(word){
        return word
    } else {
        if(capitalize_first_fetter){
            return capitalizeFirstLetter(info)
        } else {
            return info
        }
    }
}