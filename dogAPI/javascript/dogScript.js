var dogBreeds = ["Affenpinscher", "African", "Airedale", "Akita", "Appenzeller", "Basenji", "Beagle", "Bluetick", "Borzoi", "Bouvier", "Boxer", "Brabancon", "Briard", "Bull Dog", "Bull Terrier", "Cairn", "Chihuahua", "Chow", "Clumber", "Collie", "Coon Hound", "Corgi", "Dachshund", "Dane", "Deer Hound", "Dhole", "Dingo", "Doberman", "Glkhound", "Gntlebucher", "Gskimo", "German Shepherd", "Greyhound", "Groenendael", "Hound", "Husky", "Keeshond", "Kelpie", "Komondor", "Kuvasz", "Labrador", "Leonberg", "Lhasa", "Malamute", "Malinois", "Maltese", "Mastiff", "Mexican Hairless", "Mountain", "Newfoundland", "Otterhound", "Papillon", "Pekinese", "Pembroke", "Pinscher", "Pointer", "Pomeranian", "Poodle", "Pug", "Pyrenees", "Redbone", "Retriever", "Ridgeback", "Rottweiler", "Saluki", "Samoyed", "Schipperke", "Schnauzer", "Setter", "Sheepdog", "Shiba", "Shihtzu", "Spaniel", "Springer", "St. Bernard", "Terrier", "Vizsla", "Weimaraner", "Whippet", "Wolf Hound"];

function main(breed) {
  this.getDogBreedPic(breed.value);
}

function findAllBreeds(object) {
  let key = [];
  for(var breed in object) {
    key.push(breed);
  }
  return key;
}


function findRandDog() {
  console.log("Random Dog:");
  fetch('https://dog.ceo/api/breeds/image/random')
  .then( res => {
    res.json()
    .then( pic => {
      document.getElementById('dogPic').src = pic.message;
    })
    .catch()
  })
  .catch (error => console.log("ERROR"+error))
}

function getDogBreedPic(dogBreed) {
  console.log("Finding Dog");
  fetch('https://dog.ceo/api/breed/' + dogBreed + '/images/random')
    .then(res => {
      res.json()
          .then( pic => {
            document.getElementById('dogPic')
              .src = pic.message
          })
    })
    .catch(err => {
    console.log(err);
    });
}

function findDogBreed() {
    return fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        res.json()
          .then( data => {
            var dogOptions = findAllBreeds(data.message);
            var dogChosen = document.getElementById('selectBreed');

            for(var i = 0; i < dogOptions.length; i=i+1) {
              var dogOpt = dogOptions[i];
              var option = document.createElement('option');
              option.textContent = dogBreeds[i];
              option.value = dogOpt;
              dogChosen.appendChild(option);
            }
          })
      })
      .catch(err => {
        console.log(err);
      });
}

document.addEventListener("DOMContentLoaded", findDogBreed);