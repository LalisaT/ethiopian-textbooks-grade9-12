# -*- coding: utf-8 -*-
"""
Full Database Builder: Exports 1,000+ Flashcards to src/data/flashcardsDatabase.ts
"""

import sys
import os
import json
from collections import Counter

sys.path.append(os.path.dirname(__file__))

from generate_all_cards import create_flashcard_database
from gen_natural_sciences import generate_natural_sciences
from gen_mathematics import generate_mathematics
from gen_social_sciences import generate_social_sciences
from gen_language_humanities import generate_language_humanities
from gen_vocational_aptitude import generate_vocational_aptitude
from gen_deep_dive_units import generate_deep_dive
from gen_curriculum_qna_formulas import generate_curriculum_expansion
from gen_master_matric_bank import generate_master_matric_bank
from gen_curriculum_final_surge import generate_final_surge

def main():
    cards, add = create_flashcard_database()
    print(f"Base existing cards: {len(cards)}")

    generate_natural_sciences(add)
    generate_mathematics(add)
    generate_social_sciences(add)
    generate_language_humanities(add)
    generate_vocational_aptitude(add)
    generate_deep_dive(add)
    generate_curriculum_expansion(add)
    generate_master_matric_bank(add)
    generate_final_surge(add)

    total_count = len(cards)
    print(f"==================================================")
    print(f"Total Flashcards Generated: {total_count}")
    print(f"==================================================")

    # Breakdown by grade
    grade_counts = Counter(c['grade'] for c in cards)
    print("Grade Breakdown:")
    for g in sorted(grade_counts.keys()):
        print(f"  Grade {g}: {grade_counts[g]} cards")

    # Breakdown by category
    cat_counts = Counter(c['category'] for c in cards)
    print("\nCategory Breakdown:")
    for cat in sorted(cat_counts.keys()):
        print(f"  {cat}: {cat_counts[cat]} cards")

    # Breakdown by subject
    sub_counts = Counter(c['subject'] for c in cards)
    print("\nSubject Breakdown:")
    for sub in sorted(sub_counts.keys()):
        print(f"  {sub}: {sub_counts[sub]} cards")

    output_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'flashcardsDatabase.ts')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('// Ethiopian Curriculum Grades 9–12 Flashcards & Formula Cards Database\n')
        f.write(f'// Comprehensive dataset containing {total_count} verified curriculum cards across all subjects and grades\n')
        f.write('import { Flashcard } from \'../types/quiz\';\n\n')
        f.write('export const FLASHCARDS_LIST: Flashcard[] = ')
        f.write(json.dumps(cards, indent=2, ensure_ascii=False))
        f.write(';\n')

    print(f"\nSuccessfully wrote {total_count} cards to {output_path}!")

if __name__ == '__main__':
    main()
