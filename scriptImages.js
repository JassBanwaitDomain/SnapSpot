const searchForm=document.getElementById("search-form");
const searchBox=document.getElementById("search-box");
const searchResult=document.getElementById("search-result")
const showMoreBtn=document.getElementById("show-more-btn");
const btn=document.getElementById("btn");



const accessKey="gBb6hVI0S89y2toNfijYeAauLZp8LiIJLRNvoDIliVA";
let keyword=" ";
let page=1;


async function searchImage(){
  
    keyword=searchBox.value;
    if(keyword==""){
        keyword="random";
    }
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response=await fetch(url);
    const data=await response.json();

    console.log(data);

    if(page===1){
        searchResult.innerHTML=" ";
    }
    const results=data.results;
    console.log(results);
    

 
   
    if(results.length===0){
        const div=document.createElement("div");
        searchResult.appendChild(div);
        div.id="errorBox";
        div.innerHTML=`
        <i class="fa-solid fa-bug icon"></i>
        <p id='para2' >Oops! We don't have anything like this here!</p>
         <br> 
         <p id='para'>Try searching for something else<p>
        `;

        showMoreBtn.style.display="none";
    }
    else{
        results.map((result)=>{
            const div=document.createElement("div");
            div.id="box";
            const image=document.createElement("img");
            image.src=result.urls.small;
    
            const imageLink=document.createElement("a");
            imageLink.id="imageLink";
            imageLink.href=result.links.html;
            imageLink.target="_blank";
    
            imageLink.appendChild(image);
            div.appendChild(imageLink);


            
            const footer=document.createElement("div");
            footer.id='footer';
            footer.innerHTML=`
                <i class="fa-regular fa-heart" id="heart-icon"></i>
                
            `;
            
            const downloadLink=document.createElement("a");
            downloadLink.id="downloadLink";
            downloadLink.href=result.urls.small;
            downloadLink.target="_blank";
            downloadLink.setAttribute("download","Image1");

            downloadLink.addEventListener("click", function(event) {
                // Prevent the default action (opening the link) 
                event.preventDefault();
            
                // Create a new XMLHttpRequest object
                var xhr = new XMLHttpRequest(); 
                xhr.open('GET', result.urls.small, true); // Open a connection to the server
                xhr.responseType = 'blob'; // Set the responseType to blob
                xhr.onload = function() {
                    if (xhr.status === 200) { // If the request is successful
                        var blob = xhr.response; // Get the response as a blob
            
                        // Create a temporary anchor element
                        var tempLink = document.createElement('a'); 
                        tempLink.href = window.URL.createObjectURL(blob); // Set the href attribute to a Blob URL
                        tempLink.download = result.alt_description; // Set the download attribute to the filename
                        tempLink.style.display = 'none'; // Hide the temporary anchor element
                        document.body.appendChild(tempLink); // Append the temporary anchor element to the document body
                        tempLink.click(); // Simulate a click on the temporary anchor element
                        document.body.removeChild(tempLink); // Remove the temporary anchor element from the document body
                    }
                };
                xhr.send(); // Send the request
            });



            footer.appendChild(downloadLink);



            const downloadIcon= document.createElement("i");
            downloadIcon.setAttribute("class","fa-solid fa-cloud-arrow-down");
            downloadLink.appendChild(downloadIcon);

            // footer.appendChild(downloadLink);
            


            div.appendChild(footer);
            searchResult.appendChild(div);

            
        });
        
        showMoreBtn.style.display="block";
    }
        
   
}


btn.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        page=1;
        searchImage();
    }
    
});
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImage();
});

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImage();
});


window.onload = ()=>{

    searchImage();
    
}


document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "heart-icon") {
        console.log("btn clicked!!");
        
            event.target.classList.toggle("fa-regular");
            event.target.classList.toggle("fa-solid");
        
        
    }
    
    
});

