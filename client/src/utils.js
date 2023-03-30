import product_01 from './img/products/product-1.jpg'
import product_02 from './img/products/product-2.jpg'
import product_03 from './img/products/product-3.jpg'
import product_04 from './img/products/product-4.jpg'
import product_05 from './img/products/product-5.jpg'
import product_06 from './img/products/product-6.jpg'
import countries from './json/countries.json';

const axios = require('axios')

export const isEmpty = function (element){
  let empty = true
  if(typeof element !== "undefined" && element !== 'null' && element !== null && element !== ''){
    empty = false
  }
  return empty
}

export const formatDate = function(date){	
  let d = new Date(date)
  let dateString = new Date(d.getTime() - (d.getTimezoneOffset() * 60000 )).toISOString().split(".")[0].replace(/T/g, " ").replace(/-/g, "/")
  return dateString
}

export const setCookie = function (cname, cvalue, hours=12){
  let d = new Date()
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000))
  let expires = "expires=" + d.toGMTString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
export const getCookie = function (cname){
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export const sortList = function(list=[], sort_by="", asc=true) {
  if(list && list.length>0){
    if(sort_by === ""){
      let done = false
      if(asc){
        while (!done) {
          done = true
          for (let i = 1; i < list.length; i += 1) {
              if (list[i - 1] > list[i]){
                  done = false
                  let tmp = list[i - 1]
                  list[i - 1] = list[i]
                  list[i] = tmp
              }
          }
        }
      } else {
        while (!done) {
          done = true
          for (let i = 1; i < list.length; i += 1) {
              if (list[i - 1] < list[i]){
                  done = false
                  let tmp = list[i - 1]
                  list[i - 1] = list[i]
                  list[i] = tmp
              }
          }
        }
      }
    } else {
      let done = false
      if(asc){
        while (!done) {
          done = true
          for (let i = 1; i < list.length; i += 1) {
              if (list[i - 1][sort_by] > list[i][sort_by]){
                  done = false
                  let tmp = list[i - 1]
                  list[i - 1] = list[i]
                  list[i] = tmp
              }
          }
        }
      } else {
        while (!done) {
          done = true
          for (let i = 1; i < list.length; i += 1) {
              if (list[i - 1][sort_by] < list[i][sort_by]){
                  done = false
                  let tmp = list[i - 1]
                  list[i - 1] = list[i]
                  list[i] = tmp
              }
          }
        }
      }
    }
  }
  return list
}

export const getWindowDimensions = function() {
  const { innerWidth: width, innerHeight: height } = window
  return {width, height}
}

export const getStarArray = function(stars){
  let star_array = []
  for(let x=1; x<6; x++){
    if(parseInt(x) <= stars){
      star_array.push("fa-star")
    } else {
      if(stars-parseInt(x) === -0.5){
        star_array.push("fa-star-half-o")
      } else {
        star_array.push("fa-star-o")
      }
    }
  }
  return star_array
}

export const getProductImages = function(){
  return [
    {img: product_01, id:1},
    {img: product_02, id:2},
    {img: product_03, id:3},
    {img: product_04, id:4},
    {img: product_05, id:5},
    {img: product_06, id:6},
  ]
}

export const checkoutData = function(){	
  const monthOptions = [
    {value: 0, text: "January"},
    {value: 1, text: "February"},
    {value: 2, text: "March"},
    {value: 3, text: "April"},
    {value: 4, text: "May"},
    {value: 5, text: "June"},
    {value: 6, text: "July"},
    {value: 7, text: "August"},
    {value: 8, text: "September"},
    {value: 9, text: "October"},
    {value: 10, text: "November"},
    {value: 11, text: "December"},
  ]
  let date = new Date().getFullYear()-1;
  const yearOptions = Array.from({length: 10}, (_, i) => i + date)
  let countries_list = Object.keys(countries.countries)

  return {countries_list, countries: countries.countries, monthOptions, yearOptions}
}

export const getCurrency = function(payload){    
  return new Promise(function(resolve, reject){
    let key = 'KCrSj0HAWJmhRHa5afGZS2AjdUBcCgXlyyILkCti'
    let base_currency = 'RON'
    let currencies = 'EUR%2CUSD%2CRON'
		let url = 'https://api.freecurrencyapi.com/v1/latest?apikey=' + key + '&currencies=' + currencies + '&base_currency=' + base_currency
		axios.get(url).then(response => {
			resolve(response)	
		}).catch(error => {
			console.log('getCurrency_error--> ', error)
			resolve(false)
		})
	})
}

export const calculatePriceCurrency = function(price, currency, rates){ 
  rates = {
    'EUR':0.203522,
    'RON':1,
    'USD':0.215415,
  }   
  let rate = 1
  if(rates && rates[currency]){
    rate = rates[currency]
  }
  let new_price = price * rate
  return new_price.toFixed(2)
}