from flask import Flask, render_template, request, jsonify
import difflib

app = Flask(__name__)

def load_dictionary():
    with open("dataset.txt", "r") as file:
        words = file.read().splitlines()
    return set(words)

def correct_word(word, dictionary):
    suggestions = difflib.get_close_matches(word, dictionary, n=3, cutoff=0.7)
    return suggestions

def autocorrect_system(sentence, dictionary):
    words = sentence.strip().split()
    corrected_words = []
    corrections = {}
    suggestions_map = {}
    for word in words:
        lower_word = word.lower()
        if lower_word in dictionary:
            corrected_words.append(word)
        else:
            suggestions = correct_word(lower_word, dictionary)
            if suggestions:
                corrected_word = suggestions[0]
                corrected_words.append(corrected_word)
                corrections[word] = corrected_word
                suggestions_map[word] = suggestions
            else:
                corrected_words.append(word)
                suggestions_map[word] = []
    corrected_text = " ".join(corrected_words)
    return {
        "corrected_text": corrected_text,
        "corrections": corrections,
        "suggestions": suggestions_map
    }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/correct", methods=["POST"])
def correct():
    user_input = request.form["inputText"]
    dictionary = load_dictionary()
    result = autocorrect_system(user_input, dictionary)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
