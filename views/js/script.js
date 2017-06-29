function getSearchBillz(){
    
    var spinnerDiv = document.getElementById("spinner")
    spinnerDiv.innerHTML =  
     `  
        <div class="container" id="spinner">
        	<div class="row">
        		<div id="loader">
            		<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="dot"></div>
        			<div class="lading"></div>
        		</div>
        	</div>
        </div>
      `
      
    var str = document.getElementById("search").value;
    // var searchTerm = `q=${str.replace(" ","+")}&`;
    var endpoint =`https://api.propublica.org/congress/v1/bills/subjects/${str}.json`
    var apiKey = 'J9COAqTYDG8ja89ZMPzFT3i9oKyCyF089Z94KU1R'
    
    // var url = endpoint + str + apiKey
    
    fetch(endpoint, {
        headers: {
            'X-API-Key':  apiKey
        }
    })
    
    .then(data => {return data.json()})
    .then(json => {
        
        console.log(json)
        
        var finalHTML = ''
        
        json.results.forEach(function(item){
           
            
            // var billLink
            
            // fetch(item.bill_uri, {
            //     headers: {
            //         'X-API-Key':  apiKey
            //     }
            // })
            // .then(data => {return data.json()})
            // .then(json=>{console.log(json)})
            // .catch(err => console.log(err))

            // sessionStorage.setItem('label', item.bill_uri)
            
            
            finalHTML +=   `
                <div class="card card-outline-info mb-3 text-center">
                  
                  <div class="card-block">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <form action="/" method="post">
                        <button type="submit" class="btn btn-primary">Go somewhere</button>
                    </form>
                  </div>
                 
                </div>
                <br></br>`
        })
        
        var resultDiv = document.getElementById('result')
        resultDiv.innerHTML = finalHTML
        
        var spinnerDiv = document.getElementById('spinner')
        spinnerDiv.innerHTML = ''
    })
    
    .catch(err => console.log(err))
}

// function partyPicker (str){
//     if(str === 'R'){
//         var lol = document.getElementById("party");
//         lol.setAttribute("value", "PARTY: REPUBLICAN")
//     }
//     else{
//         var lol = document.getElementById("party");
//         lol.setAttribute("value", "PARTY: DEMOCRAT")
//     }
// }