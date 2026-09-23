# -*- coding: utf-8 -*-
from generate_all_cards import create_flashcard_database
from gen_natural_sciences import generate_natural_sciences
from gen_mathematics import generate_mathematics
from gen_social_sciences import generate_social_sciences
from gen_language_humanities import generate_language_humanities
from gen_vocational_aptitude import generate_vocational_aptitude

cards, add = create_flashcard_database()
print(f"Initial cards: {len(cards)}")

generate_natural_sciences(add)
print(f"After Natural Sciences: {len(cards)}")

generate_mathematics(add)
print(f"After Mathematics: {len(cards)}")

generate_social_sciences(add)
print(f"After Social Sciences: {len(cards)}")

generate_language_humanities(add)
print(f"After Language & Humanities: {len(cards)}")

generate_vocational_aptitude(add)
print(f"After Vocational & Aptitude: {len(cards)}")
