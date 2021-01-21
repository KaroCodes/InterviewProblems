/**
 * Microsoft software engineering internship interview #1
 * Problem: given a sentence reverse every word in that sentence.
 * 
 * Idea of approach (aka how I did it back in 2015):
 * It will have linear O(n) complexity.
 * It will be a 'in place' solution (without allocating additional memory).
 * 
 * Let's start from reversing a single word.
 * Write a function that reverses a word.
 * Treat a word (string) as an array of characters (chars). 
 * Create two index pointers - one points at the beginning and other at the end of the word.
 * Create a while loop. Each time increase start index and descrease end index until they meet
 * (or start is greater than end which means they missed each other).
 * Using temporary variable swap the elements in the array.
 * 
 * Pseudocode:
 * 
 * fun reverseWord(word) {
 *      var start := 0
 *      var end := word.length - 1
 *      while (start < end) {
 *          var tmp := word[start]
 *          word[start] := word[end]
 *          word[end] := tmp
 *      }
 *      return word
 * }
 * 
 * Now look at the whole sentence. You already have a method to reverse a word.
 * Now you just have to identify all of the words. Create two index variables
 * pointing at the beginning of the sentence. Ideally, the first one should point at the first letter
 * of the word and the second one should point at the last.
 * Create a loop that stops when the 'end' index is of the size of the sentence
 * (which means we iterated over the whole sentence).
 * Now, check if the character under the 'end' index is a space ' '. 
 * If so it means the word starts at 'start' and ends at 'end - 1'.
 * Now ask your previous function to reverse this word (you need to slightly modify it
 * so it takes the whole sentence and start and end index of the word).
 * Then set both indices to point at 'end + 1' which is a beginning of the next word.
 * 
 * Pseudocode:
 * 
 * fun reverseSentence(sentence) {
 *      var start := 0
 *      var end := 0
 *      while (end < sentence.length) {
 *          if (sentence[end] == ' ') {
 *              reverseWord(sentence, start, end - 1)
 *              start := end + 1
 *          }
 *          end := end + 1
 *      }
 *      return sentence;
 * }
 * 
 * Additional info:
 * In this solution, special characters like , . ! etc. will be treated as a part of the word.
 * You should clarify with your interviewer if they want you to handle it seperately or not
 * Usually it will be good enough if you just mention it as an edge case - it's not hard to fix
 * so interviewers don't really need to see you doing that. Solving the main problem will be enough.
 *  */ 

// this function focuses on the higher level - find each word in the sentence and delegate
// reversing to another function
// O(n), in place
function reverseSentence(sentence) {
    // if sentence is empty or has only 1 letter return early - nothing else to do
    if (sentence.length < 2) return sentence;

    var start  = 0;
    var end = 1; // we know that the sentence has at least 2 letters because we didn't return yet
    while (end <= sentence.length) {
        if (sentence[end] === ' ' || end === sentence.length) {
            reverseWord(sentence, start, end - 1);
            start = end + 1;
        }
        end++; // we want to increase end both if we found a word and if we are still looking
    }
    return sentence;
}

// this function takes care of the details - actual word reversing
// O(n), in place
// wordStart & wordEnd inclusive
function reverseWord(sentence, wordStart, wordEnd) {
    var start = wordStart;
    var end = wordEnd;
    while (start < end) {
        var tmp = sentence[start];
        sentence[start] = sentence[end];
        sentence[end] = tmp;
        start++;
        end--;
    }
}

// You can try modifying this - try to break this solution and then try to fix it!
let sentence = "This is a sentence that will have all its words reversed!";

// the split and join parts are just so the string is treated as an array of chars - JS ¯\_(ツ)_/¯
console.log(
    reverseSentence(sentence.split('')).join('')
 );

// All of the above can be done easily in one line using built-in JS functions like shown below.
// This is how you will usually do it when actually coding your project or at work.
// But for the purpose of the interview you are required to show that you understand 
// the underlying logic of those built-in functions.
console.log(
    sentence.split(' ').map((word) => word.split('').reverse().join('')).join(' ')
);
