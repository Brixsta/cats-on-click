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
         
        // Taking values from the API and transferring them into arrays
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

    let $newDescriptionHeader = $('<h2></h2>', {class:"descriptionHeader", text:catBreedArray[indexOfCat]});
    $newDescriptionHeader.hide().fadeIn();
    $newDescriptionHeader.appendTo($container);
    let $newThumbnail = $('<img>', {class:"catThumbnail", height:'100px', width:'140px', src: catThumbnailImg[indexOfCat]});
    $newThumbnail.hide().fadeIn();
    $newThumbnail.appendTo($container);
    let $newDescription = $('<p></p>', {text: catBreedDescriptions[indexOfCat], class:'catDescription'});
    $newDescription.hide().fadeIn(); 
    $newDescription.appendTo($container);
    let $newTemperament = $('<p></p>', {text:'Temperament: ' + catTemperament[indexOfCat], class:'catTemperament'});
    $newTemperament.hide().fadeIn();
    $newTemperament.appendTo($container);
    let $newAdaptability = $('<p></p>', {text:'Adaptability: ' + catAdaptability[indexOfCat], class:'catAdaptability'});
    $newAdaptability.hide().fadeIn();
    $newAdaptability.appendTo($container);
    let $newAffection = $('<p></p>', {text:'Affection: ' + catAffection[indexOfCat], class:'catAffection'});
    $newAffection.hide().fadeIn();
    $newAffection.appendTo($container);
    let $newChildFriendly = $('<p></p>', {text:'Child Friendly: ' + catChildFriendly[indexOfCat], class:'catChildFriendly'});
    $newChildFriendly.hide().fadeIn();
    $newChildFriendly.appendTo($container);
    let $newDogFriendly = $('<p></p>', {text:'Dog Friendly: ' + catDogFriendly[indexOfCat], class:'catDogFriendly'});
    $newDogFriendly.hide().fadeIn();
    $newDogFriendly.appendTo($container);
    let $newEnergyLevel = $('<p></p>', {text:'Energy Level: ' + catEnergyLevel[indexOfCat], class:'catEnergyLevel'});
    $newEnergyLevel.hide().fadeIn();
    $newEnergyLevel.appendTo($container);
    let $newGrooming = $('<p></p>', {text:'Grooming: ' + catGrooming[indexOfCat], class:'catGrooming'});
    $newGrooming.hide().fadeIn();
    $newGrooming.appendTo($container);
    let $newHealthIssues = $('<p></p>', {text:'Health Issues: ' + catHealthIssues[indexOfCat], class:'catHealthIssues'});
    $newHealthIssues.hide().fadeIn();
    $newHealthIssues.appendTo($container);
    let $newIntelligence = $('<p></p>', {text:'Intelligence: ' + catIntelligence[indexOfCat], class:'catIntelligence'});
    $newIntelligence.hide().fadeIn();
    $newIntelligence.appendTo($container);
});