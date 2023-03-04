
// geting form and flex container by id nad query to use then later to add functionality
const form = document.querySelector('form');
const flexContainer = document.getElementById('flex-container');

const checkHistory = document.getElementById("historybutton")


// the purpose of obj arry is to store the searches done by user to add into localstorage later
let obj=[];

//adding event listner on form and search bar 
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    flexContainer.innerHTML = '';
    //as using form as block and have not use indivual class or id to identify , inshort query is th value of search bar 
    const query = form.query.value;

    //the reson that endpoint is been asigned to variable is we have to manipulate according to user hens `${query}` will help us 
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    //using try and catch to add fucntionality to search bar
    try {
        
        //using await as it will take time to fetch data from api end point so to wait till we get url
        const response = await fetch(url);
        const data = await response.json();
        
        // after getting desired url using for each to display data
        data.items.forEach((book) => {
           
            //using consolo.log to varify so we can cross check
            const mydiv = document.createElement('div')
            mydiv.classList.add("mydivbooks")
            // console.log(data);
            
            // as the desired url according to search is inside the volumeInfo key pair assigning it to variabl for easy acces
            const coverinfo = book.volumeInfo
            const coverUrl = book.volumeInfo.imageLinks?.thumbnail;


//adding of details for books 
            mydiv.innerHTML = `<img src=${coverUrl}></img> 
          <br>  <p class="title">Title : ${coverinfo.title}</p> 
     <br> <p class="author">Author : ${coverinfo.authors}</p>
     <br> <p class="pagecount"> Page Count : ${coverinfo.pageCount}</p>
      <br><p class="publisher">Publisher : ${coverinfo.publisher}</p>
      <br><button class="buynow">Buy Now</button>
      `

            flexContainer.appendChild(mydiv)

             
            //cross checking in conole 

            // console.log(coverinfo.title)
            // console.log(coverinfo.authors)
            // console.log(coverinfo.publisher[1])
            // console.log(coverinfo.pageCount)
       

        });

        //all the search value is been pushed in array
        obj.push(query)
        // converting above file into string to store in localstorgae and ti use it later
        let myObj = JSON.stringify(obj);
      localStorage.setItem('obj',myObj)
       // if any error ocurrs it will get added in catch 
    } catch (error) {
        console.error(error);
    }
});

//cross checking string that is stored in local storgae 
// console.log(obj)


//adding event to check search history 
checkHistory.addEventListener('click',history)

function history(){
    window.location.href ="./history.html"
}
