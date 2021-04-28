var $container = $('.container');
var $catHeading = $('.catHeading')[0];
var $catCanvas = $('.catCanvas')[0];
var $catImg = $('.catImg');
var $randomCatBtn = $('.randomCatBtn');
var $descriptionBtn = $('.descriptionBtn');
var $breedDescription = $('.breedDescription');
var randomPage = Math.floor(Math.random()*3000);

console.log($breedDescription[0].value);

var catBreedArray = [];
var catBreedIdArray = [];
var catBreedDescriptions = [];
var indexOfCat;

var results;

$breedDescription.click( function(){
        $.get(`https://api.thecatapi.com/v1/breeds`, (data) => {
        results = data;
         indexOfCat = catBreedArray.indexOf($breedDescription.value);
        
        for(index in results) {
            catBreedArray.push(results[index].name);
            catBreedIdArray.push(results[index].id)
            catBreedDescriptions.push(results[index].description);
        }

        // Append every breed option to the selector drop down menu
        for(let i=0; i<catBreedArray.length; i++) {
            let $newOption = $('<option></option>', {text: catBreedArray[i], id: catBreedIdArray[i]});
            $newOption.appendTo($breedDescription);
        }
    });
});



$descriptionBtn.click(function(){

    if($breedDescription[0].value === 'Description By Breed') {
        alert('Please select a cat breed you wish to learn about.');
        return;
    }

    console.log(indexOfCat);
    var $newDescriptionHeader = $('<h2></h2>', {class:"descriptionHeader", text:catBreedArray[indexOfCat]});
    $newDescriptionHeader.hide().fadeIn();
    $newDescriptionHeader.appendTo($container[0]);
    var $newDescription = $('<p></p>', {text: catBreedDescriptions[indexOfCat], class:'catDescription'});
    $newDescription.hide().fadeIn(); 
    $newDescription.appendTo($container[0]);
});


// RANDOM CAT PHOTO GENERATION
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

