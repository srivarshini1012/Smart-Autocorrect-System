Smart-Autocorrect-System

This is a Flask-based AI Autocorrect System that accepts full sentence input and provides corrected output along with top-3 suggestions per word (if applicable). It uses Python’s difflib library to match misspelled words with a custom dictionary containing 2000–2500 relevant words (English + Programming + Tech domains).

Project Structure:

SmartAutocorrect/
    app.py                    
    dataset.txt              
    templates/
      -index.html          
    static/
      -style.css        
      -script.js        


How It Works:

1.User enters a sentence in the textbox.
2.The Flask backend loads dataset.txt as a valid word set.
3.Each word is compared with the dataset using difflib.get_close_matches().
4.Top-3 suggestions (if any) are returned.
5.Output is displayed with corrections and possible alternatives.
