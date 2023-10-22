const imageContainer= document.getElementById('image-container')
const loader= document.getElementById('loader')


//Initialize the variables which will be used to keep track of loaded photos
let imagesLoaded=0
let totalImages=0
let ready= false
let photosArray= []


//Unsplash API configuration
const count= 30
const apiKey= 'Vdh9FnCLmWOi4wEKYF7PQtPv0Fci_JpaLSfqPY1koOs'
const apiUrl= `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`


//Check if all images were loaded
function imageLoaded(){
    imagesLoaded ++
    if (imagesLoaded===totalImages){
        ready=true
        loader.hidden=true
    }
}

//Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded= 0
    totalImages= photosArray.length
    //Run function for each object in photos array
    photosArray.forEach((photo)=>{
        //Create an anchor <a></a> to link to unsplash
        const item= document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //Create image for photo 
        const img= document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //Event listener, check when each image finished loading
        img.addEventListener('load', imageLoaded)
        //Put img inside anchor and both inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

//Get photos from Unsplash API
async function getPhotos() {
 try{
    const response= await fetch(apiUrl)
    photosArray= await response.json()
    displayPhotos()

 }
 catch (error){

 }
}


//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready= false //to restart again
        getPhotos()
    }
})

//On Load
getPhotos()