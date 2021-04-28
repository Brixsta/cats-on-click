const $container = $('.container');
const $catHeading = $('.catHeading');
const $catCanvas = $('.catCanvas');
const $catImg = $('.catImg');
const $randomCatBtn = $('.randomCatBtn');
const $descriptionBtn = $('.descriptionBtn');
const $breedDescription = $('.breedDescription')[0];
const randomPage = Math.floor(Math.random()*3000);

let catBreedArray = [];
let catBreedIdArray = [];
let catThumbnail = [];
let catThumbnailImg = [];
let catBreedDescriptions = [];
let catTemperament = [];
let catAdaptability = [];
let catAffection = [];
let catChildFriendly = [];
let catDogFriendly = [];
let catEnergyLevel = [];
let catGrooming = [];
let catHealthIssues = [];
let catIntelligence = [];
let indexOfCat;
let results;

// Random cat photo generation
$randomCatBtn.click( function(){

    $.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${randomPage}&order=Desc`, (data) => {
        results = data;
        let catImgArray = [];

        // Placing random cat images in catImgArray
         for(item in results) {
             catImgArray.push(results[item].url);
         }
         $catImg.attr('src', catImgArray[0]);
        });
});

$breedDescription.addEventListener('click', function(){
        $.get(`https://api.thecatapi.com/v1/breeds`, (data) => {
        results = data;
         
        // Transfer values from  API and transfer to arrays
        for(index in results) {
            catBreedArray.push(results[index].name);
            catBreedIdArray.push(results[index].id)
            catBreedDescriptions.push(results[index].description);
            catTemperament.push(results[index].temperament);
            catAdaptability.push(results[index].adaptability);
            catAffection.push(results[index].affection_level);
            catChildFriendly.push(results[index].child_friendly);
            catDogFriendly.push(results[index].dog_friendly);
            catEnergyLevel.push(results[index].energy_level);
            catGrooming.push(results[index].grooming);
            catHealthIssues.push(results[index].health_issues);
            catIntelligence.push(results[index].intelligence);
            catThumbnail.push(results[index].image);
        }


        // If statement for values that do not contain .image property
        for(item in catThumbnail) {
            if(catThumbnail[item] !== undefined) {
                catThumbnailImg.push(catThumbnail[item].url);
            } else {
                catThumbnailImg.push('IMG PLACEHOLDER');
            }
        }
        
        // Index used for almost every cat array
        indexOfCat = catBreedArray.indexOf($breedDescription.value);


        // Append every breed option to the selector drop down menu
        for(let i=0; i<catBreedArray.length; i++) {
            let $newOption = $('<option></option>', {text: catBreedArray[i], id: catBreedIdArray[i]});
            $newOption.appendTo($breedDescription);
        }
    });
});

// Click button to reveal details about a specific cat breed
$descriptionBtn.click(function(){
    
    if($breedDescription.value === 'Description By Breed') {
        alert('Please select a cat breed you wish to learn about.');
        return;
    }

    // Removing prior elements from a previous search
    $( "p" ).remove();
    $(".catThumbnail").remove();
    $(".descriptionHeader").remove();

    // Index used for almost every cat array
    indexOfCat = catBreedArray.indexOf($breedDescription.value);

    // Elements created for Cat description button
    let $newDescriptionHeader = $('<h2></h2>', {class:"descriptionHeader", text:catBreedArray[indexOfCat]});
    let $newThumbnail = $('<img>', {class:"catThumbnail", height:'100px', width:'140px', src: catThumbnailImg[indexOfCat]});
    let $newDescription = $('<p></p>', {text: catBreedDescriptions[indexOfCat], class:'catDescription'});
    let $newTemperament = $('<p></p>', {text:'Temperament: ' + catTemperament[indexOfCat], class:'catTemperament'});
    let $newAdaptability = $('<p></p>', {text:'Adaptability: ' + catAdaptability[indexOfCat], class:'catAdaptability'});
    let $newAffection = $('<p></p>', {text:'Affection: ' + catAffection[indexOfCat], class:'catAffection'});
    let $newChildFriendly = $('<p></p>', {text:'Child Friendly: ' + catChildFriendly[indexOfCat], class:'catChildFriendly'});
    let $newDogFriendly = $('<p></p>', {text:'Dog Friendly: ' + catDogFriendly[indexOfCat], class:'catDogFriendly'});
    let $newEnergyLevel = $('<p></p>', {text:'Energy Level: ' + catEnergyLevel[indexOfCat], class:'catEnergyLevel'});
    let $newGrooming = $('<p></p>', {text:'Grooming: ' + catGrooming[indexOfCat], class:'catGrooming'});
    let $newHealthIssues = $('<p></p>', {text:'Health Issues: ' + catHealthIssues[indexOfCat], class:'catHealthIssues'});
    let $newIntelligence = $('<p></p>', {text:'Intelligence: ' + catIntelligence[indexOfCat], class:'catIntelligence'});

    // Append all the elements to $container
    $container.append($newDescriptionHeader.hide().fadeIn(), $newThumbnail.hide().fadeIn(), $newDescription.hide().fadeIn(), 
    $newTemperament.hide().fadeIn(), $newAdaptability.hide().fadeIn(), $newAffection.hide().fadeIn(), $newChildFriendly.hide().fadeIn(), 
    $newDogFriendly.hide().fadeIn(), $newEnergyLevel.hide().fadeIn(), $newGrooming.hide().fadeIn(), $newHealthIssues.hide().fadeIn(), 
    $newIntelligence.hide().fadeIn());
});