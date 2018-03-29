/*

  In this assignmenmt you are given a list of student names. The challenge
  is to pair students by how similar their names are in edit distance.
  The pairing algorithm  pseudocode is:

  sort the students by last name (A to Z)
  while there is > 1 unpaired student
    X = the first unpaired student
    if X's first name begins with a vowel
      compute the Hamming distance to all other unpaired students

    if X's first name begins with a consonant
      compute the Levenshtein distance to all other unpaired students

    pair X with the most similar name, Y (ie shortest edit distance). If there
    is a tie in edit distance, sort the results by last name (A...Z) and
    take the first.

    remove X and Y from the list of unpaired students.


  to help you, you are provided with the scripts:
    levenshtein.js and hamming.js

  **THERE IS CURRENTLY A NAMING CONFLICT, solve this by wrapping each
    provided distance funciton the JavaScirpt namespace-like construct of your choice.

    YOU CANNOT SIMPLY RENAME the distance functions!
    YOU CANNOT MODIFY THE distance functions IN ANY WAY other than
    to implement your namespace construct!

    I suggest putting each in it's own unique object so in your main
    code you can write:
     hamming.distance(a,b)
      or
     levenshtein.distance(a,b)
 */

var names = ["Jordan Voves", "Keller Chambers", "Stefano Cobelli",
"Jenna Slusar", "Jason Corriveau", "Cole Whitley", "Dylan Zucker",
"Danny Toback", "Eric Marshall", "Allan La", "Natalie Altman",
"Evan Harrington", "Jack Napor", "Jingya Wu", "Christian Ouellette",
"Junjie Jiang", "Morgan Muller", "Sarah Xu", "Aleksandar Antonov",
"Parker Watson", "Haipu Sun", "Ryan Pencak", "Dan Kershner",
"John Venditti", "Jacob Mendelowitz", "Dunni Adenuga", "Jeff Lee",
"Uttam Kumaran", "Jack Hall-Tipping"]


/* STEP 1: SORT NAMES by LAST NAME! */

function compareNames(name1,name2){
  var splitname1 = name1.split(" ");
  var splitname2 = name2.split(" ");
  var lastname1 = splitname1[splitname1.length -1];
  var lastname2 = splitname2[splitname2.length -1];

    if (lastname1 < lastname2) return -1;
    if (lastname1 > lastname2) return 1;
    return 0;
}
var newNames = names.slice();
var sortedNames = newNames.sort(compareNames);


/*var text = "";
  for (i = 0; i <names.length ; i++){
    text += names[i] + "<br>";
    var newNames = text.split(" ");
  }
}  */

console.log(sortedNames);

/* WHILE > 1 students are UNPAIRED
     take 1st student, compute distance to all others,
      pair with lowest score.
      */

function pairStudents(sortedNames){
  var hamming = new Hamming();
  var levenshtein = new Levenshtein();
  
  var pairedList = [];

  while (sortedNames.length > 1){
    var i;
    var x;
    var min = 0;
    var max = Infinity;
    var a = sortedNames[0];

    if (a[0]=="A" || a[0] == "E" ||  a[0] == "I" ||  a[0] == "O" ||  a[0] == "U"){
      for (i = 1; i < sortedNames.length; i++){
        x = hamming.distance(a,sortedNames[i])
        if (x < max){
          max = x;
          min = i;
        }
      }
    }
    else{
      for (i = 1; i <sortedNames.length; i++){
        x = levenshtein.distance(a,sortedNames[i])
        if (x < max){
          max = x;
          min = i;
        }
      }
    }
  pairedList.push(sortedNames[0] + " with " + sortedNames[min]);
  sortedNames.splice(min,1);
  sortedNames.splice(0, 1);
  }

  pairedList.push(sortedNames[0] + " by himself");

  return (pairedList)
}

var finalPairs = pairStudents(sortedNames);
console.log("Final Pairs");
console.log(finalPairs);




