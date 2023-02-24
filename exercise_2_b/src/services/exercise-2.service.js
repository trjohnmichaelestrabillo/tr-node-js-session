class Exercise2Service {

    storeDetails(data) {
      let allowedCountries = ['philippines', 'india', 'new zealand', 'australia']
  
      if(!data.name) return 'Name is Required'  
      
      if(data.name.length < 3) return 'Name length must be a minimum of 3 character'  
    
      if(!data.age) return 'Age is Required'  
  
      if(Number(data.age) < 0) return 'Age must be a positive integer'  
  
      if(typeof data.birthdate === 'string' && !data.birthdate.toString()) return 'Invalid Birth Date' 
  
      if(typeof data.contact.mobile === 'string' && data.contact.mobile.length > 11) return 'Invalid Mobile Number' 
  
      if(typeof data.contact.home === 'string' && data.contact.home.length < 7) return 'Invalid Home' 
  
      if(!data.address.country) return 'Country is Required'
  
      if(!allowedCountries.includes(data.address.country.toLowerCase())) return 'Invalid Country'
      // Return message
    }
}

module.exports = Exercise2Service