import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_exam_banner():
    width, height = 1600, 900
    banner = Image.new("RGBA", (width, height), (8, 12, 22, 255))
    draw = ImageDraw.Draw(banner)

    # 1. Background Luxury Gradient & Glows
    for y in range(height):
        ratio = y / height
        r = int(7 + ratio * 12)
        g = int(10 + ratio * 14)
        b = int(22 + ratio * 18)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Ambient golden warm light orb top-right and bottom-left
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Top-right warm amber/gold radiant orb
    for radius in range(540, 50, -25):
        alpha = int((1 - radius / 540) * 50)
        glow_draw.ellipse(
            [(1600 - radius + 80, -100 - radius // 2), (1600 + radius + 80, -100 + radius * 1.5)],
            fill=(245, 158, 11, alpha)
        )
    # Bottom-left subtle gold/cyan depth orb
    for radius in range(420, 50, -25):
        alpha = int((1 - radius / 420) * 35)
        glow_draw.ellipse(
            [(-80 - radius, 900 - radius), (-80 + radius * 2, 900 + radius)],
            fill=(217, 119, 6, alpha)
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
    draw.line([(border_margin + 60, border_margin), (width - border_margin - 60, border_margin)], fill=(251, 191, 36, 200), width=3)

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
    font_title = ImageFont.truetype(font_bold, 50)
    font_subtitle = ImageFont.truetype(font_bold, 27)
    font_body = ImageFont.truetype(font_reg, 23)
    font_feature = ImageFont.truetype(font_bold, 20)
    font_footer = ImageFont.truetype(font_bold, 21)

    cur_y = 135

    # Top Eyebrow Badge
    badge_text = "OFFICIAL NATIONAL EXAM HUB  |  GRADE 12 EUEE & MATRIC"
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
    draw.text((text_x, cur_y), "Grade 12 EUEE / Matric Exam Hub", fill=(255, 255, 255, 255), font=font_title)
    cur_y += 68

    # Subtitle
    draw.text((text_x, cur_y), "National Entrance Examination Simulator & Practice Hub", fill=(251, 191, 36, 255), font=font_subtitle)
    cur_y += 46

    # Description Paragraph
    desc_line1 = "Practice authentic past national papers and 50-question timed mock exams."
    desc_line2 = "Detailed step-by-step explanations covering high-yield Grades 9-12 concepts."
    draw.text((text_x, cur_y), desc_line1, fill=(203, 213, 225, 255), font=font_body)
    cur_y += 33
    draw.text((text_x, cur_y), desc_line2, fill=(148, 163, 184, 255), font=font_body)
    cur_y += 56

    # Feature Grid (2x2 luxury pill cards with vector golden checkmarks)
    features = [
        ("Natural & Social Science Streams", "Step-by-Step Answer Explanations"),
        ("Realistic Exam Timers & Scorecards", "100% Offline — No Internet Required")
    ]

    card_w = 425
    card_h = 54
    gap_x = 24
    gap_y = 18

    for row_idx, row in enumerate(features):
        for col_idx, feat in enumerate(row):
            cx = text_x + col_idx * (card_w + gap_x)
            cy = cur_y + row_idx * (card_h + gap_y)

            # Card background with glass-like obsidian finish
            draw.rounded_rectangle(
                [(cx, cy), (cx + card_w, cy + card_h)],
                radius=16,
                fill=(15, 23, 42, 230),
                outline=(51, 65, 85, 200),
                width=1
            )

            # Golden vector checkmark icon
            icon_x = cx + 18
            icon_y = cy + 18
            # Draw golden checkmark
            points = [(icon_x, icon_y + 8), (icon_x + 6, icon_y + 14), (icon_x + 16, icon_y + 2)]
            draw.line(points, fill=(245, 158, 11, 255), width=3, joint="curve")

            # Feature text
            draw.text((cx + 46, cy + 15), feat, fill=(241, 245, 249, 255), font=font_feature)

    cur_y += (card_h * 2 + gap_y + 40)

    # Bottom Highlight Pill
    footer_text = "•  Authentic National Exam Questions  •  Timed Simulator  •  Free Offline Access"
    f_bbox = draw.textbbox((0, 0), footer_text, font=font_footer)
    f_w = (f_bbox[2] - f_bbox[0]) + 44
    draw.rounded_rectangle(
        [(text_x, cur_y), (text_x + f_w, cur_y + 42)],
        radius=14,
        fill=(245, 158, 11, 25),
        outline=(245, 158, 11, 100),
        width=1
    )
    draw.text((text_x + 22, cur_y + 9), footer_text, fill=(251, 191, 36, 255), font=font_footer)

    # 5. Save as ultra high quality JPG and PNG
    output_dir = os.path.join("public", "brand")
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, "exam-prep-banner.jpg")
    banner.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"Generated Exam Prep Banner at: {out_path}")

if __name__ == "__main__":
    create_exam_banner()
