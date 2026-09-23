import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_welcome_banner():
    width, height = 1600, 900
    banner = Image.new("RGBA", (width, height), (8, 12, 22, 255))
    draw = ImageDraw.Draw(banner)

    # 1. Background Luxury Gradient & Glows
    for y in range(height):
        ratio = y / height
        r = int(7 + ratio * 10)
        g = int(11 + ratio * 12)
        b = int(20 + ratio * 20)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Ambient golden warm light orb top-right and bottom-left
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Top-right warm amber orb
    for radius in range(500, 50, -25):
        alpha = int((1 - radius / 500) * 45)
        glow_draw.ellipse(
            [(1600 - radius + 100, -100 - radius // 2), (1600 + radius + 100, -100 + radius * 1.5)],
            fill=(245, 158, 11, alpha)
        )
    # Bottom-left subtle cyan/blue depth orb
    for radius in range(400, 50, -25):
        alpha = int((1 - radius / 400) * 30)
        glow_draw.ellipse(
            [(-100 - radius, 900 - radius), (-100 + radius * 2, 900 + radius)],
            fill=(14, 165, 233, alpha)
        )

    banner = Image.alpha_composite(banner, glow)
    draw = ImageDraw.Draw(banner)

    # 2. Outer Luxury Metallic Border
    border_margin = 32
    draw.rounded_rectangle(
        [(border_margin, border_margin), (width - border_margin, height - border_margin)],
        radius=36,
        outline=(245, 158, 11, 80),
        width=2
    )

    # Top gold accent line
    draw.line([(border_margin + 60, border_margin), (width - border_margin - 60, border_margin)], fill=(251, 191, 36, 180), width=3)

    # 3. Load and paste App Logo
    logo_path = os.path.join("public", "brand", "app-icon.jpg")
    if os.path.exists(logo_path):
        logo_img = Image.open(logo_path).convert("RGBA")
        logo_size = 460
        logo_img = logo_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

        # Create rounded squircle mask for the logo
        mask = Image.new("L", (logo_size, logo_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([(0, 0), (logo_size, logo_size)], radius=90, fill=255)

        # Logo shadow
        shadow_padding = 40
        shadow_size = logo_size + shadow_padding * 2
        shadow = Image.new("RGBA", (shadow_size, shadow_size), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle(
            [(shadow_padding - 4, shadow_padding + 16), (shadow_size - shadow_padding + 4, shadow_size - shadow_padding + 24)],
            radius=95,
            fill=(0, 0, 0, 160)
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(28))

        logo_x = 90
        logo_y = (height - logo_size) // 2

        banner.paste(shadow, (logo_x - shadow_padding, logo_y - shadow_padding), shadow)
        banner.paste(logo_img, (logo_x, logo_y), mask)

        # Draw gold luxury rim around logo
        draw.rounded_rectangle(
            [(logo_x, logo_y), (logo_x + logo_size, logo_y + logo_size)],
            radius=90,
            outline=(245, 158, 11, 200),
            width=5
        )

    # 4. Typography
    text_x = 610
    font_bold = "C:/Windows/Fonts/segoeuib.ttf"
    font_reg = "C:/Windows/Fonts/segoeui.ttf"
    if not os.path.exists(font_reg):
        font_reg = font_bold

    font_badge = ImageFont.truetype(font_bold, 20)
    font_title = ImageFont.truetype(font_bold, 54)
    font_subtitle = ImageFont.truetype(font_bold, 28)
    font_body = ImageFont.truetype(font_reg, 24)
    font_feature = ImageFont.truetype(font_bold, 20)
    font_footer = ImageFont.truetype(font_bold, 22)

    cur_y = 145

    # Top Eyebrow Badge (Dynamically measured so never overflows)
    badge_text = "OFFICIAL WELCOME NOTICE  |  FOR NEW DOWNLOADERS"
    bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
    badge_w = (bbox[2] - bbox[0]) + 48
    badge_h = 42
    draw.rounded_rectangle(
        [(text_x, cur_y), (text_x + badge_w, cur_y + badge_h)],
        radius=21,
        fill=(245, 158, 11, 40),
        outline=(245, 158, 11, 160),
        width=2
    )
    draw.text((text_x + 24, cur_y + 9), badge_text, fill=(253, 230, 138, 255), font=font_badge)

    cur_y += 65

    # Main Headline
    draw.text((text_x, cur_y), "Welcome to Ethiopian Textbooks!", fill=(255, 255, 255, 255), font=font_title)
    cur_y += 72

    # Subtitle
    draw.text((text_x, cur_y), "Grades 9-12 Digital Curriculum & EUEE Exam Prep Hub", fill=(251, 191, 36, 255), font=font_subtitle)
    cur_y += 48

    # Description Paragraph
    desc_line1 = "Your complete high school academic companion is ready on your device."
    desc_line2 = "Study completely offline with official books, guides, and matric practice tests."
    draw.text((text_x, cur_y), desc_line1, fill=(203, 213, 225, 255), font=font_body)
    cur_y += 34
    draw.text((text_x, cur_y), desc_line2, fill=(148, 163, 184, 255), font=font_body)
    cur_y += 58

    # Feature Grid (2x2 luxury pill cards with vector golden checkmarks)
    features = [
        ("100% Offline Grade 9-12 Textbooks", "Complete Teacher Guides Included"),
        ("National EUEE / Matric Exam Simulator", "Step-by-Step Answer Explanations")
    ]

    card_w = 420
    card_h = 54
    gap_x = 24
    gap_y = 18

    for row_idx, row in enumerate(features):
        for col_idx, feat in enumerate(row):
            cx = text_x + col_idx * (card_w + gap_x)
            cy = cur_y + row_idx * (card_h + gap_y)
            draw.rounded_rectangle(
                [(cx, cy), (cx + card_w, cy + card_h)],
                radius=16,
                fill=(15, 23, 42, 230),
                outline=(51, 65, 85, 200),
                width=1
            )
            # Gold left accent bar
            draw.rounded_rectangle(
                [(cx, cy), (cx + 5, cy + card_h)],
                radius=4,
                fill=(245, 158, 11, 255)
            )
            
            # Vector gold checkmark
            chk_x = cx + 22
            chk_y = cy + 27
            draw.line([(chk_x, chk_y), (chk_x + 6, chk_y + 7)], fill=(251, 191, 36, 255), width=3)
            draw.line([(chk_x + 6, chk_y + 7), (chk_x + 16, chk_y - 6)], fill=(251, 191, 36, 255), width=3)

            draw.text((cx + 48, cy + 13), feat, fill=(241, 245, 249, 255), font=font_feature)

    cur_y += 2 * (card_h + gap_y) + 30

    # Footer Telegram Community Pill
    footer_text = "Join High School Community:  t.me/Ethiopianstudentbooks"
    f_bbox = draw.textbbox((0, 0), footer_text, font=font_footer)
    footer_w = (f_bbox[2] - f_bbox[0]) + 56
    footer_h = 48
    draw.rounded_rectangle(
        [(text_x, cur_y), (text_x + footer_w, cur_y + footer_h)],
        radius=14,
        fill=(30, 41, 59, 180),
        outline=(71, 85, 105, 180),
        width=1
    )
    # Gold dot
    dot_x = text_x + 24
    dot_y = cur_y + 24
    draw.ellipse([(dot_x - 4, dot_y - 4), (dot_x + 4, dot_y + 4)], fill=(245, 158, 11, 255))
    draw.text((text_x + 38, cur_y + 11), footer_text, fill=(253, 230, 138, 255), font=font_footer)

    # Save output
    output_path = os.path.join("public", "brand", "welcome-banner.jpg")
    banner.convert("RGB").save(output_path, quality=95)
    print(f"Successfully generated welcome banner at {output_path}")

if __name__ == "__main__":
    create_welcome_banner()
