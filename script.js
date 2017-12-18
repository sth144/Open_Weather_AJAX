// API key from Open Weather Map on this page. Ordinarily API keys should not be commited to repository, but there
// is no security concern in this case

var apiKey = "a48b451290aafe0ddebbe57d63af07ef";

document.addEventListener("DOMContentLoaded", bindButtons);


// bindButtons() called when DOM content is loaded

function bindButtons() {
    
    // add functionality to city submission button
    
    document.getElementById("citySubmit").addEventListener("click", function(event) {
        
        // open a new XMLHttpRequest to the Open Weather Map API
        
        var request = new XMLHttpRequest();
        request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" +           document.getElementById("cityName").value + "&appid=" + apiKey +    "&units=metric", true);
        
        // add functionality for when the request loads
        
        request.addEventListener("load", function() {
            
            // if the request succeeds
            
            if (request.status >= 200 && request.status < 400) {
                
                // parse the response JSON
                
                console.log("success")
                console.log(JSON.parse(request.responseText));
                responseObj = JSON.parse(request.responseText);
                console.log(responseObj.name);
                
                // clear the display    
                
                while (document.getElementById("results").hasChildNodes()) {
                    
                    console.log("removing");
                    document.getElementById("results").removeChild(
                            document.getElementById("results").lastChild
                        );
                    
                }
                    
                // create list elements for data display 
                
                var weather = document.createElement("li");
                var temp = document.createElement("li");
                var wind = document.createElement("li");
                
                /* set display data using response object parsed from JSON response to the request*/
                
                weather.innerHTML = "Conditions: " + responseObj.weather[0].description;
                temp.innerHTML = "Temperature: " + responseObj.main.temp + "&deg" + "C";
                wind.innerHTML = "Wind: " + responseObj.wind.speed + "m/s " + responseObj.wind.deg + "&deg";
                document.getElementById("displayName").textContent = "Weather in " +    responseObj.name;
                
                // construct the display div
                
                document.getElementById("results").appendChild(weather);
                document.getElementById("results").appendChild(temp);
                document.getElementById("results").appendChild(wind);
                
                // make the display visible
                
                document.getElementById("display").style.display = "inherit";

            }
            
            // if the request fails
            
            else {
                
                console.log("Error in network request: " + req.statusText);
            
            }
        });
        
        /* send the request after it loads, passing null as an argument,
            prevent default behavior (stops propagation) */
        
        request.send(null);
        event.preventDefault();

    });
 
    
    // add functionality to the text submission form button
    
    document.getElementById("textSubmit").addEventListener("click", function(event) {
        
        /* open up a new XMLHttpRequest and declare the payload object
            set request header content type to application/json */
        
        var tRequest = new XMLHttpRequest();
        var payload = {textString:null};
        payload.textString = document.getElementById("userText").value;
        
        tRequest.open("POST", "http://httpbin.org/post", true);
        tRequest.setRequestHeader("Content-Type", "application/json");
        
        // add functionality once the request loads
        
        tRequest.addEventListener("load", function() {
            
            // if the request was successful
            
            if (tRequest.status >= 200 && tRequest.status < 400) {
                
                console.log("success!");
                
                // parse the response JSON and store in a response object
                
                var response = JSON.parse(tRequest.responseText);
                
                console.log(response.data);
                
                /* parse the data element of the response JSON and access the 
                    textString element of the resulting object */
                
                var responseString = JSON.parse(response.data)["textString"];
                document.getElementById("tDisplay").textContent = responseString;
                
                // make the display visible
                
                document.getElementById("tDisplay").style.display = "inherit";
                
            }
            
            // if the request failed
            
            else {
                
                console.log("Error in network request: " + req.statusText);
                
            }
            
        });
        
        
        /* send the request after it loads, passing JSON data as an argument,
            prevent default behavior (stops propagation) */  
        
        tRequest.send(JSON.stringify(payload));
        event.preventDefault();
        
    });

}