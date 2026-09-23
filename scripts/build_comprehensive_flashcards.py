import json
import os
import re

# Load existing flashcards from flashcardsDatabase.ts
existing_cards = []
existing_file = 'src/data/flashcardsDatabase.ts'
if os.path.exists(existing_file):
    with open(existing_file, 'r', encoding='utf-8') as f:
        content = f.read()
    # Extract JSON-like array
    match = re.search(r'export const FLASHCARDS_LIST:\s*Flashcard\[\]\s*=\s*(\[[\s\S]*\]);', content)
    if match:
        try:
            existing_cards = json.loads(match.group(1))
            print(f"Loaded {len(existing_cards)} existing flashcards.")
        except Exception as e:
            print(f"Error parsing existing JSON: {e}")

existing_ids = {c['id'] for c in existing_cards}

new_cards = []
card_counter = len(existing_cards) + 1

def add_card(grade, subject, unit, front, back, category, front_am="", back_am=""):
    global card_counter
    cid = f"fc-{subject[:4]}-g{grade}-u{unit}-{card_counter}"
    while cid in existing_ids:
        card_counter += 1
        cid = f"fc-{subject[:4]}-g{grade}-u{unit}-{card_counter}"
    existing_ids.add(cid)
    card_counter += 1
    card = {
        "id": cid,
        "grade": grade,
        "subject": subject,
        "unitNumber": unit,
        "front": front,
        "back": back,
        "category": category
    }
    if front_am:
        card["frontAmharic"] = front_am
    if back_am:
        card["backAmharic"] = back_am
    new_cards.append(card)

print("Generator helper initialized.")
